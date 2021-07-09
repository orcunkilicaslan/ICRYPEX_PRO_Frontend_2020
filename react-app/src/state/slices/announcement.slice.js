import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { merge } from "lodash";

import * as api from "../api";
import { hasAccessToken } from "~/util/";

export const fetchAnnouncements = createAsyncThunk(
  "announcement/fetchAll",
  async (
    { startfrom = 0, takecount = 20 } = {},
    { getState, rejectWithValue }
  ) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchAnnouncements(
        { startfrom, takecount },
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

export const fetchAnnouncementDetail = createAsyncThunk(
  "announcement/fetchDetail",
  async (announcementid, { getState, rejectWithValue }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.fetchAnnouncementDetail(
        { announcementid },
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

const initialState = {
  all: [],
  details: {},
  isFetching: false,
};

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [fetchAnnouncements.pending]: state => {
      state.isFetching = true;
    },
    [fetchAnnouncements.fulfilled]: (state, { payload }) => {
      state.all = payload.description;
      state.isFetching = false;
    },
    [fetchAnnouncements.rejected]: state => {
      state.isFetching = false;
    },
    [fetchAnnouncementDetail.pending]: state => {
      state.isFetching = true;
    },
    [fetchAnnouncementDetail.fulfilled]: (state, { payload }) => {
      const { id } = payload.description;

      merge(state.details, { [id]: payload.description });
      state.isFetching = false;
    },
    [fetchAnnouncementDetail.rejected]: state => {
      state.isFetching = false;
    },
  },
});

export const { reset } = announcementSlice.actions;

export default announcementSlice.reducer;
