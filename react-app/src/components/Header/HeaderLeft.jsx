import { ButtonLink } from "../ButtonLink.jsx";

const HeaderLeft = props => {
  return (
    <div className="header-left col-auto">
      <div className="header-left-logo">
        <a
          className="headlogo"
          href="/"
          title="ICRYPEX PRO"
          rel="bookmark"
        >
          ICRYPEX PRO
        </a>
      </div>
      <div className="header-left-nav">
        <ButtonLink
          size="sm"
          variant="primary"
          href="/"
          title="Kolay AL-Sat"
        >
          Kolay AL-Sat
        </ButtonLink>
        <ButtonLink
          size="sm"
          variant="secondary"
          href="/"
          title="PRO Görünüm"
        >
          PRO Görünüm
        </ButtonLink>
      </div>
    </div>
  );
};

export default HeaderLeft;
