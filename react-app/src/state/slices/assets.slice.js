import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { groupBy } from "lodash";

import * as api from "../api";
import { hasAccessToken } from "~/util/";

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
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return hasAccessToken(state);
    },
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
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return hasAccessToken(state);
    },
  }
);

const initialState = {
  allAssets: [],
  allCryptoAddresses: [],
  groupedCryptoAddresses: {},
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
    [fetchAssets.fulfilled]: (state, { payload }) => {
      state.allAssets = payload?.description;
    },
    [fetchCryptoAddresses.fulfilled]: (state, { payload }) => {
      const all = payload?.description;

      state.allCryptoAddresses = all;
      state.groupedCryptoAddresses = groupBy(all, ({ symbol }) => symbol);
    },
  },
});

export const { reset } = assetsSlice.actions;

export default assetsSlice.reducer;
