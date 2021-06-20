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
      // periodby,
      isbuyorders,
      issellorders,
      isfilledorders,
      iscanceledorders,
      orderby,
      // startfrom,
      // takecount,
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
      // startfrom,
      // takecount,
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
        await dispatch(
          bustCache({ key: api.fetchOpenOrders.uri, matchStart: true })
        );
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

export const fetchOrderHistoryDetail = createAsyncThunk(
  "order/fetchOrderHistoryDetail",
  async (data, { getState, rejectWithValue }) => {
    const { orderid } = data;
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchOrderHistoryDetail(
        { orderid },
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      return { orderid, data: response.data };
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
  selectedBuyOrder: { minprice: null, sumAmount: null },
  selectedSellOrder: { minprice: null, sumAmount: null },
  historyDetail: {},
  isFetchingHistoryDetail: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder: {
      reducer: (state, action) => {
        let sumAmount = action?.payload.data.reduce(function (prev, current) {
          return prev + +current.amount;
        }, 0);
        if (action?.payload.type === "buy") {
          state.selectedBuyOrder.minprice =
            action?.payload.data[action?.payload.data.length - 1].price;
          state.selectedBuyOrder.sumAmount = sumAmount;
        } else {
          state.selectedSellOrder.minprice =
            action?.payload.data[action?.payload.data.length - 1].price;
          state.selectedSellOrder.sumAmount = sumAmount;
        }
      },
    },
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
    [fetchOrderHistoryDetail.pending]: state => {
      state.isFetchingHistoryDetail = true;
    },
    [fetchOrderHistoryDetail.fulfilled]: (state, { payload }) => {
      const { orderid, data } = payload;

      state.isFetchingHistoryDetail = false;
      state.historyDetail[orderid] = data?.description;
    },
    [fetchOrderHistoryDetail.rejected]: state => {
      state.isFetchingHistoryDetail = false;
    },
  },
});

export const {
  toggleHideOthersOpen,
  toggleHideOthersHistory,
  setTabIndex,
  reset,
  setSelectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
