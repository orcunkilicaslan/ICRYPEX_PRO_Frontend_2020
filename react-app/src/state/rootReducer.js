import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "localforage";

import uiReducer from "./slices/ui.slice";
import apiReducer from "./slices/api.slice";
import userReducer from "./slices/user.slice";

const apiPersistConfig = {
  key: "api",
  storage,
  blacklist: ["prelogintoken", "serverdevicekey", "accesstoken"],
};

const rootReducer = combineReducers({
  ui: uiReducer,
  api: persistReducer(apiPersistConfig, apiReducer),
  user: userReducer,
});

export default rootReducer;
