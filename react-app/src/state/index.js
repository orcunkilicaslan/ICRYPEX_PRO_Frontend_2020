import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import uiReducer from "./ui.slice";

let store;
const reducer = combineReducers({
  ui: uiReducer,
});

export const getStore = () => {
  if (!store) store = configureStore({ reducer });

  return store;
};
