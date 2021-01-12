import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stringify } from "querystring";

import api from "../api";

export const fetchServerDeviceKey = createAsyncThunk(
  "api/serverdevicekey",
  async ({ localkey, deviceuuid }) => {
    const response = await api.post(
      "/getserverdevicekey",
      stringify({ localkey, deviceuuid })
    );

    return response.data;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: { prelogintoken: "", accesstoken: "", serverdevicekey: "" },
  reducers: {
    // getPreLoginToken: {
    //   reducer: (state, { payload }) => {
    //     state.prelogintoken = payload;
    //   },
    //   prepare: async (localkey, serverdevicekey) => {
    //     const response = await api.post("/getprelogintoken", {
    //       localkey,
    //       serverdevicekey,
    //     });

    //     return { payload: response.data };
    //   },
    // },
  },
  extraReducers: builder => {
    builder.addCase(fetchServerDeviceKey.fulfilled, (state, action) => {
      const { description } = action.payload;

      state.serverdevicekey = description;
    });
  },
});

export default apiSlice.reducer;
