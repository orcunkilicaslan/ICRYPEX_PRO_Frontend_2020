import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { hasAccessToken } from "~/util/";

export const withdrawBankwire = createAsyncThunk(
  "withdraw/bank",
  async ({ customerbankid, amount, read }, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.withdrawBankwire(
        { customerbankid, amount, read },
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

export const withDrawCrypto = createAsyncThunk(
  "withdraw/crypto",
  async (
    { currencyid, address, destinationtag, amount, read },
    { getState, rejectWithValue }
  ) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.withdrawCrypto(
        { currencyid, address, destinationtag, amount, read },
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
  isWithdrawingBank: false,
  isWithdrawingCrypto: false,
};

const withdrawSlice = createSlice({
  name: "withdraw",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [withdrawBankwire.pending]: state => {
      state.isWithdrawingBank = true;
    },
    [withdrawBankwire.fulfilled]: (state, action) => {
      state.isWithdrawingBank = false;
    },
    [withdrawBankwire.rejected]: state => {
      state.isWithdrawingBank = false;
    },
    [withDrawCrypto.pending]: state => {
      state.isWithdrawingCrypto = true;
    },
    [withDrawCrypto.fulfilled]: (state, action) => {
      state.isWithdrawingCrypto = false;
    },
    [withDrawCrypto.rejected]: state => {
      state.isWithdrawingCrypto = false;
    },
  },
});

export const { reset } = withdrawSlice.actions;

export default withdrawSlice.reducer;
