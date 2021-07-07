import { useLocation, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col } from "reactstrap";
import { useSelector } from "react-redux";

import { ButtonLink } from "../ButtonLink.jsx";
import {
  pathEasyBuy,
  pathEasySell,
  pathProTrading,
  dictEasyBuy,
  dictProTrading,
} from "~/routes";

const HeaderLeft = props => {
  const { t } = useTranslation("app");
  const location = useLocation();
  const { lang } = useSelector(state => state.ui);

  return (
    <Col xs="auto" className="header-left">
      <div className="header-left-logo">
        <NavLink className="headlogo" to={"/"} title="ICRYPEX ONE">
          ICRYPEX ONE
        </NavLink>
      </div>
      <div className="header-left-nav">
        <ButtonLink
          size="sm"
          variant={
            [...pathEasyBuy, ...pathEasySell].includes(location.pathname)
              ? "primary"
              : "secondary"
          }
          to={dictEasyBuy[lang]}
          title={t("easybuysell")}
        >
          {t("easybuysell")}
        </ButtonLink>
        <ButtonLink
          size="sm"
          variant={
            ["/", ...pathProTrading].includes(location.pathname)
              ? "primary"
              : "secondary"
          }
          to={dictProTrading[lang]}
          title={t("protrading")}
        >
          {t("protrading")}
        </ButtonLink>
      </div>
    </Col>
  );
};

export default HeaderLeft;
