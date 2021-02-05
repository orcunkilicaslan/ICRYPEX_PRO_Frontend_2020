import { useLocation, NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Col } from "reactstrap";
import { ButtonLink } from "../ButtonLink.jsx";

const HeaderLeft = props => {

    const { t } = useTranslation("app");

    const location = useLocation()
    const pathEasyBuy = "/kolay-al"
    const pathEasySell = "/kolay-sat"
    const pathHome = "/"
    const pathProTrading = "/pro-gorunum"

    return (
        <Col xs="auto" className="header-left">
            <div className="header-left-logo">
                <NavLink
                    className="headlogo"
                    to={pathHome}
                    title="ICRYPEX PRO"
                >
                    ICRYPEX PRO
                </NavLink>
            </div>
            <div className="header-left-nav">
                <ButtonLink
                    size="sm"
                    variant={(location.pathname === pathEasyBuy) || (location.pathname ===  pathEasySell) ? "primary" : "secondary"}
                    to={pathEasyBuy}
                    title={t("easybuysell")}
                >
                    {t("easybuysell")}
                </ButtonLink>
                <ButtonLink
                    size="sm"
                    variant={(location.pathname === pathHome) || (location.pathname ===  pathProTrading) ? "primary" : "secondary"}
                    to={pathProTrading}
                    title={t("protrading")}
                >
                    {t("protrading")}
                </ButtonLink>
            </div>
        </Col>
    );
};

export default HeaderLeft;