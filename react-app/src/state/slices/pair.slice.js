import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { fetchSettings } from "./api.slice";
import { getPairTuple } from "~/util/";

export const fetchFavoritePairs = createAsyncThunk(
  "pair/fetchfavorites",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchFavoritePairs(
        {},
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

export const addFavoritePair = createAsyncThunk(
  "pair/addfavorite",
  async (pairname, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.addFavoritePair(
        { pairname },
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      dispatch(fetchFavoritePairs());

      return { pairname, ...response?.data };
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

export const removeFavoritePair = createAsyncThunk(
  "pair/removefavorite",
  async (pairname, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.removeFavoritePair(
        { pairname },
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      dispatch(fetchFavoritePairs());

      return { pairname, ...response?.data };
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

const initialState = {
  selected: null,
  all: [],
  symbols: [],
  favorites: [],
  cryptoCurrency: "",
  fiatCurrency: "",
};

const pairSlice = createSlice({
  name: "pair",
  initialState,
  reducers: {
    setSelectedPair: {
      reducer: (state, action) => {
        const symbol = action?.payload;

        if (state.symbols.includes(symbol)) {
          const selected = state.all.find(pair => symbol === pair?.symbol);

          if (selected) {
            const [cryptoCurrency, fiatCurrency] = getPairTuple(selected.name);

            state.selected = selected;
            state.cryptoCurrency = cryptoCurrency;
            state.fiatCurrency = fiatCurrency;
          }
        }
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
      const all = action?.payload?.description?.settings?.pairs;
      const symbols = all.map?.(({ symbol }) => symbol);

      if (!state.selected) {
        const pair = all?.[0];
        const [cryptoCurrency, fiatCurrency] = getPairTuple(pair.name);

        state.selected = pair;
        state.cryptoCurrency = cryptoCurrency;
        state.fiatCurrency = fiatCurrency;
      }

      state.all = all;
      state.symbols = symbols;
    },
    [fetchFavoritePairs.fulfilled]: (state, action) => {
      state.favorites = action?.payload?.description;
    },
    // [mergeData.fulfilled]: (state, action) => {
    //   const prices = action?.payload?.prices;
    //   const selected = state.all.find(pair => symbol === pair?.symbol);
    //   if (selected) state.selected = selected;
    // },
  },
});

export const { reset, setSelectedPair } = pairSlice.actions;

export default pairSlice.reducer;
