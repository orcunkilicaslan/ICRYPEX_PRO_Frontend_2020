import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { connect } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import Header from "./components/Header/Header.jsx";
import { Main } from "./components/Main/Main.jsx";
// import { Footer } from "./components/Footer/Footer";
import { fetchServerDeviceKey } from "~/state/slices/api.slice";
import { makeLocalKey } from "~/util/";

const MD5_secret = process.env.REACT_APP_MD5_SECRET;

const App = props => {
  const dispatch = useDispatch();
  const init = async () => {
    const { localkey, deviceuuid } = await makeLocalKey(MD5_secret);
    dispatch(fetchServerDeviceKey({ localkey, deviceuuid }, deviceuuid));
  };

  useEffect(() => {
    init();
  }, []);

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
