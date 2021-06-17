import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { hasAccessToken } from "~/util/";

export const uyeGiris = createAsyncThunk(
  "tr/uye-girisi-ea",
  async (path, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();
    let oldBase;

    try {
      oldBase = api.default.baseURL;
      api.default.baseURL = "/web";
      const response = await api.uyegiris(
        { path },
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    } finally {
      api.default.baseURL = oldBase;
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return hasAccessToken(state);
    },
  }
);

export const loginAt = createAsyncThunk(
  "en/login-at",
  async ({ path }, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.loginAt(
        { path },
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
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return hasAccessToken(state);
    },
  }
);

const initialState = {
  isResponse: false,
};

const webLoginSlice = createSlice({
  name: "webLogin",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [uyeGiris.fulfilled]: (state, action) => {
      console.log(action?.payload);
      state.isResponse = true;
    },
  },
});

export const { reset } = webLoginSlice.actions;

export default webLoginSlice.reducer;
