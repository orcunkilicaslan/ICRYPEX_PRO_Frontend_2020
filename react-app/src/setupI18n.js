import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGUAGES = ["en", "tr"];

const init = (initialLang = "en") => {
  return new Promise((resolve, reject) => {
    i18n.use(initReactI18next).init({
      debug: process.env.NODE_ENV === "development",
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
          alertResult: {
            success: "SUCCESS",
            warning: "WARNING!",
            error: "ERROR!"
          }
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
          alertResult: {
            success: "BAŞARILI",
            warning: "UYARI!",
            error: "HATA!"
          }
        },
      },
      supportedLngs: SUPPORTED_LANGUAGES,
      lng: initialLang,
      fallbackLng: "en",

      interpolation: {
        escapeValue: false,
      },
    });

    resolve();
  });
};

export default init;
