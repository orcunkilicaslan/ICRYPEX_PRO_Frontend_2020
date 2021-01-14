import { create } from "apisauce";

let baseURL;
if (process.env.NODE_ENV === "production") {
  baseURL = process.env.REACT_APP_API_BASE;
} else {
  baseURL = null;
}

const api = create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

api.addAsyncRequestTransform(request => async () => {
  const { method, url, headers } = request;
  console.log("req: %s | %s | %O", method, url, request);

  // TODO: get headers from redux state
  headers["x-culture-code"] = "tr";
});

api.addAsyncResponseTransform(response => {
  const { ok, status, config, data } = response;
  console.log(
    "res: %s | %s | %s %O",
    config.method,
    config.url,
    status,
    response
  );

  if (ok && data.status) {
    return Promise.resolve(response);
  } else if (ok && !data.status) {
    console.error(
      "%s | %s | %s %s",
      config.method,
      config.url,
      data.type,
      data.errormessage
    );

    return Promise.resolve(response);
  } else {
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

export default api;
