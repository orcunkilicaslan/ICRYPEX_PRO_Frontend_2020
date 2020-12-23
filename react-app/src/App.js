import { Fragment } from "react";
import "bootstrap/dist/js/bootstrap.bundle.js";

import "./App.scss";
import UnknownProfileAvatar from "./assets/images/Unknown_Profile_Avatar_Icon.svg";

import { Header } from "./components/header/Header.jsx";

function App() {
  return (
    <Fragment>
      <Header />
    </Fragment>
  );
}

export default App;
