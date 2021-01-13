import { combineReducers } from "@reduxjs/toolkit";

import uiReducer from "./slices/ui.slice";
import apiReducer from "./slices/api.slice";

const rootReducer = combineReducers({
  ui: uiReducer,
  api: apiReducer,
});

export default rootReducer;
