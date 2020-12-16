import classNames from "classnames";

import { LinkButton } from "../LinkButton.jsx";

export const Header = props => {
  const { className } = props;

  return (
    <header className={classNames("header", className)}>
      <div className="container-fluid">
        <div className="row">
          <HeaderLeft />
        </div>
      </div>
    </header>
  );
};

const HeaderLeft = props => {
  return (
    <div className="header-left col-auto">
      <div className="header-left-logo">
        <a
          className="headlogo"
          href="Home_Page.html"
          title="ICRYPEX PRO"
          rel="bookmark"
        >
          ICRYPEX PRO
        </a>
      </div>
      <div className="header-left-btn">
        <LinkButton
          size="sm"
          variant="primary"
          href="Kolay_Al_Step_01.html"
          title="Kolay AL-Sat"
        >
          Kolay AL-Sat
        </LinkButton>
        <LinkButton
          size="sm"
          variant="secondary"
          href="Home_Page.html"
          title="PRO Görünüm"
        >
          PRO Görünüm
        </LinkButton>
      </div>
    </div>
  );
};
