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
    "x-culture-code": "tr",
  },
});

api.axiosInstance.interceptors.request.use(
  async config => {
    const { method, url } = config;
    // TODO: get headers from redux state
    config.headers = {
      // Authorization: `Bearer ${keys.access_token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    console.log("req: %s | %s | %O", method, url, config);
    return config;
  },
  error => {
    console.log("axios request error: %O", error);
    Promise.reject(error);
  }
);

api.axiosInstance.interceptors.response.use(
  response => {
    const {
      config: { method, url },
      data: { status },
    } = response;

    console.log("res: %s | %s: status %s | %O", method, url, status, response);
    return response;
  },
  async function (error) {
    // const originalRequest = error.config;
    // if (error.response.status === 403 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const access_token = await refreshAccessToken();
    //   axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    //   return axiosApiInstance(originalRequest);
    // }
    console.log("axios response error: %O", error);
    return Promise.reject(error);
  }
);

export default api;
