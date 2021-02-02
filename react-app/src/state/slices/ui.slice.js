import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";

import { SUPPORTED_LANGUAGES } from "~/setupI18n";

const initialState = { lang: "en", openModal: "" };
const MODALS = ["none", "signin", "signup", "settings"];

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
});

export const { setOpenModal, setLanguage, reset } = uiSlice.actions;

export default uiSlice.reducer;
