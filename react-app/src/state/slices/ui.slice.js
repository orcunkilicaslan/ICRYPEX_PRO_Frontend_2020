import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";

import { SUPPORTED_LANGUAGES } from "~/setupI18n";

const initialState = { lang: "en", errors: [{ type: null, message: "" }] };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
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
    pushError: (state, { payload }) => {
      const { type, message } = payload;

      state.errors.push({ type, message });
    },
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
});

export const { setLanguage, pushError, reset } = uiSlice.actions;

export default uiSlice.reducer;
