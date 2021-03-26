import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const fetchLimitSellOrder = createAsyncThunk(
    "limitsellorder",
    async (limitSellOrderData, { getState, rejectWithValue }) => {
      const {
        api: { accesstoken },
      } = getState();

      try {
        const response = await api.limitSellOrder(
            {...limitSellOrderData},
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
    limitSellOrder: {}
};

const limitSellOrderSlice = createSlice({
  name: "limitSellOrder",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchLimitSellOrder.fulfilled]: (state, action) => {
      state.limitSellOrder = action?.payload?.description;
    },
  },
});

export const { reset } = limitSellOrderSlice.actions;

export default limitSellOrderSlice.reducer;
