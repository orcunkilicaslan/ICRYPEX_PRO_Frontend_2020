import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGUAGES = ["en", "tr"];

const init = (initialLang = "en") => {
  return new Promise((resolve, reject) => {
    i18n.use(initReactI18next).init({
      debug: Boolean(process.env.REACT_APP_DEBUG),
      resources: {
        en: {
          app: {
            protrading: "PRO Trading",
            easybuysell: "Easy Buy-Sell",
            easybuy: "Easy Buy",
            easysell: "Easy Sell",
            newsanalysis: "News & Analysis",
          },
          common: {
            yes: "Yes",
            no: "No",
            cancel: "Cancel",
            amount: "Amount",
            pair: "Pair",
            deleteAll: "Delete All",
            symbol: "Symbol",
            detail: "Detail",
            recentTransactions: "Recent Transactions",
            graph: "Graph",
            change: "Change",
            volume: "Volume",
            all: "All",
            search: "Search",
            signin: "Sign In",
            signup: "Sign Up",
            total: "Total",
            high: "High",
            low: "Low",
            price: "Price",
            time: "Time",
          },
          finance: {
            ask: "Ask",
            bid: "Bid",
            buyOrders: "Buy Orders",
            sellOrders: "Sell Orders",
            buywhat: "BUY {{item}}",
            sellwhat: "SELL {{item}}",
            portfolio: "Portfolio"
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
            deleteAllAlarms: "CLEAR ALL ALARMS",
            hidePairs: "Hide Other Pairs",
          },
          alertResult: {
            success: "SUCCESS",
            warning: "WARNING!",
            error: "ERROR!",
          },
          notLoginBox: {
            cantview: "You can't view this section",
            toview: "To view, please Sign up or Sign in",
          },
        },
        tr: {
          app: {
            protrading: "PRO Görünüm",
            easybuysell: "Kolay Al-Sat",
            easybuy: "Kolay Al",
            easysell: "Kolay Sat",
            newsanalysis: "Haber & Analiz",
          },
          common: {
            yes: "Evet",
            no: "Hayır",
            cancel: "İptal",
            amount: "Miktar",
            pair: "Çift",
            deleteAll: "Tümünü Sil",
            symbol: "Sembol",
            detail: "Detay",
            recentTransactions: "Son İşlemler",
            graph: "Grafik",
            change: "Değişim",
            volume: "Hacim",
            all: "Tümü",
            search: "Ara",
            signin: "Üye Girişi",
            signup: "Kayıt Ol",
            total: "Toplam",
            high: "Yüksek",
            low: "Düşük",
            price: "Fiyat",
            time: "Zaman",
          },
          finance: {
            ask: "Alış",
            bid: "Satış",
            buyOrders: "Alış Emirleri",
            sellOrders: "Satış Emirleri",
            buywhat: "{{item}} AL",
            sellwhat: "{{item}} SAT",
            portfolio: "Portföy"
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
            deleteAllAlarms: "TÜM ALARMLARI SİL",
            hidePairs: "Diğer Çiftleri Gizle",
          },
          alertResult: {
            success: "BAŞARILI",
            warning: "UYARI!",
            error: "HATA!",
          },
          notLoginBox: {
            cantview: "Bu alanı görüntüleyemiyorsunuz",
            toview: "Görüntülemek için Üye Girişi ya da Kayıt Olun",
          },
        },
      },
      supportedLngs: SUPPORTED_LANGUAGES,
      lng: initialLang,
      fallbackLng: "en",
    });

    resolve();
  });
};

export default init;
