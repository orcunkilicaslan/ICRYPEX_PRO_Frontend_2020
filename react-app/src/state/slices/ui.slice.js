import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";

import { SUPPORTED_LANGUAGES } from "~/setupI18n";

const uiSlice = createSlice({
  name: "ui",
  initialState: { lang: "en" },
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
  },
});

export const { setLanguage } = uiSlice.actions;

export default uiSlice.reducer;
