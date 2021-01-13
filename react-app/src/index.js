import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.scss";
// import reportWebVitals from "./reportWebVitals";
import { getStore } from "./state/";
import initI18n from "./setupI18n";

run();

let Store, Persistor;
async function run() {
  const { store, persistor } = await getStore();
  const {
    ui: { lang },
  } = store.getState();
  Store = store;
  Persistor = persistor;

  await initI18n(lang);
  await render();

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
