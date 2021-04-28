import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { hasAccessToken } from "~/util/";
import { bustCache } from "~/state/slices/api.slice";


export const cancelPendingTransaction = createAsyncThunk(
  "transaction/cancel",
  async (transactionid, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { accesstoken },
      transaction: { pendingFilter },
    } = getState();

    try {
      const response = await api.cancelPendingTransaction(
        { transactionid },
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      if (pendingFilter) {
        await dispatch(
          bustCache({ key: api.fetchPendingTransactions.uri, matchStart: true })
        );
        dispatch(fetchPendingTransactions(pendingFilter));
      }

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
          // startfrom,
          // takecount,
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
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return hasAccessToken(state);
    },
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

    const toSend = {
      isdeposit,
      iswithdraw,
      istry,
      isusd,
      isbank,
      ispapara,
      orderby,
      startfrom,
      takecount,
    };
    try {
      const response = await api.fetchPendingTransactions(toSend, {
        headers: {
          "x-access-token": accesstoken,
        },
      });

      return { data: response.data, filterData: toSend };
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
  histories: [],
  pending: [],
  isFetchingPending: false,
  pendingFilter: null,
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
      state.histories = action?.payload?.description || [];
    },
    [fetchPendingTransactions.pending]: state => {
      state.isFetchingPending = true;
    },
    [fetchPendingTransactions.fulfilled]: (state, { payload }) => {
      state.isFetchingPending = false;
      state.pending = payload?.data?.description;
      state.pendingFilter = payload?.filterData;
    },
    [fetchPendingTransactions.rejected]: state => {
      state.isFetchingPending = false;
    },
  },
});

export const { reset } = transactionSlice.actions;

export default transactionSlice.reducer;
