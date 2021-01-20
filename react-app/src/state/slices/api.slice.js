import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stringify } from "querystring";

import api from "../api";

export const fetchServerDeviceKey = createAsyncThunk(
  "api/serverdevicekey",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { localkey, deviceuuid },
    } = getState();

    const response = await api.post(
      "/getserverdevicekey",
      stringify({ localkey, deviceuuid })
    );

    if (response.data.status) return response.data;
    else return rejectWithValue(response.data);
  }
);

export const fetchPreloginToken = createAsyncThunk(
  "api/prelogintoken",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { localkey, serverdevicekey },
    } = getState();

    const response = await api.post(
      "/getprelogintoken",
      stringify({ localkey, serverdevicekey })
    );

    if (response.data.status) return response.data;
    else return rejectWithValue(response.data);
  }
);

export const fetchSettings = createAsyncThunk(
  "api/settings",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { mediumid, versionno, settingno, prelogintoken },
    } = getState();

    const response = await api.post(
      "/settings",
      stringify({ mediumid, versionno, settingno }),
      {
        headers: {
          "x-access-token": prelogintoken,
        },
      }
    );

    if (response.data.status) return response.data;
    else return rejectWithValue(response.data);
  }
);

export const signinWithSms = createAsyncThunk(
  "api/signinwithsms",
  async (secret, { getState, rejectWithValue }) => {
    const {
      user: { customerid },
      api: { prelogintoken },
    } = getState();

    const response = await api.post(
      "/signinwithsms",
      stringify({ customerid, secret }),
      {
        headers: {
          "x-access-token": prelogintoken,
        },
      }
    );

    if (response.data.status) return response.data;
    else return rejectWithValue(response.data);
  }
);

const initialState = {
  prelogintoken: null,
  accesstoken: null,
  serverdevicekey: null,
  localkey: null,
  deviceuuid: null,
  mediumid: 1,
  versionno: "1.0.0",
  settingno: 9,
  settings: {},
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setLocalKey: (state, { payload }) => {
      if (!state.localkey) {
        state.localkey = payload;
      }
    },
    setDeviceId: (state, { payload }) => {
      if (!state.deviceuuid) {
        state.deviceuuid = payload;
      }
    },
    setMediumId: (state, { payload }) => {
      state.mediumid = payload;
    },
    setVersionNo: (state, { payload }) => {
      state.versionno = payload;
    },
    setSettingNo: (state, { payload }) => {
      state.settingno = payload;
    },
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchServerDeviceKey.fulfilled]: (state, action) => {
      const { description } = action.payload;

      state.serverdevicekey = description;
    },
    [fetchPreloginToken.fulfilled]: (state, action) => {
      const { description } = action.payload;

      state.prelogintoken = description;
    },
    [fetchSettings.fulfilled]: (state, { payload }) => {
      const { description } = payload;

      state.settings = description?.settings;
    },
    [signinWithSms.fulfilled]: (state, { payload }) => {
      const { description } = payload;

      state.accesstoken = description;
    },
  },
});

export const {
  setDeviceId,
  setLocalKey,
  setMediumId,
  setVersionNo,
  setSettingNo,
  reset,
} = apiSlice.actions;

export default apiSlice.reducer;
