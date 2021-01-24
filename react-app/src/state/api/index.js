import { create } from "apisauce";
import retry, { exponentialDelay } from "axios-retry";

import { store } from "..";

const isProd = process.env.NODE_ENV === "production"
const API_BASE = process.env.REACT_APP_API_BASE
const instance = create({
  baseURL: isProd ? API_BASE : null,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});

retry(instance.axiosInstance, {
  retries: isProd ? 30 : 5,
  retryCondition: error => {
    return error.config?.method === "post";
  },
  retryDelay: (count, error) => {
    const url = error.config?.url;
    const method = error.config?.method;
    console.warn(`${method} | ${url} | retry no ${count}`);

    return exponentialDelay(count);
  },
});

instance.addAsyncRequestTransform(request => async () => {
  const { method, url, headers } = request;
  console.log("req: %s | %s | %O", method, url, request);
  const { ui } = store.getState();

  headers["x-culture-code"] = ui.lang || "tr";
});

instance.addAsyncResponseTransform(async response => {
  const { ok, status, config, data, problem } = response;
  console.log(
    "res: %s | %s | %s %O",
    config?.method,
    config?.url,
    status,
    response
  );

  if (ok) {
    if (data?.status) return response;

    const type = data?.type;
    const errormessage = data?.errormessage;
    console.error(
      "%s | %s | %s %s",
      config?.method,
      config?.url,
      type,
      errormessage
    );

    switch (type) {
      case "prelogintoken":
      case "accesstoken":
      default:
        return Promise.reject(response);
    }
  } else {
    switch (problem) {
      case "CLIENT_ERROR":
      case "SERVER_ERROR":
      case "TIMEOUT_ERROR":
      case "CONNECTION_ERROR":
      case "NETWORK_ERROR":
      case "CANCEL_ERROR":
      default:
        return Promise.reject(response);
    }
  }
});

export * from "./requests";
export default instance;
