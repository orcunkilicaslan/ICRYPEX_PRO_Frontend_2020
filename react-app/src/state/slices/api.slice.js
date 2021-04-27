import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ms from "ms";

import * as api from "../api";
import { signoutUser } from "./user.slice";
import { hasAccessToken, hasPreloginToken } from "~/util/";

let refreshPromise;
let preLoginPromise;
export const PRELOGIN_TOKEN_EXPIRATION = ms("1h");
export const ACCESS_TOKEN_EXPIRATION = ms("10m");

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
      if (preLoginPromise) {
        return preLoginPromise
          .then(({ data }) => data)
          .catch(({ data }) => rejectWithValue(data))
          .finally(() => {
            preLoginPromise = null;
          });
      }

      preLoginPromise = await api.fetchPreloginToken({
        localkey,
        serverdevicekey,
      });

      const response = await preLoginPromise;
      preLoginPromise = null;

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return state.api?.isRefreshingPreloginToken ? false : true;
    },
  }
);

export const fetchSettings = createAsyncThunk(
  "api/settings",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { mediumid, versionno, settingno, prelogintoken },
    } = getState();

    try {
      const initialResponse = await api.fetchSettings(
        { mediumid, versionno, settingno },
        {
          headers: {
            "x-access-token": prelogintoken,
          },
        }
      );

      const latestsettingno = initialResponse?.data?.description?.settingno;
      const response = await api.fetchSettings(
        { mediumid, versionno, settingno: latestsettingno - 1 },
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
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return hasPreloginToken(state);
    },
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
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return hasPreloginToken(state);
    },
  }
);

export const signinWith2FA = createAsyncThunk(
  "api/signinwith2fa",
  async (secret, { getState, rejectWithValue }) => {
    const {
      user: { customerid },
      api: { prelogintoken },
    } = getState();

    try {
      const response = await api.signinWith2FA(
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
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return hasPreloginToken(state);
    },
  }
);

export const refreshToken = createAsyncThunk(
  "api/refreshtoken",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { prelogintoken, accesstoken },
    } = getState();

    try {
      if (refreshPromise) {
        return refreshPromise
          .then(({ data }) => data)
          .catch(({ data }) => rejectWithValue(data))
          .finally(() => {
            refreshPromise = null;
          });
      }

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
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return (
        !Boolean(state.api?.isRefreshingAccessToken) ||
        hasAccessToken(state) ||
        hasPreloginToken(state)
      );
    },
  }
);

export const bustCache = createAsyncThunk(
  "api/bustCache",
  async (key, { rejectWithValue }) => {
    const cache = api.cache;
    const keys = await cache.keys();

    try {
      await Promise.map(keys, async k => {
        if (k?.startsWith?.(key)) await cache.del(key);
      });

      return key;
    } catch (err) {
      return rejectWithValue(err);
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
  settingno: 17,
  settings: {},
  isRefreshingAccessToken: false,
  isRefreshingPreloginToken: false,
  accesstokenExpiresAt: null,
  prelogintokenExpiresAt: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setLocalKey: (state, { payload }) => {
      state.localkey = payload;
    },
    setDeviceId: (state, { payload }) => {
      state.deviceuuid = payload;
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
    [fetchPreloginToken.pending]: state => {
      state.isRefreshingPreloginToken = true;
    },
    [fetchPreloginToken.fulfilled]: (state, action) => {
      state.prelogintoken = action?.payload?.description;
      state.isRefreshingPreloginToken = false;
      state.prelogintokenExpiresAt = Date.now() + PRELOGIN_TOKEN_EXPIRATION;
    },
    [fetchPreloginToken.rejected]: state => {
      state.isRefreshingPreloginToken = false;
    },
    [fetchSettings.fulfilled]: (state, action) => {
      state.settingno = action?.payload?.description?.settingno;
      state.settings = action?.payload?.description?.settings;
    },
    [signinWithSms.pending]: state => {
      state.accesstoken = null;
      state.accesstokenExpiresAt = null;
    },
    [signinWithSms.fulfilled]: (state, action) => {
      state.accesstoken = action?.payload?.description;
      state.accesstokenExpiresAt = Date.now() + ACCESS_TOKEN_EXPIRATION;
    },
    [signinWith2FA.pending]: state => {
      state.accesstoken = null;
      state.accesstokenExpiresAt = null;
    },
    [signinWith2FA.fulfilled]: (state, action) => {
      state.accesstoken = action?.payload?.description;
      state.accesstokenExpiresAt = Date.now() + ACCESS_TOKEN_EXPIRATION;
    },
    [refreshToken.pending]: state => {
      state.isRefreshingAccessToken = true;
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.accesstoken = action?.payload?.description;
      state.accesstokenExpiresAt = Date.now() + ACCESS_TOKEN_EXPIRATION;
      state.isRefreshingAccessToken = false;
    },
    [refreshToken.rejected]: state => {
      state.isRefreshingAccessToken = false;
      state.accesstoken = null;
    },
    [signoutUser.fulfilled]: state => {
      state.accesstoken = null;
      state.accesstokenExpiresAt = null;
    },
    [signoutUser.rejected]: state => {
      state.accesstoken = null;
      state.prelogintoken = null;
      state.accesstokenExpiresAt = null;
      state.prelogintokenExpiresAt = null;
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
