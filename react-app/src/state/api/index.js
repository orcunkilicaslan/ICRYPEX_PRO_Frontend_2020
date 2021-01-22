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
  const { ok, status, config, data } = response;
  console.log(
    "res: %s | %s | %s %O",
    config.method,
    config.url,
    status,
    response
  );

  if (ok && data.status) {
    // http response 2xx && api status 1
    return response;
  } else if (ok && !data.status) {
    // http response 2xx && api status 0
    console.error(
      "%s | %s | %s %s",
      config.method,
      config.url,
      data.type,
      data.errormessage
    );

    return response;
  } else {
    // http response !2xx
    // const { originalRequest } = config;

    // if (status === 403 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const access_token = await refreshAccessToken();
    //   axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    //   return axiosApiInstance(originalRequest);
    // }

    return Promise.reject(response);
  }
});

export * from "./requests";
export default instance;