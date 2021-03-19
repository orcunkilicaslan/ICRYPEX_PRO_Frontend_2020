import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const fetchEasySell = createAsyncThunk(
    "easysell/fetchAll",
    async (sellsellData, { getState, rejectWithValue }) => {
      const {
        api: { accesstoken },
      } = getState();

      try {
        const response = await api.easySell(
            {...sellsellData},
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
  easySell: {}
};

const easySellSlice = createSlice({
  name: "easySell",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchEasySell.fulfilled]: (state, action) => {
      state.easySell = action?.payload?.description;
    },
  },
});

export const { reset } = easySellSlice.actions;

export default easySellSlice.reducer;
