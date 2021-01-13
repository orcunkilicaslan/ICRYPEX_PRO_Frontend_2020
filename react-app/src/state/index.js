import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "localforage";

import uiReducer from "./slices/ui.slice";
import apiReducer from "./slices/api.slice";

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
      middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    });

    persistor = persistStore(store, null, () => {
      resolve({ store, persistor });
    });
  } else {
    resolve({ store, persistor });
  }

  return new Promise(res => {
    resolve = res;
  });
};
