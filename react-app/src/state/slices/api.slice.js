import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { signoutUser } from "./user.slice";

let refreshPromise;

export const fetchServerDeviceKey = createAsyncThunk(
  "api/serverdevicekey",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { localkey, deviceuuid },
    } = getState();

    try {
      const response = await api.fetchServerDeviceKey({ localkey, deviceuuid });

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

export const fetchPreloginToken = createAsyncThunk(
  "api/prelogintoken",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { localkey, serverdevicekey },
    } = getState();

    try {
      const response = await api.fetchPreloginToken({
        localkey,
        serverdevicekey,
      });

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

export const fetchSettings = createAsyncThunk(
  "api/settings",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { mediumid, versionno, settingno, prelogintoken },
    } = getState();

    try {
      const response = await api.fetchSettings(
        { mediumid, versionno, settingno },
        {
          headers: {
            "x-access-token": prelogintoken,
          },
        }
      );

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

export const signinWithSms = createAsyncThunk(
  "api/signinwithsms",
  async (secret, { getState, rejectWithValue }) => {
    const {
      user: { customerid },
      api: { prelogintoken },
    } = getState();

    try {
      const response = await api.signinWithSms(
        { customerid, secret },
        {
          headers: {
            "x-access-token": prelogintoken,
          },
        }
      );

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "api/refreshtoken",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { prelogintoken, accesstoken },
    } = getState();

    try {
      if (refreshPromise) return refreshPromise.then(({ data }) => data);

      refreshPromise = api.refreshToken(
        { accesstoken },
        {
          headers: {
            "x-access-token": prelogintoken,
          },
        }
      );

      const response = await refreshPromise;
      refreshPromise = null;

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
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
  settingno: 11,
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
      state.serverdevicekey = action?.payload?.description;
    },
    [fetchPreloginToken.fulfilled]: (state, action) => {
      state.prelogintoken = action?.payload?.description;
    },
    [fetchSettings.fulfilled]: (state, action) => {
      state.settings = action?.payload?.description?.settings;
    },
    [signinWithSms.fulfilled]: (state, action) => {
      state.accesstoken = action?.payload?.description;
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.accesstoken = action?.payload?.description;
    },
    [refreshToken.rejected]: state => {
      state.accesstoken = null;
    },
    [signoutUser.fulfilled]: state => {
      state.accesstoken = null;
    },
    [signoutUser.rejected]: (state, action) => {
      const message = action?.payload?.errormessage;

      if (message.includes("expired")) {
        state.accesstoken = null;
        state.prelogintoken = null;
      }
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
