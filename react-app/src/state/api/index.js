import "yet-another-abortcontroller-polyfill";
import "event-target-polyfill";
import { fetch as _fetch } from "whatwg-fetch";
import { nanoid } from "nanoid";
import merge from "lodash/merge";

import { store } from "..";

const isProd = process.env.NODE_ENV === "production";
const API_BASE = process.env.REACT_APP_API_BASE;
const baseURL = isProd ? API_BASE : "";
const fetch = "signal" in new Request("") ? window.fetch : _fetch;
const AbortControllers = new Map();

const instance = {
  post: (uri, body, { headers }) => {
    const { ui } = store.getState();
    const controller = new AbortController();
    const _id = nanoid();
    const options = {
      method: "POST",
      body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "x-culture-code": ui.lang || "tr",
      },
      credentials: "same-origin",
      signal: controller.signal,
    };

    AbortControllers.set(_id, controller);
    merge(options.headers, headers);

    const request = fetch(`${baseURL}${uri}`, options)
      .then(async response => {
        const { ok, status, statusText, url } = response;
        console.log(`Response: ${url} | ${status}`, response);

        if (ok) {
          const data = await response.json();
          if (data?.status) {
            return { data };
          } else {
            const error = new Error(data.errormessage);
            error.name = "INTERNAL";
            error.type = data.type;
            error.data = data;
            error.response = response;
            throw error;
          }
        } else {
          const error = new Error(statusText);
          error.response = response;
          throw error;
        }
      })
      .catch(error => {
        if (error.name === "AbortError") {
          console.warn(`Request ${_id} was aborted`);
        }

        if (error.name === "INTERNAL") {
          const { response, type, message } = error;
          console.error(`${response.url} | ${type} | ${message}`);

          switch (error.type) {
            case "prelogintoken":
            case "accesstoken":
            default:
              return Promise.reject(error);
          }
        }
      });

    request.id = _id;
    return request;
  },
  abort: id => {
    const controller = AbortControllers.get(id);
    if (controller) controller?.abort();
  },
};

export * from "./requests";
export default instance;
