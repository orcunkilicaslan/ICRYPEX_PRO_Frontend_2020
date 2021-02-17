import "core-js/features/promise";
import "yet-another-abortcontroller-polyfill";
import "event-target-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { getStore } from "./state/";
import initI18n from "./setupI18n";
import { makeLocalKey, debug } from "./util/";
import {
  fetchSettings,
  fetchPreloginToken,
  fetchServerDeviceKey,
  setDeviceId,
  setLocalKey,
} from "./state/slices/api.slice";

const MD5_secret = process.env.REACT_APP_MD5_SECRET;
const isProd = process.env.NODE_ENV === "production";
const log = debug.extend("index");

window.__env = {
  HEAD: __env.HEAD, // eslint-disable-line
  NODE_ENV: process.env.NODE_ENV,
};

reportWebVitals(debug.extend("vitals"));
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
  await store.dispatch(fetchSettings());
  store.dispatch({ type: "socket/open" });
  render();
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

if (!isProd) {
  if (module.hot) module.hot.accept("./App", render);

  window.__util = {
    async purge() {
      try {
        await Persistor.purge();
        log("Local database purged");
      } catch (err) {
        log("Error while purging local database %O", err);
      }
    },
  };
}
