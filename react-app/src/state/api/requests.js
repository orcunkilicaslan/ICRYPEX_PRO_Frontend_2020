import createCache from "keshi";
import { stringify } from "querystring";

import api from ".";

const cache = createCache();
const TTL = "30 mins";

export const fetchServerDeviceKey = buildRequest("/getserverdevicekey");
export const fetchPreloginToken = buildRequest("/getprelogintoken");
export const fetchSettings = buildRequest("/settings");
export const signinWithSms = buildRequest("/signinwithsms");
export const signupUser = buildRequest("/signup");
export const signinUser = buildRequest("/signin");
export const fetchUserInfo = buildCachedRequest("/userinfo");
export const refreshToken = buildRequest("/refreshtoken");

function buildRequest(uri) {
  return (args = {}, opts = {}) => {
    const body = stringify(args);

    return api.post(uri, body, opts);
  };
}

function buildCachedRequest(uri) {
  return (args = {}, opts = {}, ttl = TTL) => {
    const body = stringify(args);
    const key = `${uri}?${body}`;
    const fn = () => api.post(uri, body, opts);

    return cache.resolve(key, fn, ttl);
  };
}
