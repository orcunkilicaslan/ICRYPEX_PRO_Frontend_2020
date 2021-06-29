import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { hasAccessToken } from "~/util/";
import { fetchCryptoAddresses } from "~/state/slices/assets.slice";

export const cryptoAddressCreate = createAsyncThunk(
  "cryptoaddresses/create",
  async ({ currencyid }, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.cryptoAddressCreate(
        { currencyid },
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      dispatch(fetchCryptoAddresses());

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
  cryptoAddress: {},
};

const cryptoAddressSlice = createSlice({
  name: "cryptoAddress",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [cryptoAddressCreate.fulfilled]: (state, action) => {
      state.cryptoAddress = action?.payload?.description;
    },
  },
});

export const { reset } = cryptoAddressSlice.actions;

export default cryptoAddressSlice.reducer;
