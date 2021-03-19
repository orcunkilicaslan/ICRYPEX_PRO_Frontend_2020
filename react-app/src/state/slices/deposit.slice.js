import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const depositBankwire = createAsyncThunk(
  "deposit/bank",
  async (
    { currencyid, bankid, amount, read },
    { getState, rejectWithValue }
  ) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.depositBankwire(
        { currencyid, bankid, amount, read },
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

export const depositPapara = createAsyncThunk(
  "deposit/papara",
  async ({ amount, read }, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.depositPapara(
        { amount, read },
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

export const depositCrypto = createAsyncThunk(
  "deposit/crypto",
  async ({ currencyid, read }, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.depositCrypto(
        { currencyid, read },
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
  isDepositingBank: false,
  isDepositingPapara: false,
  isDepositingCrypto: false,
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [depositBankwire.pending]: state => {
      state.isDepositingBank = true;
    },
    [depositBankwire.fulfilled]: (state, action) => {
      state.isDepositingBank = false;
    },
    [depositBankwire.rejected]: state => {
      state.isDepositingBank = false;
    },
    [depositPapara.pending]: state => {
      state.isDepositingPapara = true;
    },
    [depositPapara.fulfilled]: (state, action) => {
      state.isDepositingPapara = false;
    },
    [depositPapara.rejected]: state => {
      state.isDepositingPapara = false;
    },
    [depositCrypto.pending]: state => {
      state.isDepositingCrypto = true;
    },
    [depositCrypto.fulfilled]: (state, action) => {
      state.isDepositingCrypto = false;
    },
    [depositCrypto.rejected]: state => {
      state.isDepositingCrypto = false;
    },
  },
});

export const { reset } = depositSlice.actions;

export default depositSlice.reducer;