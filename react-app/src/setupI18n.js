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
            cancelled: "Canceled",
            canceled: "Canceled",
            "partially filled": "Partially Filled",
            rejected: "Rejected",
            expired: "Expired",
            notifications: "Notifications",
            markRead: "Mark as Read",
            markAllRead: "Mark All as Read",
            unreadMessage: "You have {{count}} unread message",
            unreadMessage_plural: "You have {{count}} unread messages",
            hasNotification: "You Have {{count}} Notification",
            hasNotification_plural: "You Have {{count}} Notifications",
            signOut: "Sign Out",
            myAccount: "My Account",
            profile: "Profile",
            approvalLimit: "Account Approval & Limit",
            assets: "Assets",
            commissionRates: "Commission Rates",
            accountDetails: "Bank Account Details",
            security: "Security",
            sessionSecurity: "Sign In & Session Security",
            twofa: "2FA Activation",
            specialKey: "Create a Special Key",
            activityHistory: "Activity History",
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
            approximately: "Approx.",
            and: "and",
            goBack: "Go Back",
            support: "Support",
            orders: "Orders",
            maker: "Maker",
            taker: "Taker",
            day: "Days",
            buy: "Buy",
            sell: "Sell",
            "1g": "1D",
            "1h": "1W",
            "2h": "2W",
            "1a": "1M",
            "3a": "3M",
            turkishLira: "Turkish Lira",
            usDollar: "Us Dollar",
            failed: "Failed",
            success: "Success",
            close: "CLOSE",
            date: "Date",
            average: "Average",
            commission: "Commission",
            status: "Status",
            dateRange: "Date Range",
            startDate: "Start Date",
            endDate: "End Date",
            addresses: "Addresses",
            bank: "Bank",
            crypto: "Crypto",
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
            realized: "Realized",
            canceled: "Cancelled",
            addBankAccount: "Add New Bank Account",
            selectBank: "Select A Bank",
            addAccount: "Add Account",
            deposit: "Deposit",
            withdraw: "Withdraw",
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
            passwordNotMatch: "Passwords do not match",
          },
          openorder: {
            openOrders: "Open Orders",
            tradeHistory: "Transaction History",
            depowith: "Deposit & Withdraw",
            accountActivities: "Account Activities",
            tradePairs: "Trade Pairs",
            tradeStatus: "Trade Status",
            openOrdersFilter: "Open Orders Filter",
            tradeType: "Trade Type",
            sortBy: "Sort by",
            newestFirst: "Newest First",
            oldestFirst: "Oldest First",
            buyFirst: "Buy Orders First",
            sellFirst: "Sell Orders First",
            alpha: "Alphabetical",
            tradeNo: "Trade No",
            filterTransactions: "Filter Transactions",
            tradeHistoryFilter: "Transaction History Filter",
            noBalance: "No balance.",
            toView:
              "You can select one of the following deposit options to view.",
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
            canceled: "İptal",
            "partially filled": "Kısmi kapandı",
            rejected: "Red edildi",
            expired: "Süre doldu",
            notifications: "Bildirimler",
            markRead: "Okundu Olarak İşaretle",
            markAllRead: "Tümünü Okundu Olarak İşaretle",
            unreadMessage: "{{count}} Okunmamış Mesaj",
            unreadMessage_plural: "{{count}} Okunmamış Mesaj",
            hasNotification: "{{count}} Adet Bildiriminiz Var",
            hasNotification_plural: "{{count}} Adet Bildiriminiz Var",
            signOut: "Çıkış Yap",
            myAccount: "Hesabım",
            profile: "Profil",
            approvalLimit: "Hesap Onayı & Limit",
            assets: "Varlıklar",
            commissionRates: "Komisyon Oranları",
            accountDetails: "Banka Hesap Bilgileri",
            security: "Güvenlik",
            sessionSecurity: "Giriş & Oturum Güvenliği",
            twofa: "2FA Aktivasyon",
            specialKey: "Özel Anahtar Oluştur",
            activityHistory: "Hareket Geçmişi",
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
            turkishLira: "Türk Lirası",
            usDollar: "ABD Doları",
            success: "Başarılı",
            close: "KAPAT",
            failed: "İşlem Başarısız",
            date: "Tarih",
            average: "Ortalama",
            commission: "Komisyon",
            status: "Durum",
            dateRange: "Tarih Aralığı",
            startDate: "Başlangıç Tarihi",
            endDate: "Bitiş Tarihi",
            addresses: "Adresler",
            bank: "Banka",
            crypto: "Kripto",
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
            realized: "Tamamlandı",
            canceled: "İptal",
            addBankAccount: "Yeni Banka Hesabı Ekle",
            selectBank: "Banka Seçiniz",
            addAccount: "Hesap Ekle",
            deposit: "Yatır",
            withdraw: "Çek",
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
            verificationCode: "Doğrulama Kodunu Giriniz",
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
            passwordNotMatch: "Şifreler eşleşmiyor",
          },
          openorder: {
            openOrders: "Açık Emirler",
            tradeHistory: "İşlem Geçmişi",
            depowith: "Yatır-Çek",
            accountActivities: "Hesap Hareketleri",
            tradePairs: "İşlem Çiftleri",
            tradeStatus: "İşlem Durumu",
            openOrdersFilter: "Açık Emirler Filtre",
            tradeType: "İşlem Tipi",
            sortBy: "Sıralama",
            newestFirst: "Önce Yeni Tarihli",
            oldestFirst: "Önce Eski Tarihli",
            buyFirst: "Önce Alış",
            sellFirst: "Önce Satış",
            alpha: "Alfabetik",
            tradeNo: "İşlem No",
            filterTransactions: "İşlemleri Filtrele",
            tradeHistoryFilter: "İşlem Geçmişi Filtre",
            noBalance: "Bakiyeniz bulunmamaktadır.",
            toView:
              "Görüntüleyebilmeniz için aşağıdaki para yatırma seeneklerinden birisini tercih edebilirsiniz.",
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
