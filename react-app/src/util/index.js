import cryptLib from "@skavinvarnan/cryptlib";
import {
  getFpInfo,
  // getInfoPromise,
  // getInfo,
  // saveCurrentDeviceId,
} from "@binance/fingerprint";
import _debug from "debug";
import { formatDistanceStrict } from "date-fns";
import { enUS as en, tr } from "date-fns/locale";

const locales = { en, tr };

export const formatDistance = (
  fromDate,
  toDate,
  { locale = "en", addSuffix = true }
) => {
  return formatDistanceStrict(fromDate, toDate, {
    locale: locales[locale],
    addSuffix,
  });
};

export const debug = _debug("pro");
const log = debug.extend("util");
if (process.env.REACT_APP_DEBUG) _debug.enable("pro:*");

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
