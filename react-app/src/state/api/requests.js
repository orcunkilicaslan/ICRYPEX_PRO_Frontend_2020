import createCache from "keshi";
import { stringify } from "querystring";
import ms from "ms";

import api from ".";

const cache = createCache();
const TTL = ms("30m");

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
export const fetchCryptoAddresses = buildRequest("/cryptoaddresses");
export const forgotPassword = buildRequest("/forgotpassword");
export const withdrawBankwire = buildRequest("/withdraw/bankwire");
export const withdrawPapara = buildRequest("/withdraw/papara");
export const withdrawCrypto = buildRequest("/withdraw/crypto");
export const fetchInitialOrderBook = buildCachedRequest(
  "/initialpairorderbook",
  ms("5h")
);
export const fetchInitialOrderHistory = buildCachedRequest(
  "/initialpairorderhistory",
  ms("5h")
);
export const depositBankwire = buildRequest("/deposit/bankwire");
export const depositPapara = buildRequest("/deposit/papara");
export const depositCrypto = buildRequest("/deposit/crypto");

function buildRequest(uri) {
  return (args = {}, opts = {}) => {
    const body = stringify(args);

    return api.post(uri, body, opts);
  };
}

function buildCachedRequest(uri, ttl = TTL) {
  return (args = {}, opts = {}) => {
    const body = stringify(args);
    const key = `${uri}?${body}`;
    const fn = () => api.post(uri, body, opts);

    return cache.resolve(key, fn, ttl);
  };
}
