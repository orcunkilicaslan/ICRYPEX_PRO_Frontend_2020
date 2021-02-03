// import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";

import "./App.scss";
import Header from "~/components/Header/Header.jsx";
import { ProTrading } from "./pages/ProTrading/ProTrading.jsx";
import { EasyBuySell }from "./pages/EasyBuySell/EasyBuySell.jsx";
import { useSocket } from "~/state/hooks/";

const App = props => {
  const { socket } = useSocket();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Websocket connected");
    });
    socket.on("disconnect", reason => {
      console.log("Websocket disconnected", reason);

      // if (reason === "io server disconnect") {
      //   // the disconnection was initiated by the server, you need to reconnect manually
      //   socket.connect();
      // }
    });
    socket.on("connect_error", error => {
      console.error("Websocket connection error %s", error);
    });
    socket.io.on("reconnect_attempt", attempt => {
      console.warn(`Attempting websocket reconnection no ${attempt}`);
      // on reconnection, reset the transports option, as the Websocket
      // connection may have failed (caused by proxy, firewall, browser, ...)
      socket.io.opts.transports = ["polling", "websocket"];
    });
    socket.io.on("reconnect", attempt => {
      console.warn(
        `Succesfully reconnected to websocket on attempt ${attempt}`
      );
    });
    socket.io.on("reconnect_error", error => {
      console.error("Websocket reconnection error %s", error);
    });
    socket.io.on("reconnect_failed", () => {
      console.error("Websocket reconnection failed.");
    });
    socket.io.on("ping", () => {
      console.log("Ping");
    });
  }, [socket]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <ProTrading />
        </Route>
        <Route exact path="/kolay-al">
          <EasyBuySell />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;