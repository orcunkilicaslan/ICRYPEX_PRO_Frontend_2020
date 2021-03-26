import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const fetchLimitBuyOrder = createAsyncThunk(
    "limitbuyorder",
    async (limitBuyOrderData, { getState, rejectWithValue }) => {
      const {
        api: { accesstoken },
      } = getState();

      try {
        const response = await api.limitBuyOrder(
            {...limitBuyOrderData},
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
    limitBuyOrder: {}
};

const limitBuyOrderSlice = createSlice({
  name: "limitBuyOrder",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchLimitBuyOrder.fulfilled]: (state, action) => {
      state.limitBuyOrder = action?.payload?.description;
    },
  },
});

export const { reset } = limitBuyOrderSlice.actions;

export default limitBuyOrderSlice.reducer;
