import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "use-socketio";

import "./App.scss";
import Header from "./components/Header/Header.jsx";
import { Main } from "./components/Main/Main.jsx";
// import { Footer } from "./components/Footer/Footer";

const App = props => {
  const { accesstoken } = useSelector(state => state.api);
  const { socket } = useSocket();

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
    console.error("Websocket connection error", error);
  });
  socket.io.on("reconnect_attempt", attempt => {
    console.warn(`Attempting websocket reconnection no ${attempt}`);
  });
  socket.io.on("reconnect", attempt => {
    console.warn(`Succesfully reconnected to websocket on attempt ${attempt}`);
  });
  socket.io.on("reconnect_error", error => {
    console.error("Websocket reconnection error %O", error);
    // console.dir(error);
  });
  socket.io.on("reconnect_failed", () => {
    console.error("Websocket reconnection failed.");
  });
  socket.io.on("ping", () => {
    console.log("Ping");
  });

  useEffect(() => {
    if (accesstoken) {
      socket.connect();
      // socket.io.opts.token = accesstoken;
      socket.io.opts.query = {
        token: accesstoken,
      };

      return () => {
        socket.disconnect();
      };
    }
  }, [accesstoken, socket]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
