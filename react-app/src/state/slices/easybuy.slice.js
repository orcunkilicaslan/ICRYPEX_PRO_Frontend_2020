import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const fetchEasyBuy = createAsyncThunk(
    "easybuy/fetchAll",
    async (easyBuyData, { getState, rejectWithValue }) => {
      const {
        api: { accesstoken },
      } = getState();

      try {
        const response = await api.easyBuy(
            {...easyBuyData},
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
  easyBuy: {}
};

const easyBuySlice = createSlice({
  name: "easyBuy",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchEasyBuy.fulfilled]: (state, action) => {
      state.easyBuy = action?.payload?.description;
    },
  },
});

export const { reset } = easyBuySlice.actions;

export default easyBuySlice.reducer;
