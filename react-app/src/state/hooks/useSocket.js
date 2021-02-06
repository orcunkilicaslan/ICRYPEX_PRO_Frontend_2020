import { useEffect, useState } from "react";
import { useSocket as _useSocket } from "use-socketio";
import { useDispatch, useSelector } from "react-redux";
import { debug } from "~/util";

import { mergeData } from "../slices/socket.slice";

const log = debug.extend("socket");

export const useSocket = eventKey => {
  const dispatch = useDispatch();
  const { accesstoken } = useSelector(state => state.api);
  const [data, setData] = useState({});
  const { socket, subscribe, unsubscribe } = _useSocket(eventKey, data => {
    myLog(eventKey, data);
    // throttledMerge(data);
    dispatch(mergeData({ [eventKey]: data }));
    setData(data);
  });

  useEffect(() => {
    if (accesstoken) {
      socket.io.opts.query = {
        token: accesstoken,
      };

      if (socket.disconnected) {
        log("Connecting to %s", socket.io.uri);
        socket.connect();
      }

      return () => {
        socket.disconnect();
      };
    }
  }, [accesstoken, socket]); // eslint-disable-line

  return { data, socket, subscribe, unsubscribe };
};

function myLog(key, data) {
  if (key === "prices") log("%s: %s pairs", key, data.length);
  if (key.endsWith("orderbook")) log("%s: %j", key, data);
}
