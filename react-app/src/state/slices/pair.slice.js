import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { fetchSettings } from "./api.slice";
import { setPrices, setOrderBook, setOrderHistory } from "./socket.slice";
import {
  getPairTuple,
  getPairPrefix,
  hasAccessToken,
  hasPreloginToken,
} from "~/util/";

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
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return hasAccessToken(state);
    },
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
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return hasAccessToken(state);
    },
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
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return hasAccessToken(state);
    },
  }
);

export const fetchInitialOrderBook = createAsyncThunk(
  "pair/initialorderbook",
  async (pairname, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { prelogintoken },
    } = getState();

    try {
      const response = await api.fetchInitialOrderBook(
        { pairname },
        {
          headers: {
            "x-access-token": prelogintoken,
          },
        }
      );

      const data = response?.data?.description;
      const keyPrefix = getPairPrefix(pairname);
      const key = `${keyPrefix}orderbook`;

      if (response?.status) {
        dispatch(setOrderBook(key, data));
      }

      return { [keyPrefix]: data };
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  },
  {
    condition: (pairname, { getState }) => {
      const state = getState();
      const books = state.pair?.initialOrderBooks;
      const prefix = getPairPrefix(pairname);

      if (!hasPreloginToken(state)) return false;
      if (books?.includes(prefix)) return false;

      return true;
    },
  }
);

export const fetchInitialOrderHistory = createAsyncThunk(
  "pair/initialorderhistory",
  async (pairname, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { prelogintoken },
    } = getState();

    try {
      const response = await api.fetchInitialOrderHistory(
        { pairname },
        {
          headers: {
            "x-access-token": prelogintoken,
          },
        }
      );

      const data = response?.data?.description;
      const keyPrefix = getPairPrefix(pairname);
      const key = `${keyPrefix}orderhistory`;

      if (response?.status) {
        dispatch(setOrderHistory(key, data));
      }

      return { [keyPrefix]: data };
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  },
  {
    condition: (pairname, { getState }) => {
      const state = getState();
      const histories = state.pair?.initialOrderHistories;
      const prefix = getPairPrefix(pairname);

      if (!hasPreloginToken(state)) return false;
      if (histories?.includes(prefix)) return false;

      return true;
    },
  }
);

const pairFilters = ["all", "starred", "TRY", "USDT"];
const initialState = {
  selected: null,
  all: [],
  symbols: [],
  favorites: [],
  visiblePairIDs: [],
  pairFilter: pairFilters[0],
  cryptoCurrency: "",
  fiatCurrency: "",
  // if pairkey exists, initial data was fetched
  // i.e. if ["btctry"] no more requests for "btctry" data will be made
  // and instead listen for socket emitted data
  initialOrderBooks: [],
  initialOrderHistories: [],
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
          state.visiblePairIDs = getVisiblePairIDs(state, filter);
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
        state.visiblePairIDs = state.visiblePairIDs.filter(id =>
          favorites.includes(id)
        );
      }
    },
    [fetchInitialOrderHistory.fulfilled]: (state, action) => {
      const object = action?.payload;
      const [key] = Object.keys(object);

      if (!state.initialOrderHistories?.includes?.(key)) {
        state.initialOrderHistories.push(key);
      }
    },
    [fetchInitialOrderBook.fulfilled]: (state, action) => {
      const object = action?.payload;
      const [key] = Object.keys(object);

      if (!state.initialOrderBooks?.includes?.(key)) {
        state.initialOrderBooks.push(key);
      }
    },
    [setPrices]: state => {
      if (!state?.visiblePairIDs?.length) {
        state.visiblePairIDs = getVisiblePairIDs(state, state.filter);
      }
    },
  },
});

export const { reset, setSelectedPair, setPairFilter } = pairSlice.actions;

export default pairSlice.reducer;

function getVisiblePairIDs(state, filter = "all") {
  switch (filter?.toLowerCase()) {
    case "starred": {
      return state.favorites?.length
        ? state.all
            ?.filter(({ id }) => state.favorites.includes(id))
            .map(({ id }) => id)
        : [];
    }
    case "all": {
      return state.all.map(({ id }) => id);
    }
    default: {
      // filter is currency - i.e. TRY
      return state.all
        ?.filter(({ name }) => {
          const [_, fiatCurrency] = getPairTuple(name); // eslint-disable-line

          return filter === fiatCurrency;
        })
        .map(({ id }) => id);
    }
  }
}
