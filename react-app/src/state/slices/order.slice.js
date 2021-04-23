import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { hasAccessToken } from "~/util/";
import { bustCache } from "~/state/slices/api.slice";

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

    const toSend = {
      pairids,
      startdate,
      enddate,
      isbuyorders,
      issellorders,
      isfilledorders,
      iscanceledorders,
      orderby,
    };
    try {
      const response = await api.fetchOrderHistory(toSend, {
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

    const toSend = { pairids, isbuyorders, issellorders, orderby };
    try {
      const response = await api.fetchOpenOrders(toSend, {
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

export const deleteOpenOrder = createAsyncThunk(
  "order/deleteOpenOrder",
  async (orderid, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { accesstoken },
      order: { openOrdersFilter },
    } = getState();

    try {
      const response = await api.deleteOpenOrder(
        { orderid },
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      // cache'lenmiş veriyi invalidate etmek gerek çünkü bayat veri
      // kalmış olabilir.  "uri" ile başlayan cache satırlarını silip bir
      // önceki form datasıyla güncel listeyi alıyoruz
      if (openOrdersFilter) {
        await dispatch(bustCache(api.fetchOpenOrders.uri));
        dispatch(fetchOpenOrders(openOrdersFilter));
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

const initialState = {
  tabIndex: 0,
  history: [],
  isFetchingHistory: false,
  open: [],
  isFetchingOpen: false,
  hideOthersOpen: false,
  hideOthersHistory: false,
  openOrdersFilter: null,
  orderHistoryFilter: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setTabIndex: (state, { payload }) => {
      state.tabIndex = payload;
    },
    toggleHideOthersOpen: state => {
      state.hideOthersOpen = !state.hideOthersOpen;
    },
    toggleHideOthersHistory: state => {
      state.hideOthersHistory = !state.hideOthersHistory;
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
      state.history = payload?.data?.description;
      state.orderHistoryFilter = payload?.filterData;
    },
    [fetchOrderHistory.rejected]: state => {
      state.isFetchingHistory = false;
    },
    [fetchOpenOrders.pending]: state => {
      state.isFetchingOpen = true;
    },
    [fetchOpenOrders.fulfilled]: (state, { payload }) => {
      state.isFetchingOpen = false;
      state.open = payload?.data?.description;
      state.openOrdersFilter = payload?.filterData;
    },
    [fetchOpenOrders.rejected]: state => {
      state.isFetchingOpen = false;
    },
  },
});

export const {
  toggleHideOthersOpen,
  toggleHideOthersHistory,
  setTabIndex,
  reset,
} = orderSlice.actions;

export default orderSlice.reducer;
