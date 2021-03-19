import { fetch as _fetch } from "whatwg-fetch";
import retry from "@doruk/fetch-retry";
import merge from "lodash/merge";
import { stringify, parse } from "qs";
import { isFuture } from "date-fns";
import ms from "ms";

import { store } from "..";
import {
  fetchServerDeviceKey,
  fetchPreloginToken,
  refreshToken,
} from "../slices/api.slice";
import { debug } from "~/util";

const isProd = process.env.NODE_ENV === "production";
let baseURL = process.env.REACT_APP_API_BASE;

const fetch = retry(_fetch);
const log = debug.extend("api");

const instance = {
  post: (uri, body, opts) => {
    const { ui } = store.getState();
    const _headers = opts?.headers;
    const defaults = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "x-culture-code": ui.lang || "tr",
    };
    const headers = merge({}, defaults, _headers);

    const options = {
      method: "POST",
      body,
      headers,
      credentials: "include",
      retries: 5 * (isProd ? 2 : 1),
      retryDelay: (attempt, error, response) => {
        return Math.pow(2, attempt % 15) * 1000;
      },
      retryOn: async (attempt, error, response) => {
        if (error !== null || response?.status >= 400) {
          if (response?.status === 403) {
            log("403 - skipping retry %o", { error, response });
            return false;
          }

          return doRetry();
        }

        if (response.status === 200) {
          const { data } = await marshallJSONData(response);

          if (data?.status === 0) {
            log(`${uri} | ${data.type} | ${data.errormessage}`);

            const { api } = store.getState();
            const {
              accesstoken,
              prelogintoken,
              accesstokenExpiresAt = Date.now(),
              prelogintokenExpiresAt = Date.now(),
            } = api;

            switch (data?.type) {
              case "prelogintoken": {
                let token;

                if (isFuture(prelogintokenExpiresAt - ms("3s"))) {
                  token = prelogintoken;
                } else {
                  const { payload } = await store.dispatch(
                    fetchPreloginToken()
                  );
                  token = payload?.description;
                }

                if (!token) return false;

                return doRetry({ headers: { "x-access-token": token } });
              }
              case "devicekey": {
                const data = parse(body);
                const { payload } = await store.dispatch(
                  fetchServerDeviceKey()
                );
                const serverdevicekey = payload?.description;

                if (!serverdevicekey) return false;

                return doRetry({
                  body: stringify({
                    ...data,
                    serverdevicekey,
                  }),
                });
              }
              case "accesstoken": {
                let token;

                if (isFuture(accesstokenExpiresAt - ms("3s"))) {
                  token = accesstoken;
                } else {
                  const { payload } = await store.dispatch(refreshToken());
                  token = payload?.description;
                }

                if (!token) return false;

                return doRetry({ headers: { "x-access-token": token } });
              }
              default:
                return false;
            }
          }
        }

        return false;

        function doRetry(value) {
          log(
            `${response?.status} | Retrying request to ${uri}. Attempt no ${attempt}`
          );
          return value || true;
        }
      },
    };

    return fetch(`${baseURL}${uri}`, options).then(async response => {
      const { data } = await marshallJSONData(response);
      const status = Boolean(data?.status) ? response.status : data?.status;
      log(`${status} | ${uri} %O`, data);

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

async function marshallJSONData(response) {
  if (!response.bodyUsed) {
    try {
      response.data = await response.json();
    } catch {}
  }

  return response;
}
