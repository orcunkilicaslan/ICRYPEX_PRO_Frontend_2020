import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { hasAccessToken } from "~/util/";

export const createBankAccount = createAsyncThunk(
    "bankaccounts/create",
    async (bankAccountData, { getState, rejectWithValue }) => {
        const {
            api: { accesstoken },
        } = getState();

        try {
            const response = await api.createBankAccount(
                {...bankAccountData},
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
    bankAccount: {}
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
    },
});

export const { reset } = bankAccountSlice.actions;

export default bankAccountSlice.reducer;
