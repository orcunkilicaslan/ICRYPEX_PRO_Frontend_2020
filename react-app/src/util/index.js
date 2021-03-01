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

import { name } from "../../package.json";

const locales = { en, tr };
export const debug = _debug(name); // isProd ? makeFakeDebug() : _debug("pro");
const log = debug.extend("util");
if (process.env.REACT_APP_DEBUG) _debug.enable(`${name}:*`);

// https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
export const formatDate = (
  date,
  pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  { locale = "en" }
) => {
  return format(date, pattern, {
    locale: locales[locale],
  });
};

export const formatDateDistance = (
  fromDate,
  toDate,
  { locale = "en", addSuffix = true }
) => {
  return formatDistanceStrict(fromDate, toDate, {
    locale: locales[locale],
    addSuffix,
  });
};

let deviceuuid, localkey;
export const makeLocalKey = async secret => {
  if (!(deviceuuid && localkey)) {
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
  return pairname?.split?.("/")?.map(string => string.trim());
};
