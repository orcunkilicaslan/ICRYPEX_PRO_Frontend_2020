import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const fetchStopLimitBuyOrder = createAsyncThunk(
    "stoplimitbuyorder",
    async (stopLimitBuyOrderData, { getState, rejectWithValue }) => {
      const {
        api: { accesstoken },
      } = getState();

      try {
        const response = await api.stopLimitBuyOrder(
            {...stopLimitBuyOrderData},
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
    stopLimitBuyOrder: {}
};

const stopLimitBuyOrderSlice = createSlice({
  name: "stopLimitBuyOrder",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchStopLimitBuyOrder.fulfilled]: (state, action) => {
      state.stopLimitBuyOrder = action?.payload?.description;
    },
  },
});

export const { reset } = stopLimitBuyOrderSlice.actions;

export default stopLimitBuyOrderSlice.reducer;
