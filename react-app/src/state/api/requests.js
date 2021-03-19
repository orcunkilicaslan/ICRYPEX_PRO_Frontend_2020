import createCache from "keshi";
import { stringify } from "qs";
import ms from "ms";

import api from ".";

const cache = createCache();

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
export const fetchCryptoAddresses = buildRequest("/cryptoaddresses");
export const forgotPassword = buildRequest("/forgotpassword");
export const withdrawBankwire = buildRequest("/withdraw/bankwire");
export const withdrawPapara = buildRequest("/withdraw/papara");
export const withdrawCrypto = buildRequest("/withdraw/crypto");
export const fetchInitialOrderBook = buildCachedRequest(
  "/initialpairorderbookpro"
);
export const fetchInitialOrderHistory = buildCachedRequest(
  "/initialpairorderhistorypro"
);
export const depositBankwire = buildRequest("/deposit/bankwire");
export const depositPapara = buildRequest("/deposit/papara");
export const depositCrypto = buildRequest("/deposit/crypto");
export const fetchBankAccounts = buildCachedRequest("/bankaccounts", ms("1h"));
export const fetchPendingTransactions = buildCachedRequest(
  "/pendingtransactions",
  ms("10m")
);
export const fetchTransactionHistories = buildCachedRequest(
  "/transactionhistories",
  ms("10m")
);

function buildRequest(uri) {
  return (args = {}, opts = {}) => {
    const body = stringify(args);

    return api.post(uri, body, opts);
  };
}

function buildCachedRequest(uri, ttl = ms("3h")) {
  return (args = {}, opts = {}) => {
    const body = stringify(args);
    const key = `${uri}?${body}`;
    const fn = () => api.post(uri, body, opts);

    return cache.resolve(key, fn, ttl);
  };
}
