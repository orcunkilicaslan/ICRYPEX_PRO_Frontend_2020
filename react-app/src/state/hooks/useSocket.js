import { useEffect, useState } from "react";
import { useSocket as _useSocket } from "use-socketio";
import { useDispatch, useSelector } from "react-redux";

import { mergeData } from "../slices/socket.slice";

export const useSocket = eventKey => {
  const dispatch = useDispatch();
  const { accesstoken } = useSelector(state => state.api);
  const [data, setData] = useState({});
  const { socket, subscribe, unsubscribe } = _useSocket(eventKey, data => {
    console.log("event: %s %O", eventKey, data);
    dispatch(mergeData({ [eventKey]: data }));
    setData(data);
  });

  useEffect(() => {
    if (accesstoken) {
      socket.io.opts.query = {
        token: accesstoken,
      };

      if (socket.disconnected) {
        console.log("Connecting to %s", socket.io.uri);
        socket.connect();
      }

      return () => {
        socket.disconnect();
      };
    }
  }, [accesstoken, socket]);

  return { data, socket, subscribe, unsubscribe };
};
