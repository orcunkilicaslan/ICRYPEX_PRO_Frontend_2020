import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { groupBy } from "lodash";

import * as api from "../api";

export const fetchBalance = createAsyncThunk(
    "balance/fetchAll",
    async (currencyid, { getState, rejectWithValue }) => {
      const {
        api: { accesstoken },
      } = getState();

      try {
        const response = await api.fetchBalance(
            {currencyid},
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
  balance: 0
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchBalance.fulfilled]: (state, action) => {
      state.balance = action?.payload?.description;
    },
  },
});

export const { reset } = balanceSlice.actions;

export default balanceSlice.reducer;
