// import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.scss";
import Header from "~/components/Header/Header.jsx";
import { ProTrading } from "./pages/ProTrading/ProTrading.jsx";
import { EasyBuySell } from "./pages/EasyBuySell/EasyBuySell.jsx";
import { useSocket } from "~/state/hooks/";
import { refreshToken } from "./state/slices/api.slice";
import { debug } from "~/util";

const log = debug.extend("socket");

const App = props => {
  const dispatch = useDispatch();
  const { socket } = useSocket();

  useEffect(() => {
    socket.on("connect", () => {
      log("Connected");
    });
    socket.on("disconnect", reason => {
      log("Disconnected %s", reason);

      // if (reason === "io server disconnect") {
      //   // the disconnection was initiated by the server, you need to reconnect manually
      //   socket.connect();
      // }
    });
    socket.on("connect_error", error => {
      if (error?.message?.includes("accesstoken")) {
        dispatch(refreshToken());
      }

      log("Connection error %o", error);
    });
    socket.io.on("reconnect_attempt", attempt => {
      log(`Attempting reconnection no ${attempt}`);
      // on reconnection, reset the transports option, as the Websocket
      // connection may have failed (caused by proxy, firewall, browser, ...)
      socket.io.opts.transports = ["polling", "websocket"];
    });
    socket.io.on("reconnect", attempt => {
      log(`Reconnected on attempt ${attempt}`);
    });
    socket.io.on("reconnect_error", error => {
      log("Reconnection error %o", error);
    });
    socket.io.on("reconnect_failed", () => {
      log("Reconnection failed");
    });
    socket.io.on("ping", () => {
      log("Ping");
    });
  }, [dispatch, socket]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={["/", "/pro-gorunum"]}>
          <ProTrading />
        </Route>
        <Route exact path={["/kolay-al", "/kolay-sat"]}>
          <EasyBuySell />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;