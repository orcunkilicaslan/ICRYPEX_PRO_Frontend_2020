import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userDetails, { getState, rejectWithValue }) => {
    const {
      api: { prelogintoken, mediumid },
    } = getState();

    const response = await api.signupUser(
      { mediumid, ...userDetails },
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

export const signinUser = createAsyncThunk(
  "user/signin",
  async ({ email, password }, { getState, rejectWithValue }) => {
    const {
      user,
      api: { prelogintoken },
    } = getState();

    if (!email) email = user.email;

    const response = await api.signinUser(
      { email, password },
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

export const fetchUserInfo = createAsyncThunk(
  "user/info",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    const response = await api.fetchUserInfo(
      {},
      {
        headers: {
          "x-access-token": accesstoken,
        },
      }
    );

    if (response.data.status) return response.data;
    else return rejectWithValue(response.data);
  }
);

const initialState = {
  firstname: null,
  lastname: null,
  phone: null,
  email: null,
  customerid: null,
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
      const { description } = action.payload;

      state.customerid = description?.customerid;
    },
    [signinUser.fulfilled]: (state, action) => {
      const { description } = action.payload;

      state.customerid = description?.customerid;
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      const { description = {} } = action.payload;

      for (const [key, value] of Object.entries(description)) {
        state[key] = value;
      }
    },
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
