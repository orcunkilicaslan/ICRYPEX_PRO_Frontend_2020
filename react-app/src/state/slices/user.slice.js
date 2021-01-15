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

export const signinWithSms = createAsyncThunk(
  "user/signinwithsms",
  async (secret, { getState }) => {
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

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstname: null,
    lastname: null,
    phone: null,
    email: null,
    customerid: null,
  },
  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      const { description } = action.payload;

      state.customerid = description?.customerid;
    },
  },
});

export default userSlice.reducer;