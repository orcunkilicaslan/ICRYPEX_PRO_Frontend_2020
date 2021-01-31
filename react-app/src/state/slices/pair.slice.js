import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { fetchSettings } from "./api.slice";

const initialState = {
  selected: "BTC / TRY",
  all: [],
};

const pairSlice = createSlice({
  name: "pair",
  initialState,
  reducers: {
    setSelectedPair: {
      reducer: (state, action) => {
        const pairname = action?.payload;
        const isValid = pair =>
          state.all.map(({ name }) => name).includes(pair);

        if (isValid(pairname)) state.selected = pairname;
      },
    },
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchSettings.fulfilled]: (state, action) => {
      state.all = action?.payload?.description?.settings?.pairs;
    },
  },
});

export const { reset, setSelectedPair } = pairSlice.actions;

export default pairSlice.reducer;
