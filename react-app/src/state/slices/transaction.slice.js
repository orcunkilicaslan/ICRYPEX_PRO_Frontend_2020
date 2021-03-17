import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const fetchTransactionHistories = createAsyncThunk(
  "transaction/fetchHistories",
  async (data, { getState, rejectWithValue }) => {
    const {
      currencyids = [],
      startdate,
      enddate,
      periodby,
      isdeposit,
      iswithdraw,
      isrealized,
      iscanceled,
      orderby,
      startfrom,
      takecount,
    } = data;
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchTransactionHistories(
        {
          currencyids,
          startdate,
          enddate,
          periodby,
          isdeposit,
          iswithdraw,
          isrealized,
          iscanceled,
          orderby,
          startfrom,
          takecount,
        },
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

export const fetchPendingTransactions = createAsyncThunk(
  "transaction/fetchPending",
  async (data, { getState, rejectWithValue }) => {
    const {
      isdeposit,
      iswithdraw,
      istry,
      isusd,
      isbank,
      ispapara,
      orderby,
      startfrom,
      takecount,
    } = data;
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchPendingTransactions(
        {
          isdeposit,
          iswithdraw,
          istry,
          isusd,
          isbank,
          ispapara,
          orderby,
          startfrom,
          takecount,
        },
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
  history: [],
  pending: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchTransactionHistories.fulfilled]: (state, action) => {
      state.history = action?.payload?.description || [];
    },
    [fetchPendingTransactions.fulfilled]: (state, action) => {
      state.pending = action?.payload?.description || [];
    },
  },
});

export const { reset } = transactionSlice.actions;

export default transactionSlice.reducer;
