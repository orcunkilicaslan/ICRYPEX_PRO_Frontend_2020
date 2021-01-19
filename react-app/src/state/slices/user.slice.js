import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stringify } from "querystring";

import api from "../api";

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userDetails, { getState }) => {
    const {
      api: { prelogintoken, mediumid },
    } = getState();

    const response = await api.post(
      "/signup",
      stringify({ mediumid, ...userDetails }),
      {
        headers: {
          "x-access-token": prelogintoken,
        },
      }
    );

    return response.data;
  }
);

export const signinUser = createAsyncThunk(
  "user/signin",
  async ({ email, password }, { getState }) => {
    const {
      user,
      api: { prelogintoken },
    } = getState();

    if (!email) email = user.email;

    const response = await api.post("/signin", stringify({ email, password }), {
      headers: {
        "x-access-token": prelogintoken,
      },
    });

    return response.data;
  }
);

export const fetchUserInfo = createAsyncThunk(
  "user/info",
  async (_, { getState }) => {
    const {
      api: { accesstoken },
    } = getState();

    const response = await api.post(
      "/userinfo",
      {},
      {
        headers: {
          "x-access-token": accesstoken,
        },
      }
    );

    return response.data;
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
      state = initialState;
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
