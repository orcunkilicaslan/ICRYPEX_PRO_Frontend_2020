import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const initialState = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  displayname: "",
  profilepicturefilename: null,
  unreadednotificationcount: 0,
  emailverified: false,
  customergroupid: 1,
  nationalid: null,
  dateofbirth: null,
  countryid: null,
  cityid: null,
  districtid: null,
  regionid: null,
  address: null,
  registrationdate: null,
  customerid: null,
  logintype: null,
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
    [signoutUser.fulfilled]: state => {
      state.customerid = null;
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      const description = action?.payload?.description || {};

      for (const [key, value] of Object.entries(description)) {
        state[key] = value;
      }
    },
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
