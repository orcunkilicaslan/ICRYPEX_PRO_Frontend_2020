import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { groupBy, uniqBy, merge } from "lodash";

import * as api from "../api";

export const fetchPriceAlarms = createAsyncThunk(
  "alarm/all",
  async (_, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchPriceAlarms(
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

export const fetchPairPriceAlarms = createAsyncThunk(
  "alarm/byPair",
  async (pairname, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchPairPriceAlarms(
        { pairname },
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

export const createPairPriceAlarm = createAsyncThunk(
  "alarm/create",
  async (data, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { accesstoken },
    } = getState();
    const { pairname } = data;

    try {
      const response = await api.createPairPriceAlarm(data, {
        headers: {
          "x-access-token": accesstoken,
        },
      });

      dispatch(fetchPairPriceAlarms(pairname));

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

export const deletePairPriceAlarm = createAsyncThunk(
  "alarm/delete",
  async (pricealarmid, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.deletePairPriceAlarm(
        { pricealarmid },
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      dispatch(fetchPriceAlarms());

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

export const deletePairPriceAlarms = createAsyncThunk(
  "alarm/deleteAll",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.deletePairPriceAlarms(
        {},
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      dispatch(fetchPriceAlarms());

      return response.data;
    } catch ({ data }) {
      return rejectWithValue(data);
    }
  }
);

const initialState = {
  all: [],
  byPair: {},
  isCreating: false,
};

const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchPriceAlarms.fulfilled]: (state, action) => {
      const all = action?.payload?.description;

      state.all = mdperize(all);
      state.byPair = groupBy(state.all, ({ pairname }) => pairname);
    },
    [fetchPairPriceAlarms.fulfilled]: (state, action) => {
      const alarms = mdperize(action?.payload?.description);
      const groupedAlarms = groupBy(alarms, ({ pairname }) => pairname);

      merge(state.byPair, groupedAlarms);
      state.all = uniqBy(state.all.concat(alarms), ({ id }) => id);
    },
    [createPairPriceAlarm.pending]: state => {
      state.isCreating = true;
    },
    [createPairPriceAlarm.fulfilled]: state => {
      state.isCreating = false;
    },
    [createPairPriceAlarm.rejected]: state => {
      state.isCreating = false;
    },
  },
});

export const { reset } = alarmSlice.actions;

export default alarmSlice.reducer;

function mdperize(array = []) {
  return array.map(elem => ({
    ...elem,
    mdper: elem["pricealarmtypeid"] === 1 ? "up" : "down",
  }));
}
