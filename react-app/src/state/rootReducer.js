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

const apiPersistConfig = {
  key: "api",
  storage,
  blacklist: ["settingno", "mediumid", "versionno"],
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

const withdrawPersistConfig = {
  key: "withdraw",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  ui: persistReducer(UIPersistConfig, uiReducer),
  api: persistReducer(apiPersistConfig, apiReducer),
  user: userReducer,
  alarm: persistReducer(alarmPersistConfig, alarmReducer),
  pair: pairReducer,
  socket: persistReducer(socketPersistConfig, socketReducer),
  assets: assetsReducer,
  order: orderReducer,
  withdraw: persistReducer(withdrawPersistConfig, withdrawReducer),
});

export default rootReducer;
