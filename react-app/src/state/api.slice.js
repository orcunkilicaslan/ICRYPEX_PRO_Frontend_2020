import { createSlice } from "@reduxjs/toolkit";
import { create } from "apisauce";
import { stringify } from "querystring";

import { makeLocalKey } from "~/util/";

const MD5_secret = process.env.REACT_APP_MD5_SECRET;
const api = create({
  baseURL: null,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
    "x-culture-code": "tr",
  },
});

api.axiosInstance.interceptors.request.use(
  async config => {
    const { method, url } = config;
    config.headers = {
      // Authorization: `Bearer ${keys.access_token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    console.log("req: %s | %s", method, url);
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

api.axiosInstance.interceptors.response.use(
  response => {
    const {
      config: { method, url },
      data: { status },
    } = response;

    console.log("res: %s | %s: status %s", method, url, status);
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
    return Promise.reject(error);
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: { prelogintoken: "", accesstoken: "", serverdevicekey: "" },
  reducers: {
    getPreLoginToken: {
      reducer: (state, { payload }) => {
        state.prelogintoken = payload;
      },
      prepare: async (localkey, serverdevicekey) => {
        const response = await api.post("/getprelogintoken", {
          localkey,
          serverdevicekey,
        });

        return { payload: response.data };
      },
    },
    getServerDeviceKey: {
      reducer: (state, { payload }) => {
        state.serverdevicekey = payload;
      },
      prepare: async () => {
        const { localkey, deviceuuid } = await makeLocalKey(MD5_secret);
        const response = await api.post(
          "/getserverdevicekey",
          stringify({ localkey, deviceuuid })
        );

        return { payload: response.data.description };
      },
    },
  },
});

export const { getPreLoginToken, getServerDeviceKey } = apiSlice.actions;

export default apiSlice.reducer;
