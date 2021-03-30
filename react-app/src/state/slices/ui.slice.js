import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";

import { SUPPORTED_LANGUAGES } from "~/setupI18n";
import { signinWithSms, signinWith2FA } from "~/state/slices/api.slice";
import {
  signinUser,
  signupUser,
  forgotPassword,
} from "~/state/slices/user.slice";

const initialState = {
  lang: "en",
  openModal: "",
  isSigningin: false,
  isSigningup: false,
  isVerifying: false,
  isResetingPassword: false,
};
const MODALS = [
  "none",
  "signin",
  "signup",
  "forgotpassconfirm",
  "forgotpassword",
  "settings",
  "alarm",
  "buysellconfirm",
  "depositwithdrawalterms",
  "orderopenordersfilter",
  "orderhistoryfilter",
  "notifications",
  "verify",
];

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOpenModal: (state, { payload }) => {
      if (MODALS.includes(payload) && payload !== state.openModal) {
        state.openModal = payload;
      }
    },
    setLanguage: {
      reducer: (state, { payload }) => {
        state.lang = payload;
      },
      prepare: language => {
        if (SUPPORTED_LANGUAGES.includes(language)) {
          i18n.changeLanguage(language);
        }

        return { payload: language };
      },
    },
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {
    [signupUser.pending]: state => {
      state.isSigningup = true;
    },
    [signupUser.fulfilled]: (state, action) => {
      state.isSigningup = false;
    },
    [signupUser.rejected]: state => {
      state.isSigningup = false;
    },
    [signinUser.pending]: state => {
      state.isSigningin = true;
    },
    [signinUser.fulfilled]: state => {
      state.isSigningin = false;
    },
    [signinUser.rejected]: state => {
      state.isSigningin = false;
    },
    [signinWithSms.pending]: state => {
      state.isVerifying = true;
    },
    [signinWithSms.fulfilled]: state => {
      state.isVerifying = false;
    },
    [signinWithSms.rejected]: state => {
      state.isVerifying = false;
    },
    [signinWith2FA.pending]: state => {
      state.isVerifying = true;
    },
    [signinWith2FA.fulfilled]: state => {
      state.isVerifying = false;
    },
    [signinWith2FA.rejected]: state => {
      state.isVerifying = false;
    },
    [forgotPassword.pending]: state => {
      state.isResetingPassword = true;
    },
    [forgotPassword.fulfilled]: state => {
      state.isResetingPassword = false;
    },
    [forgotPassword.rejected]: state => {
      state.isResetingPassword = false;
    },
  },
});

export const { setOpenModal, setLanguage, reset } = uiSlice.actions;

export default uiSlice.reducer;
