import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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

import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  debug: process.env.NODE_ENV === "development",
};
const reducer = persistReducer(persistConfig, rootReducer);

let store, persistor;
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
    // TODO: setTimeout(0) gerekebilir
    resolve({ store, persistor });
  }

  return new Promise(res => {
    resolve = res;
  });
};

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    if (store) {
      const newRootReducer = require("./rootReducer").default;
      store.replaceReducer(newRootReducer);
    }
  });
}
