import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";

import "./App.scss";
import Header from "./components/Header/Header.jsx";
import { Main } from "./components/Main/Main.jsx";
// import { Footer } from "./components/Footer/Footer";
import { getServerDeviceKey } from "~/state/api.slice";

const App = props => {
  const { getServerDeviceKey } = props;

  useEffect(() => {
    getServerDeviceKey();
  }, [getServerDeviceKey]);

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

export default connect(null, { getServerDeviceKey })(App);
