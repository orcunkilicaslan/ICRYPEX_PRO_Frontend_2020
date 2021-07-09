import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { hasAccessToken } from "~/util/";
import { fetchBankAccounts } from "~/state/slices/user.slice";

export const createBankAccount = createAsyncThunk(
  "bankaccounts/create",
  async (bankAccountData, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.createBankAccount(
        { ...bankAccountData },
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      dispatch(fetchBankAccounts());

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

export const deleteBankAccount = createAsyncThunk(
  "alarm/delete",
  async (id, { getState, rejectWithValue, dispatch }) => {
    const {
      api: { accesstoken },
    } = getState();

    try {
      const response = await api.deleteBankAccount(
        { id },
        {
          headers: {
            "x-access-token": accesstoken,
          },
        }
      );

      dispatch(fetchBankAccounts());

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
  bankAccount: {},
  isCreating: false,
  isDeleting: false,
};

const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState,
  reducers: {
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [createBankAccount.pending]: state => {
      state.isCreating = true;
    },
    [createBankAccount.fulfilled]: state => {
      state.isCreating = false;
    },
    [createBankAccount.rejected]: state => {
      state.isCreating = false;
    },
    [deleteBankAccount.pending]: state => {
      state.isDeleting = true;
    },
    [deleteBankAccount.fulfilled]: state => {
      state.isDeleting = false;
    },
    [deleteBankAccount.rejected]: state => {
      state.isDeleting = false;
    },
  },
});

export const { reset } = bankAccountSlice.actions;

export default bankAccountSlice.reducer;
