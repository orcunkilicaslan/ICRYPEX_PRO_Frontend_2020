import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Header from "./components/Header/Header.jsx";
import { Main } from "./components/Main/Main.jsx";
// import { Footer } from "./components/Footer/Footer";

function App() {
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
}

export default App;
