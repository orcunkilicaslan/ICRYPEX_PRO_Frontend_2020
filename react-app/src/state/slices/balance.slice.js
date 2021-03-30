import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const fetchBalance = createAsyncThunk(
    "balance/fetchOne",
    async ({currencyid}, { getState, rejectWithValue }) => {
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
    fiatBalance: 0,
    cryptoBalance: 0,

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
          if(action.meta.arg.isFiat) {
              state.fiatBalance = action?.payload?.description;
          }else {
              state.cryptoBalance = action?.payload?.description;
          }
      },
      [fetchBalance.pending]: state => {
          state.fiatBalance = 0
          state.cryptoBalance = 0
      },
  },
});

export const { reset } = balanceSlice.actions;

export default balanceSlice.reducer;
