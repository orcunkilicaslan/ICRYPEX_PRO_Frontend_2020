import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "localforage";

import uiReducer from "./ui.slice";
import apiReducer from "./api.slice";

const persistConfig = {
  key: "root",
  storage,
  debug: process.env.NODE_ENV === "development",
};

let store, persistor;
const rootReducer = combineReducers({
  ui: uiReducer,
  api: apiReducer,
});

const reducer = persistReducer(persistConfig, rootReducer);

export const getStore = () => {
  let resolve;

  if (!store) {
    store = configureStore({
      reducer,
      // middleware: getDefaultMiddleware => getDefaultMiddleware(),concat()
    });

    persistor = persistStore(store, null, () => {
      resolve({ store, persistor });
    });
  }

  return new Promise(res => {
    resolve = res;
  });
};
