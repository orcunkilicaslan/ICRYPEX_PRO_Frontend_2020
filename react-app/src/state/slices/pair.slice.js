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

const pairFilters = ["all", "starred", "TRY", "USD", "USDT"];

const initialState = {
  selected: null,
  all: [],
  symbols: [],
  favorites: [],
  visiblePairIDs: [],
  pairFilter: pairFilters[0],
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
    setPairFilter: {
      reducer: (state, action) => {
        const filter = action?.payload;

        if (pairFilters.includes(filter)) {
          state.pairFilter = filter;

          switch (filter?.toLowerCase()) {
            case "starred": {
              state.visiblePairIDs = state.favorites?.length
                ? state.all
                    ?.filter(({ id }) => state.favorites.includes(id))
                    .map(({ id }) => id)
                : [];
              break;
            }
            case "all": {
              state.visiblePairIDs = state.all.map(({ id }) => id);
              break;
            }
            default: {
              state.visiblePairIDs = state.all
                ?.filter(({ name }) => {
                  const [_, fiatCurrency] = getPairTuple(name); // eslint-disable-line

                  return filter === fiatCurrency;
                })
                .map(({ id }) => id);
            }
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
      const all = action?.payload?.description?.settings?.pairs?.map?.(pair => {
        const { id, ...rest } = pair;

        return { id: parseInt(id, 10), ...rest };
      });
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
      const favorites = action?.payload?.description;

      state.favorites = favorites;
      if (state.pairFilter === "starred") {
        state.visiblePairIDs = state.visiblePairIDs.filter(
          id => favorites.includes(id)
        );
      }
    },
  },
});

export const { reset, setSelectedPair, setPairFilter } = pairSlice.actions;

export default pairSlice.reducer;
