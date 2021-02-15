import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const fetchAssets = createAsyncThunk(
  "assets/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchAssets(
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

export const fetchCryptoAddresses = createAsyncThunk(
  "assets/fetchCryptoAddresses",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchCryptoAddresses(
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
  allAssets: [],
  allCryptoAddresses: [],
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchAssets.fulfilled]: (state, action) => {
      state.allAssets = action?.payload?.description;
    },
    [fetchCryptoAddresses.fulfilled]: (state, action) => {
      state.allCryptoAddresses = action?.payload?.description;
    },
  },
});

export const { reset } = assetsSlice.actions;

export default assetsSlice.reducer;
