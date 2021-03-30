import cryptLib from "@skavinvarnan/cryptlib";
import {
  getFpInfo,
  // getInfoPromise,
  // getInfo,
  // saveCurrentDeviceId,
} from "@binance/fingerprint";
import _debug from "debug";
import { format, formatDistanceStrict } from "date-fns";
import { enUS as en, tr } from "date-fns/locale";
import ms from "ms";

import { name } from "../../package.json";

const locales = { en, tr };
const isProd = process.env.NODE_ENV === "production";
export const debug = _debug(name); // isProd ? makeFakeDebug() : _debug("pro");
const log = debug.extend("util");
if (process.env.REACT_APP_DEBUG) _debug.enable(`${name}:*`);

// https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
export const formatDate = (
  date,
  pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  { locale = "en" } = {}
) => {
  try {
    return format(date, pattern, {
      locale: locales[locale],
    });
  } catch (err) {
    log("%s: %O", err.message, { date, pattern, locale });
  }
};

export const formatDateDistance = (
  fromDate,
  toDate,
  { locale = "en", addSuffix = true } = {}
) => {
  try {
    return formatDistanceStrict(fromDate, toDate, {
      locale: locales[locale],
      addSuffix,
    });
  } catch (err) {
    log("%s: %O", err.message, { fromDate, toDate });
  }
};

let deviceuuid;
export const makeLocalKey = async secret => {
  let localkey;

  if (!deviceuuid) {
    try {
      const { fingerprint } = await getFpInfo();

      deviceuuid = fingerprint;
      localkey = cryptLib.encryptPlainTextWithRandomIV(fingerprint, secret);
    } catch (err) {
      log("Error while generating local key %O", err);
      throw err;
    }
  }

  return {
    deviceuuid,
    localkey,
  };
};

// "BTC / TRY" -> ["BTC", "TRY"]
export const getPairTuple = pairname => {
  return pairname?.split?.("/")?.map(string => string?.trim?.());
};

// "BTC / USD" -> "btcusd"
export const getPairPrefix = pairname => {
  return getPairTuple(pairname)?.join("")?.toLowerCase?.();
};

export const hasAccessToken = ({ api }) => {
  return !!api?.accesstoken;
};

export const hasPreloginToken = ({ api }) => {
  return !!api?.prelogintoken;
};

export const getFormattedPrice = (price, digit) => {
  if (price !== 0) {
    return parseFloat(price).toFixed(digit);
  } else {
    return "";
  }
};
