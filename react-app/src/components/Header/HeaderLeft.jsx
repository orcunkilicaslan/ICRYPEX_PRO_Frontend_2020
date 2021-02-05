import { useLocation } from 'react-router-dom';
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
                <a
                    className="headlogo"
                    href={pathHome}
                    title="ICRYPEX PRO"
                    rel="bookmark"
                >
                    ICRYPEX PRO
                </a>
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