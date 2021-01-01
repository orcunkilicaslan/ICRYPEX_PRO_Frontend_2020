import React from "react";
import ReactDOM from "react-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

i18n.use(initReactI18next).init({
    resources: {
      en: {
        coinbar: {
          lastPrice: "Last Price",
          bestBuy: "Best Buy",
          bestSell: "Best Sell",
          change24h: "Change 24h",
          high24h: "High 24h",
          low24h: "Low 24h",
          average24h: "Average 24h",
          volume: "Volume",
          excavating: "Excavating",
        },
      },
      tr: {
        coinbar: {
          lastPrice: "Son Fiyat",
          bestBuy: "En İyi Alış",
          bestSell: "En İyi Satış",
          change24h: "24s Değişim",
          high24h: "24s En Yüksek",
          low24h: "24s En Düşük",
          average24h: "24s Ortalama",
          volume: "Hacim",
          excavating: "Kazılacak",
        },
      },
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
