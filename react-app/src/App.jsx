import { memo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Header from "~/components/Header/Header.jsx";
import { ProTrading } from "./pages/ProTrading/ProTrading.jsx";
import { EasyBuySell } from "./pages/EasyBuySell/EasyBuySell.jsx";
import { pathEasyBuy, pathEasySell } from "~/routes";

const App = props => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={[...pathEasyBuy, ...pathEasySell]}>
          <EasyBuySell />
        </Route>
        <Route path="/">
          <ProTrading />
        </Route>
      </Switch>
    </Router>
  );
};

export default memo(App);
