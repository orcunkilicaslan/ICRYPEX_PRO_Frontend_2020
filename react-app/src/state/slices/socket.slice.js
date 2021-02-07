import { createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

const initialState = {
  connected: false,
  reason: null,
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
} = socketSlice.actions;

export default socketSlice.reducer;
