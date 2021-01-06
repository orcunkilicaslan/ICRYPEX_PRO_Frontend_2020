import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getStore } from "./state/";
import initI18n from "./setupI18n";

run();

async function run() {
  const { store, persistor } = await getStore();
  const {
    ui: { lang },
  } = store.getState();

  await initI18n(lang);

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
