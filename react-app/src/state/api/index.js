import { fetch as _fetch } from "whatwg-fetch";
import retry from "@doruk/fetch-retry";
import merge from "lodash/merge";
import qs from "querystring";

import { store } from "..";
import {
  fetchServerDeviceKey,
  fetchPreloginToken,
  refreshToken,
} from "../slices/api.slice";

const isProd = process.env.NODE_ENV === "production";
// const API_BASE = process.env.REACT_APP_API_BASE;
let baseURL = isProd ? "/api" : "";
const fetch = retry(_fetch);

const instance = {
  post: (uri, body, opts = {}) => {
    const { ui } = store.getState();
    const { headers } = opts;
    const options = {
      method: "POST",
      body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "x-culture-code": ui.lang || "tr",
      },
      credentials: "include",
      retries: 5 * (isProd ? 10 : 1),
      retryDelay: (attempt, error, response) => {
        return Math.pow(2, attempt % 15) * 1000;
      },
      retryOn: async (attempt, error, response) => {
        if (error !== null || response.status >= 400) return doRetry();

        if (response.status === 200) {
          const { data } = await getJSONData(response);

          if (data?.status === 0) {
            console.error(`${uri} | ${data.type} | ${data.errormessage}`);

            switch (data?.type) {
              case "prelogintoken": {
                const { payload } = await store.dispatch(fetchPreloginToken());

                return doRetry({
                  headers: { "x-access-token": payload?.description },
                });
              }
              case "serverdevicekey": {
                const data = qs.parse(body);
                const { payload } = await store.dispatch(
                  fetchServerDeviceKey()
                );

                return doRetry({
                  body: qs.stringify({
                    ...data,
                    serverdevicekey: payload?.description,
                  }),
                });
              }
              case "accesstoken": {
                const { payload } = await store.dispatch(refreshToken());

                if (!payload.status) return false;

                return doRetry({
                  headers: { "x-access-token": payload?.description },
                });
              }
              default:
                return false;
            }
          }
        }

        return false;

        function doRetry(value) {
          console.warn(
            `${response?.status} | Retrying request to ${uri}. Attempt no ${
              attempt + 1
            }`,
            response?.data
          );
          return value || true;
        }
      },
    };

    merge(options.headers, headers);

    return fetch(`${baseURL}${uri}`, options).then(async response => {
      console.log(`${response.status} | ${uri} %O`, response.data);

      const { data } = await getJSONData(response);

      if (data?.status) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    });
  },
  setBaseURL: url => {
    return (baseURL = url);
  },
};

export * from "./requests";
export default instance;

async function getJSONData(response) {
  if (!response.bodyUsed) {
    response.data = await response.json();
  }

  return response;
}
