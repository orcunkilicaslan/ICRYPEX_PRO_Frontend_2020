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
            orderStatus: "Order Status",
            new: "New",
            filled: "Filled",
            cancelled: "Cancelled",
            "partially filled": "Partially Filled",
            rejected: "Rejected",
            expired: "Expired",
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
            total: "Total",
            high: "High",
            low: "Low",
            price: "Price",
            time: "Time",
            approximately: "Approximately",
            and: "and",
            goBack: "Go Back",
            support: "Support",
            orders: "Orders",
            day: "Days",
            buy: "Buy",
            sell: "Sell",
            "1g": "1D",
            "1h": "1W",
            "2h": "2W",
            "1a": "1M",
            "3a": "3M",
          },
          finance: {
            ask: "Ask",
            bid: "Bid",
            buyOrders: "Buy Orders",
            sellOrders: "Sell Orders",
            buywhat: "BUY {{item}}",
            sellwhat: "SELL {{item}}",
            portfolio: "Portfolio",
            available: "Available",
            amountToBeTaken: "Amount to be Taken",
            amountToBeSold: "Amount to be Sold",
            market: "Market",
            transactionCommission: "Transaction Commission",
            marketMaker: "Market Maker",
            marketTaker: "Market Taker",
            yatırma: "Deposit",
            çekme: "Withdraw",
            banka: "Bank",
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
          login: {
            cantview: "You can't view this section",
            toview: "To view, please Sign up or Sign in",
            signin: "Sign In",
            signup: "Sign Up",
            commercialConsent:
              "I want to be notified of commercial announcements",
            notARobot: "I am not a robot",
            enterCode: "Enter Verification Code",
            verificationCode: "Verification Code",
            forgotPassword: "Forgot my password?",
            sendCode: "Send verification code",
            reSendCode: "Resend Code",
            email: "E-Mail",
            password: "Password",
            confirmPassword: "Confirm password",
            firstname: "Name",
            surname: "Surname",
            phone: "Phone",
            oldEnough: "I declare that I am at least 18 years old",
            preliminary: "Preliminary information",
            termsOfService: "Terms of service",
            readAndAgree: "read and agree",
          },
          form: {
            isRequired: "This field is required",
            shouldBeMin: "Should be at least {{value}}",
            shouldBeMax: "Should be at most {{value}}",
            withdrawAmount: "Withdraw Amount",
            shouldBeMinLength: "Should be at least {{value}} characters",
            shouldBeMaxLength: "Should be at most {{value}} characters",
          },
        },
        tr: {
          app: {
            protrading: "PRO Görünüm",
            easybuysell: "Kolay Al-Sat",
            easybuy: "Kolay Al",
            easysell: "Kolay Sat",
            newsanalysis: "Haber & Analiz",
            orderStatus: "İşlem Durumu",
            new: "Yeni",
            filled: "Kapandı",
            cancelled: "İptal",
            "partially filled": "Kısmi kapandı",
            rejected: "Red edildi",
            expired: "Süre doldu",
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
            total: "Toplam",
            high: "Yüksek",
            low: "Düşük",
            price: "Fiyat",
            time: "Zaman",
            approximately: "Yaklaşık",
            and: "ve",
            goBack: "Geri Git",
            support: "Destek",
            orders: "Emirler",
            maker: "Yapıcı",
            taker: "Alıcı",
            day: "Gün",
            buy: "Alış",
            sell: "Satış",
            "1g": "1G",
            "1h": "1H",
            "2h": "2H",
            "1a": "1A",
            "3a": "3A",
          },
          finance: {
            ask: "Alış",
            bid: "Satış",
            buyOrders: "Alış Emirleri",
            sellOrders: "Satış Emirleri",
            buywhat: "{{item}} AL",
            sellwhat: "{{item}} SAT",
            portfolio: "Portföy",
            available: "Kullanılabilir",
            amountToBeTaken: "Alınacak Miktar",
            market: "Piyasa",
            transactionCommission: "İşlem Komisyonu",
            marketMaker: "Piyasa Yapıcı",
            marketTaker: "Piyasa Alıcı",
            yatırma: "Yatırma",
            çekme: "Çekme",
            banka: "Banka",
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
          login: {
            cantview: "Bu alanı görüntüleyemiyorsunuz",
            toview: "Görüntülemek için Üye Girişi ya da Kayıt Olun",
            signin: "Üye Girişi",
            signup: "Kayıt Ol",
            commercialConsent:
              "Ticari reklam ve duyurulardan haber almak istiyorum",
            notARobot: "Ben robot değilim",
            enterCode: "Doğrulama kodunu giriniz",
            verificationCode: "Doğrulama kodu",
            forgotPassword: "Şifremi unuttum?",
            sendCode: "Doğrulama kodu gönder",
            reSendCode: "Kodu Tekrar Gönder",
            email: "E-Posta",
            password: "Şifre",
            confirmPassword: "Şifreyi tekrarla",
            firstname: "Adınız",
            surname: "Soyadınız",
            phone: "Telefon",
            oldEnough: "En az 18 yaşında olduğumu beyan ederim",
            preliminary: "Ön bilgilendirme metni",
            termsOfService: "Kullanım sözleşmesini",
            readAndAgree: "okudum ve onaylıyorum",
          },
          form: {
            isRequired: "Bu alanı doldurmalısınız",
            shouldBeMin: "En az {{value}} olabilir",
            shouldBeMax: "En çok {{value}} olabilir",
            withdrawAmount: "Çekmek İstenilen Miktar",
            shouldBeMinLength: "En az {{value}} hane olmalı",
            shouldBeMaxLength: "En fazla {{value}} hane olmalı",
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
