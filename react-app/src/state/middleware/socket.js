import io from "socket.io-client";
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
const defaults = {
  timeout: ms("30s"),
  reconnectionDelayMax: ms("3m"),
};

export default function createSocketMiddleware(options) {
  const { url, ...clientOptions } = merge({}, defaults, options);
  const client = io(url, clientOptions);

  return ({ dispatch, getState }) => {
    client.on("connect", () => {
      log("connected");
      dispatch(connected());
    });

    client.on("disconnect", reason => {
      log("disconnected %s", reason);
      dispatch(disconnected(reason));
      // if (reason === "io server disconnect") {
      //   // the disconnection was initiated by the server, you need to reconnect manually
      //   client.connect();
      // }
    });

    client.on("connect_error", error => log("connection error %O", error));
    client.io.on("reconnect_attempt", attempt => {
      log(`attempting reconnection no ${attempt}`);
      // on reconnection, reset the transports option, as the Websocket
      // connection may have failed (caused by proxy, firewall, browser, ...)
      client.io.opts.transports = ["polling", "websocket"];
    });

    client.io.on("reconnect", attempt => {
      log(`reconnected on attempt ${attempt}`);
    });

    client.io.on("reconnect_error", error => {
      log("reconnection error %s", error.message);
    });

    client.io.on("reconnect_failed", () => log("reconnection failed"));
    // client.io.on("ping", () => log("ping"));

    client.onAny((key, data) => {
      if (key.endsWith("orderbook")) {
        log("%s: %d buytotal", key, data?.buytotal);
        dispatch(setOrderBook(key, data));
      } else if (key === "prices") {
        log("%s: %s pairs", key, data.length);
        dispatch(setPrices(data));
      } else if (key.endsWith("orderhistory")) {
        log("%s: %d orders", key, data?.length);
        dispatch(setOrderHistory(key, data));
      }
    });

    return next => action => {
      if (action.type === "socket/open") client.open();
      if (action.type === "socket/close") client.close();

      next(action);
    };
  };
}
