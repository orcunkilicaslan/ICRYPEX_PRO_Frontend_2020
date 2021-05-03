import { memo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Header from "~/components/Header/Header.jsx";
import { ProTrading } from "./pages/ProTrading/ProTrading.jsx";
import { EasyBuySell } from "./pages/EasyBuySell/EasyBuySell.jsx";

const App = props => {
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

export default memo(App);
