import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const fetchStopLimitSellOrder = createAsyncThunk(
    "stoplimitsellorder",
    async (stopLimitSellOrderData, { getState, rejectWithValue }) => {
      const {
        api: { accesstoken },
      } = getState();

      try {
        const response = await api.stopLimitSellOrder(
            {...stopLimitSellOrderData},
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
    stopLimitSellOrder: {}
};

const stopLimitSellOrderSlice = createSlice({
  name: "stopLimitSellOrder",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchStopLimitSellOrder.fulfilled]: (state, action) => {
      state.stopLimitSellOrder = action?.payload?.description;
    },
  },
});

export const { reset } = stopLimitSellOrderSlice.actions;

export default stopLimitSellOrderSlice.reducer;
