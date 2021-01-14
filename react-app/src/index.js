import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.scss";
// import reportWebVitals from "./reportWebVitals";
import { getStore } from "./state/";
import initI18n from "./setupI18n";
import { makeLocalKey } from "./util";
import {
  fetchPreloginToken,
  fetchServerDeviceKey,
  setDeviceId,
  setLocalKey,
} from "./state/slices/api.slice";

const MD5_secret = process.env.REACT_APP_MD5_SECRET;

run();

let Store, Persistor;
async function run() {
  const { localkey, deviceuuid } = await makeLocalKey(MD5_secret);
  const { store, persistor } = await getStore();
  const {
    ui: { lang },
  } = store.getState();
  Store = store;
  Persistor = persistor;

  await initI18n(lang);
  store.dispatch(setDeviceId(deviceuuid));
  store.dispatch(setLocalKey(localkey));
  await store.dispatch(fetchServerDeviceKey());
  await store.dispatch(fetchPreloginToken());
  render();

  // Learn more: https://bit.ly/CRA-vitals
  // reportWebVitals(console.log);
}

function render() {
  const App = require("./App").default;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}
