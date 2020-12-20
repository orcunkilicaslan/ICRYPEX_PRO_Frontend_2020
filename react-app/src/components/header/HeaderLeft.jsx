import { LinkButton } from "../LinkButton.jsx";

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
      <div className="header-left-nav">
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

export default HeaderLeft;
