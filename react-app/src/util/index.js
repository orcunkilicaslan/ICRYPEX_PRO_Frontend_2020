import cryptLib from "@skavinvarnan/cryptlib";
import {
  getFpInfo,
  // getInfoPromise,
  // getInfo,
  // saveCurrentDeviceId,
} from "@binance/fingerprint";

let deviceuuid, localkey;
export const makeLocalKey = async secret => {
  if (!(deviceuuid && localkey)) {
    try {
      const { fingerprint } = await getFpInfo();

      deviceuuid = fingerprint;
      localkey = cryptLib.encryptPlainTextWithRandomIV(fingerprint, secret);
    } catch (err) {
      console.error("Error while generating local key", err);
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
