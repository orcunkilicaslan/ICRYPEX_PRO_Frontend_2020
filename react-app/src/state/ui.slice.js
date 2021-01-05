import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";

const SUPPORTED_LANGUAGES = ["en", "tr"];

const uiSlice = createSlice({
  name: "ui",
  initialState: { lang: "en" },
  reducers: {
    setLanguage(state, action) {
      const language = action.payload;

      if (SUPPORTED_LANGUAGES.includes(language)) {
        i18n.changeLanguage(language);
        state.lang = language;
      }
    },
  },
});

export const { setLanguage } = uiSlice.actions;

export default uiSlice.reducer;
