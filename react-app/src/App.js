import { Fragment } from "react";
import "bootstrap/dist/js/bootstrap.bundle.js";

import "./App.scss";

import { Header } from "./components/Header/Header.jsx";
import { Main } from "./components/Main/Main.jsx";

function App() {
    return (
        <Fragment>
            <Header />
            <Main />
        </Fragment>
    );
}

export default App;
