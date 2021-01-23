import { create } from "apisauce";

import { store } from "..";

let baseURL;
if (process.env.NODE_ENV === "production") {
  baseURL = process.env.REACT_APP_API_BASE;
} else {
  baseURL = null;
}

const instance = create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
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
    config.method,
    config.url,
    status,
    response
  );

  if (ok) {
    if (data.status) return response;

    console.error(
      "%s | %s | %s %s",
      config.method,
      config.url,
      data.type,
      data.errormessage
    );

    switch (data.type) {
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
