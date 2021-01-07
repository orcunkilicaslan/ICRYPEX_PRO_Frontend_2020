import { createSlice } from "@reduxjs/toolkit";
import { create } from "apisauce";

const api = create({
  baseURL: process.env.REACT_APP_API_BASE,
  // headers: { "x-culture-code": "tr" },
});

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
      prepare: async (localkey, deviceuuid) => {
        const response = await api.post("/getserverdevicekey", {
          localkey,
          deviceuuid,
        });

        return { payload: response.data };
      },
    },
  },
});

export const { getPreLoginToken, getServerDeviceKey } = apiSlice.actions;

export default apiSlice.reducer;
