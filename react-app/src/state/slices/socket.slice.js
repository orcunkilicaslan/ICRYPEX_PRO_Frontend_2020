import { createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

const initialState = {
  connected: false,
  reason: null,
  prices: [],
  orderbooks: {},
  orderhistories: {},
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connected: state => {
      state.connected = true;
      state.reason = null;
    },
    disconnected: (state, action) => {
      state.connected = false;
      state.reason = action?.payload;
    },
    setPrices: (state, action) => {
      state.prices = action?.payload || [];
    },
    setOrderBook: {
      reducer: (state, action) => {
        merge(state.orderbooks, action?.payload);
      },
      prepare: (key, data) => {
        return { payload: { [key]: data } };
      },
    },
    setOrderHistory: {
      reducer: (state, action) => {
        merge(state.orderhistories, action?.payload);
      },
      prepare: (key, data) => {
        return { payload: { [key]: data } };
      },
    },
    mergeData: {
      reducer: (state, { payload }) => {
        merge(state, payload);
      },
    },
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
});

export const {
  connected,
  disconnected,
  mergeData,
  reset,
  setPrices,
  setOrderBook,
  setOrderHistory
} = socketSlice.actions;

export default socketSlice.reducer;
