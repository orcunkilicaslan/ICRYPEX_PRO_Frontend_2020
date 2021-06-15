import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { hasAccessToken } from "~/util/";


export const getWhitelists = createAsyncThunk(
    "cryptoaddresses/whitelists",
    async (
       _,
        { getState, rejectWithValue }
    ) => {
        const {
            api: { accesstoken },
        } = getState();

        try {
            const response = await api.cryptoAddressWhitelists(
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
export const cryptoAddressWhitelistsCreate = createAsyncThunk(
    "cryptoaddresses/whitelists/create",
    async (
        cryptoAddressData,
        { getState, rejectWithValue,dispatch }
    ) => {
        const {
            api: { accesstoken },
        } = getState();

        try {
            const response = await api.cryptoAddressWhitelistsCreate(
                cryptoAddressData,
                {
                    headers: {
                        "x-access-token": accesstoken,
                    },
                }
            );

          dispatch(getWhitelists())
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
export const cryptoAddressWhitelistsDelete = createAsyncThunk(
    "cryptoaddresses/whitelists/delete",
    async (
        {id},
        { getState, rejectWithValue }
    ) => {
        const {
            api: { accesstoken },
        } = getState();

        try {
            const response = await api.cryptoAddressWhitelistsDelete(
                {id},
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
    cryptoAddress: {},
    whitelists : []
};

const cryptoAddressWhitelistSlice = createSlice({
    name: "cryptoAddressWhitelist",
    initialState,
    reducers: {
        reset: state => {
            for (const [key, value] of Object.entries(initialState)) {
                state[key] = value;
            }
        },
    },
    extraReducers: {
        [getWhitelists.fulfilled]: (state, action) => {
            const whitelists = action?.payload?.description;
            if (whitelists) state.whitelists = whitelists;
        },
    },
});

export const { reset } = cryptoAddressWhitelistSlice.actions;

export default cryptoAddressWhitelistSlice.reducer;

