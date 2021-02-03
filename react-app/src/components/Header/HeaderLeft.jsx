import { useTranslation } from "react-i18next";

import { ButtonLink } from "../ButtonLink.jsx";

const HeaderLeft = props => {
  const { t } = useTranslation("app");

  return (
    <div className="header-left col-auto">
      <div className="header-left-logo">
        <a className="headlogo" href="/" title="ICRYPEX PRO" rel="bookmark">
          ICRYPEX PRO
        </a>
      </div>
      <div className="header-left-nav">
        <ButtonLink
          size="sm"
          variant="primary"
          href="/kolay-al"
          title="Kolay AL-Sat"
        >
          {t("easybuysell")}
        </ButtonLink>
        <ButtonLink size="sm" variant="secondary" href="/" title="PRO Görünüm">
          {t("proview")}
        </ButtonLink>
      </div>
    </div>
  );
};

export default HeaderLeft;
