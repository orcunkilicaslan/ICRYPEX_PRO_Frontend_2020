import { NavLink as RRNavLink, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Nav, NavItem, NavLink, Row } from "reactstrap";
import {useTranslation} from "react-i18next";

import MarketData from "~/components/MarketData/MarketData.jsx";
import PrimaryMainCont from "~/components/PrimaryMainCont.jsx";

const EasyBuySellBody = props => {

    const { t } = useTranslation("navMenu");
    const tabs = [
        {
            idx: 1,
            title: t("easybuy").toUpperCase(),
            tabcls: "nav-buy",
            href: "/kolay-al",
        },
        {
            idx: 2,
            title: t("easysell").toUpperCase(),
            tabcls: "nav-sell",
            href: "/kolay-sat",
        }
    ];

    return (
        <section className="main-body main-h100">
            <Container fluid>
                <Row>
                    <aside className="main-body-leftside col-auto">
                        <MarketData />
                    </aside>
                    <section className="main-body-rightcont col">
                        <PrimaryMainCont box>
                            <PrimaryMainCont.MainTitle titleName={t("easybuysell")} />
                            <PrimaryMainCont.MainContent contentClassName="easybuysell">
                                <PrimaryMainCont.Sub className="easybuysell">
                                    <PrimaryMainCont.SubContent>

                                        <Nav pills justified className="sitetabs easybuysell-tabs">
                                            {tabs.map(tab => {
                                                const { idx, title, tabcls, href } = tab;
                                                return (
                                                    <NavItem key={idx}>
                                                        <NavLink className={tabcls} tag={RRNavLink} to={href} activeClassName="active">
                                                            {title}
                                                        </NavLink>
                                                    </NavItem>
                                                );
                                            })}
                                        </Nav>
                                        <Switch>
                                            <Route exact path="/kolay-al">
                                                <div>KOLAY AL</div>
                                            </Route>
                                            <Route exact path="/kolay-sat">
                                                <div>KOLAY SAT</div>
                                            </Route>
                                        </Switch>

                                    </PrimaryMainCont.SubContent>
                                </PrimaryMainCont.Sub>
                            </PrimaryMainCont.MainContent>
                        </PrimaryMainCont>
                    </section>
                </Row>
            </Container>
        </section>
    );
};

export default EasyBuySellBody;