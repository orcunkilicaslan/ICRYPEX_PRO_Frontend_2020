import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { merge } from "lodash";

import * as api from "../api";

export const signoutUser = createAsyncThunk(
  "user/signout",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.signoutUser(
        {},
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userDetails, { getState, rejectWithValue }) => {
    const {
      api: { prelogintoken, mediumid },
    } = getState();

    try {
      const response = await api.signupUser(
        { mediumid, ...userDetails },
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

export const signinUser = createAsyncThunk(
  "user/signin",
  async ({ emailornationalid, password }, { getState, rejectWithValue }) => {
    const {
      api: { prelogintoken },
    } = getState();

    try {
      const response = await api.signinUser(
        { emailornationalid, password },
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

export const fetchUserInfo = createAsyncThunk(
  "user/info",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchUserInfo(
        {},
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ email }, { getState, rejectWithValue }) => {
    const {
      user,
      api: { prelogintoken },
    } = getState();

    if (!email) email = user.email;

    try {
      const response = await api.forgotPassword(
        { email },
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

export const fetchBankAccounts = createAsyncThunk(
  "user/fetchBankAccounts",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchBankAccounts(
        {},
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

const initialState = {
  info: {},
  customerid: null,
  logintype: null,
  accounts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.customerid = action?.payload?.description?.customerid;
    },
    [signinUser.fulfilled]: (state, action) => {
      state.customerid = action?.payload?.description?.customerid;
      state.logintype = action?.payload?.description?.logintype;
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      const info = action?.payload?.description || {};

      merge(state.info, info);
    },
    [fetchBankAccounts.fulfilled]: (state, action) => {
      const accounts = action?.payload?.description;

      if (accounts) state.accounts = accounts;
    },
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
