import { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import OpenOrderDepoWithTabDepositBankAkbank from "~/components/OpenOrder/OpenOrderDepoWithTabDepositBankAkbank.jsx";

const tabs = [
    {
        titleIcon: "akbank",
        component: OpenOrderDepoWithTabDepositBankAkbank,
    },
    {
        titleIcon: "ziraat",
        component: () => <div>ziraat</div>,
    },
    {
        titleIcon: "odeabank",
        component: () => <div>odeabank</div>,
    },
    {
        titleIcon: "vakifbank",
        component: () => <div>vakifbank</div>,
    },
];

const OpenOrderDepoWithTabDepositBank = props => {

    const [activeTab, setActiveTab] = useState(tabs[0].titleIcon);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div className="dandwtab-bank dandwtab-bank-tabs tabareaflexflow">
            <Nav
                justified
                className="sitetabs"
            >
                {tabs.map(tab => {
                    const { titleIcon } = tab;
                    const cls = classnames({ active: activeTab === titleIcon });

                    return (
                        <NavItem key={titleIcon}>
                            <NavLink className={`banklogostablink ${cls}`} onClick={() => toggle(titleIcon)}>
                                <i className={`banksprttablogos logo${titleIcon}`}></i>
                            </NavLink>
                        </NavItem>
                    );
                })}
            </Nav>
            <TabContent className="sitetabs" activeTab={activeTab}>
                {tabs.map(({ titleIcon, component: Comp }) => {
                    return (
                        <TabPane key={titleIcon} tabId={titleIcon}>
                            <Comp />
                        </TabPane>
                    );
                })}
            </TabContent>
            <div className="bttminfolist">
                <ul>
                    <li>Yalnızca sistemimize kayıt olduğunuz isim, soyisim ve T.C. Kimlik Numarası’na ait banka hesaplarından gelen tutarlar kabul edilmektedir.</li>
                    <li>Yatırmak istediğiniz miktarı bankanız üzerinden yukardaki Icrypex hesabına Havale/EFT yapabilirsiniz.</li>
                </ul>
            </div>
        </div>
    );
};

export default OpenOrderDepoWithTabDepositBank;