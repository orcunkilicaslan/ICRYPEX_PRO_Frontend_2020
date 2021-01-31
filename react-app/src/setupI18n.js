import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGUAGES = ["en", "tr"];

const init = (initialLang = "en") => {
  return new Promise((resolve, reject) => {
    i18n.use(initReactI18next).init({
      debug: process.env.NODE_ENV === "development",
      resources: {
        en: {
          common: {
            yes: "Yes",
            no: "No",
            cancel: "Cancel",
            amount: "Amount",
            pair: "Pair",
            deleteAll: "Delete All"
          },
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
            setAlarm: "SET ALARM",
            createAlarm: "CREATE ALARM",
            hidePairs: "Hide Other Pairs"
          },
          alertResult: {
            success: "SUCCESS",
            warning: "WARNING!",
            error: "ERROR!",
          },
        },
        tr: {
          common: {
            yes: "Evet",
            no: "Hayır",
            cancel: "İptal",
            amount: "Miktar",
            pair: "Çift",
            deleteAll: "Tümünü Sil"
          },
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
            setAlarm: "ALARM KUR",
            createAlarm: "ALARM OLUŞTUR",
            hidePairs: "Diğer Çiftleri Gizle"
          },
          alertResult: {
            success: "BAŞARILI",
            warning: "UYARI!",
            error: "HATA!",
          },
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
