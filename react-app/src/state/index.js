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
import { createSocketMiddleware } from "./middleware";

const { REACT_APP_SOCKET_BASE, NODE_ENV } = process.env;
const isProd = NODE_ENV === "production";
const persistConfig = {
  key: "root",
  storage,
  debug: Boolean(process.env.REACT_APP_DEBUG),
  blacklist: ["api", "ui", "socket", "alarm", "withdraw", "pair", "deposit"],
};
const socketIoOptions = {
  url: REACT_APP_SOCKET_BASE,
  reconnectionAttempts: isProd ? Infinity : 3,
};

export let store;
const reducer = persistReducer(persistConfig, rootReducer);
const middleware = [createSocketMiddleware(socketIoOptions)];

export const getStore = () => {
  return new Promise(resolve => {
    store = configureStore({
      reducer,
      middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        immutableCheck: {
          warnAfter: 100,
        },
      }).concat(middleware),
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
