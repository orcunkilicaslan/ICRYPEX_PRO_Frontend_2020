import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { hasAccessToken } from "~/util/";

export const fetchOrderHistory = createAsyncThunk(
  "order/fetchHistory",
  async (data, { getState, rejectWithValue }) => {
    const {
      pairids = [],
      startdate,
      enddate,
      periodby,
      isbuyorders,
      issellorders,
      isfilledorders,
      iscanceledorders,
      orderby,
      startfrom,
      takecount,
    } = data;
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchOrderHistory(
        {
          pairids,
          // startdate,
          // enddate,
          periodby,
          isbuyorders,
          issellorders,
          isfilledorders,
          iscanceledorders,
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

export const fetchOpenOrders = createAsyncThunk(
  "order/fetchOpenOrders",
  async (data, { getState, rejectWithValue }) => {
    const {
      pairids = [],
      isbuyorders,
      issellorders,
      orderby,
      startfrom,
      takecount,
    } = data;
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchOpenOrders(
        {
          pairids,
          isbuyorders,
          issellorders,
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

const initialState = {
  tabIndex: 0,
  history: [],
  isFetchingHistory: false,
  open: [],
  isFetchingOpen: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setTabIndex: (state, { payload }) => {
      state.tabIndex = payload;
    },
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchOrderHistory.pending]: state => {
      state.isFetchingHistory = true;
    },
    [fetchOrderHistory.fulfilled]: (state, { payload }) => {
      state.isFetchingHistory = false;
      state.history = payload?.description;
    },
    [fetchOrderHistory.rejected]: state => {
      state.isFetchingHistory = false;
    },
    [fetchOpenOrders.pending]: state => {
      state.isFetchingOpen = true;
    },
    [fetchOpenOrders.fulfilled]: (state, { payload }) => {
      state.isFetchingOpen = false;
      state.open = payload?.description;
    },
    [fetchOpenOrders.rejected]: state => {
      state.isFetchingOpen = false;
    },
  },
});

export const { setTabIndex, reset } = orderSlice.actions;

export default orderSlice.reducer;
