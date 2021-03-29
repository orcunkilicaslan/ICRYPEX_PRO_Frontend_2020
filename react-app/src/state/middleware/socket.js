import { io } from "socket.io-client";
import { merge } from "lodash";
import ms from "ms";

import { debug } from "~/util";
import {
  connected,
  disconnected,
  setPrices,
  setOrderBook,
  setOrderHistory,
} from "../slices/socket.slice";

const log = debug.extend("socket");
log.data = log.extend("data");
const defaults = {
  timeout: ms("30s"),
  reconnectionDelay: ms("5s"),
  // requestTimeout: ms("2s"),
};

export default function createSocketMiddleware(options) {
  const { url, ...clientOptions } = merge({}, defaults, options);
  const client = io(url, clientOptions);

  return ({ dispatch }) => {
    client.on("connect", function onConnect() {
      log("connected");
      dispatch(connected());
    });

    client.on("disconnect", function onDisconnect(reason) {
      log("disconnected %s", reason);
      dispatch(disconnected(reason));
      // if (reason === "io server disconnect") {
      //   // the disconnection was initiated by the server, you need to reconnect manually
      //   client.connect();
      // }
    });

    client.on("connect_error", onConnectError);

    client.onAny(function onAny(key, data) {
      if (key.endsWith("orderbook")) {
        log.data("%s: %d buytotal", key, data?.buytotal);
        dispatch(setOrderBook(key, data));
      } else if (key === "prices") {
        log.data("%s: %s pairs", key, data.length);
        dispatch(setPrices(data));
      } else if (key.endsWith("orderhistory")) {
        log.data("%s: %d orders", key, data?.length);
        dispatch(setOrderHistory(key, data));
      }
    });

    client.io.on("reconnect_attempt", onReconnectAttempt);
    client.io.on("reconnect", onReconnect);
    client.io.on("reconnect_error", onReconnectError);
    client.io.on("reconnect_failed", onReconnectFailed);

    return next => action => {
      // if (action.type === "socket/open") {
      //   if (client.disconnected) client.open();
      // }

      // if (action.type === "socket/close") {
      //   if (client.connected) client.close();
      // }

      next(action);
    };
  };
}

function onConnectError(error) {
  log("connection error %O", error);
}

function onReconnectAttempt(attempt) {
  log(`attempting reconnection no ${attempt}`);
}

function onReconnect(attempt) {
  log(`reconnected on attempt ${attempt}`);
}

function onReconnectError(error) {
  log("reconnection error %s", error.message);
}

function onReconnectFailed() {
  log("reconnection failed");
}
