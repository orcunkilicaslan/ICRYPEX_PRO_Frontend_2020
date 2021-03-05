import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

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
  }
);

export const withdrawPapara = createAsyncThunk(
  "withdraw/papara",
  async ({ paparaid, amount, read }, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.withdrawPapara(
        { paparaid, amount, read },
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
  isWithdrawingBank: false,
  isWithdrawingPapara: false,
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
    [withdrawPapara.pending]: state => {
      state.isWithdrawingPapara = true;
    },
    [withdrawPapara.fulfilled]: (state, action) => {
      state.isWithdrawingPapara = false;
    },
    [withdrawPapara.rejected]: state => {
      state.isWithdrawingPapara = false;
    },
  },
});

export const { reset } = withdrawSlice.actions;

export default withdrawSlice.reducer;
