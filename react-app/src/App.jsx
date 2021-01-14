import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.scss";
import Header from "./components/Header/Header.jsx";
import { Main } from "./components/Main/Main.jsx";
// import { Footer } from "./components/Footer/Footer";
import {
  fetchPreloginToken,
  fetchServerDeviceKey,
  setDeviceId,
  setLocalKey,
} from "~/state/slices/api.slice";
import { makeLocalKey } from "~/util/";

const MD5_secret = process.env.REACT_APP_MD5_SECRET;

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
  const init = async () => {
    const { localkey, deviceuuid } = await makeLocalKey(MD5_secret);
      dispatch(setDeviceId(deviceuuid));
      dispatch(setLocalKey(localkey));
      dispatch(fetchServerDeviceKey());
      dispatch(fetchPreloginToken());
  };

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
