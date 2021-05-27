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
import { fetch } from "whatwg-fetch";

import { name } from "../../package.json";

const locales = { en, tr };
const { NODE_ENV, REACT_APP_SOCKET_BASE } = process.env;
const isProd = NODE_ENV === "production";
export const debug = _debug(name); // isProd ? makeFakeDebug() : _debug("pro");
const log = debug.extend("util");
// if (process.env.REACT_APP_DEBUG) _debug.enable(`${name}:*`);

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

//return MASK with bit ("0" or "1") at idx flipped
export const toggleBit = (MASK, idx) => {
  if (MASK?.length && idx > MASK?.length) return;

  const flip = bit => {
    if (parseInt(bit, 10)) return "0";
    else return "1";
  };

  return MASK.substr(0, idx) + flip(MASK[idx]) + MASK.substr(idx + 1);
};

// if bit is "0" -> false "1+" -> true
export const isBitOn = (MASK, idx) => Boolean(parseInt(MASK?.[idx], 10));

export const verifyCaptcha = async code => {
  try {
    const response = await fetch(`${REACT_APP_SOCKET_BASE}/verify`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const json = await response.json();

    return json.success;
  } catch (err) {
    log("Failed to verify recaptcha %O", err);
    return false;
  }
};
