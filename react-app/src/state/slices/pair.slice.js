import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { fetchSettings } from "./api.slice";

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
  selected: "BTC / TRY",
  all: [],
  favorites: [],
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
    [fetchFavoritePairs.fulfilled]: (state, action) => {
      state.favorites = action?.payload?.description;
    },
  },
});

export const { reset, setSelectedPair } = pairSlice.actions;

export default pairSlice.reducer;
