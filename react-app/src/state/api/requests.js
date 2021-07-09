import createCache from "keshi";
import { stringify } from "qs";
import ms from "ms";
import { get, set, keys, del, clear } from "idb-keyval";

import api from ".";

const customStorage = { get, set, keys, del, clear };
customStorage.clear(); // clear cache on page refresh
export const cache = createCache({ customStorage });

export const fetchServerDeviceKey = buildRequest("/getserverdevicekey");
export const fetchPreloginToken = buildRequest("/getprelogintoken");
export const fetchSettings = buildCachedRequest("/settings");
export const signinWithSms = buildRequest("/signinwithsms");
export const signinWith2FA = buildRequest("/signinwith2fa");
export const signupUser = buildRequest("/signup");
export const signinUser = buildRequest("/signin");
export const signoutUser = buildRequest("/signout");
export const fetchUserInfo = buildCachedRequest("/userinfo");
export const refreshToken = buildRequest("/refreshtoken");
export const fetchPriceAlarms = buildRequest("/pricealarms");
export const fetchPairPriceAlarms = buildRequest("/pairpricealarms");
export const createPairPriceAlarm = buildRequest("/pairpricealarms/create");
export const deletePairPriceAlarm = buildRequest("/pricealarms/delete");
export const deletePairPriceAlarms = buildRequest("/pricealarms/deleteall");
export const fetchFavoritePairs = buildRequest("/favoritepairs");
export const addFavoritePair = buildRequest("/addpairtofavorites");
export const removeFavoritePair = buildRequest("/removepairfromfavorites");
export const fetchAssets = buildRequest("/assets");
export const fetchBalance = buildRequest("/balance");
export const easyBuy = buildRequest("/easybuy");
export const easySell = buildRequest("/easysell");
export const limitBuyOrder = buildRequest("/limitbuyorder");
export const limitSellOrder = buildRequest("/limitsellorder");
export const stopLimitBuyOrder = buildRequest("/stoplimitbuyorder");
export const stopLimitSellOrder = buildRequest("/stoplimitsellorder");
export const fetchCryptoAddresses = buildRequest("/cryptoaddresses");
export const forgotPassword = buildRequest("/forgotpassword");
export const withdrawBankwire = buildRequest("/withdraw/bankwire");
export const uyegiris = buildRequest("/tr/uye-girisi-ea");
export const loginAt = buildRequest("/en/login-at");
export const withdrawCrypto = buildRequest("/withdraw/crypto");
export const fetchInitialOrderBook = buildRequest("/initialpairorderbookpro");
export const fetchInitialOrderHistory = buildRequest(
  "/initialpairorderhistorypro"
);
export const depositBankwire = buildRequest("/deposit/bankwire");
export const cryptoAddressCreate = buildRequest("/cryptoaddresses/create");
export const cryptoAddressWhitelists = buildRequest(
  "/cryptoaddresses/whitelists"
);
export const cryptoAddressWhitelistsCreate = buildRequest(
  "/cryptoaddresses/whitelists/create"
);
export const cryptoAddressWhitelistsDelete = buildRequest(
  "/cryptoaddresses/whitelists/delete"
);
export const depositCrypto = buildRequest("/deposit/crypto");
export const fetchBankAccounts = buildRequest("/bankaccounts");
export const fetchPendingTransactions = buildCachedRequest(
  "/pendingtransactions",
  ms("10m")
);
export const cancelPendingTransaction = buildRequest(
  "/pendingtransactions/cancel"
);
export const fetchTransactionHistories = buildCachedRequest(
  "/transactionhistories",
  ms("10m")
);
export const fetchOrderHistory = buildRequest("/orderhistory");
export const fetchOrderHistoryDetail = buildRequest("/orderhistorydetail");
export const fetchOpenOrders = buildCachedRequest("/openorders", ms("5m"));
export const deleteOpenOrder = buildRequest("/deleteopenorder");
export const createBankAccount = buildRequest("/bankaccounts/create");
export const deleteBankAccount = buildRequest("/bankaccounts/delete");
export const fetchAnnouncements = buildRequest("/announcementnotifications");
export const fetchAnnouncementDetail = buildRequest("/announcementnotifications/detail");

function buildRequest(uri) {
  return (args = {}, opts = {}) => {
    const body = stringify(args);

    return api.post(uri, body, opts);
  };
}

function buildCachedRequest(uri, ttl = ms("3h")) {
  const request = (args = {}, opts = {}) => {
    const body = stringify(args);
    const key = `${uri}?${body}`;
    const fn = () => api.post(uri, body, opts);

    return cache.resolve(key, fn, ttl);
  };

  request.uri = uri;
  return request;
}
