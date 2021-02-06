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
  debug: Boolean(process.env.REACT_APP_DEBUG),
  blacklist: ["api", "ui"],
};

export let store;
const reducer = persistReducer(persistConfig, rootReducer);

export const getStore = () => {
  return new Promise(resolve => {
    store = configureStore({
      reducer,
      middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        immutableCheck: {
          warnAfter: 50,
        },
      }),
    });

    const persistor = persistStore(store, null, () => {
      resolve({ store, persistor });
    });
  });
};

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store?.replaceReducer(newRootReducer);
  });
}
