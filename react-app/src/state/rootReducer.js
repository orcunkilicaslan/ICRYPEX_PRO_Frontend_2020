import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "localforage";

import uiReducer from "./slices/ui.slice";
import apiReducer from "./slices/api.slice";
import userReducer from "./slices/user.slice";
import alarmReducer from "./slices/alarm.slice";
import pairReducer from "./slices/pair.slice";
import socketReducer from "./slices/socket.slice";
import assetsReducer from "./slices/assets.slice";
import orderReducer from "./slices/order.slice";
import withdrawReducer from "./slices/withdraw.slice";
import depositReducer from "./slices/deposit.slice";
import transactionReducer from "./slices/transaction.slice";

const apiPersistConfig = {
  key: "api",
  storage,
  blacklist: [
    "settingno",
    "mediumid",
    "versionno",
    "isRefreshingAccessToken",
    "isRefreshingPreloginToken",
    "accesstokenExpiresAt",
    "prelogintokenExpiresAt",
  ],
};

const UIPersistConfig = {
  key: "ui",
  storage,
  whitelist: ["lang"],
};

const socketPersistConfig = {
  key: "socket",
  storage,
  blacklist: ["connected", "reason"],
};

const alarmPersistConfig = {
  key: "alarm",
  storage,
  blacklist: ["isCreating", "isDeleting"],
};

const pairPersistConfig = {
  key: "pair",
  storage,
  blacklist: ["initialOrderBooks", "initialOrderHistories"],
};

const orderPersistConfig = {
  key: "pair",
  storage,
  blacklist: ["isFetchingHistory", "isFetchingOpen"],
};

const rootReducer = combineReducers({
  ui: persistReducer(UIPersistConfig, uiReducer),
  api: persistReducer(apiPersistConfig, apiReducer),
  user: userReducer,
  alarm: persistReducer(alarmPersistConfig, alarmReducer),
  pair: persistReducer(pairPersistConfig, pairReducer),
  socket: persistReducer(socketPersistConfig, socketReducer),
  assets: assetsReducer,
  order: persistReducer(orderPersistConfig, orderReducer),
  withdraw: withdrawReducer,
  deposit: depositReducer,
  transaction: transactionReducer,
});

export default rootReducer;
