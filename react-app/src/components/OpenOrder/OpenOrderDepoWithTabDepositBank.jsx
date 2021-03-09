import { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

import OpenOrderDepoWithTabDepositBankAkbank from "~/components/OpenOrder/OpenOrderDepoWithTabDepositBankAkbank.jsx";
import { useBanks } from "~/state/hooks/";

const tabs = [
  {
    bankCode: "00046",
    titleIcon: "akbank",
    component: OpenOrderDepoWithTabDepositBankAkbank,
  },
  {
    bankCode: "00010",
    titleIcon: "ziraat",
    component: () => <div>ziraat</div>,
  },
  {
    bankCode: "00146",
    titleIcon: "odeabank",
    component: () => <div>odeabank</div>,
  },
  {
    bankCode: "00015",
    titleIcon: "vakifbank",
    component: () => <div>vakifbank</div>,
  },
];

const OpenOrderDepoWithTabDepositBank = props => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.bankCode);
  const { accountsByBankCode } = useBanks();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="dandwtab-bank dandwtab-bank-tabs tabareaflexflow">
      <Nav justified className="sitetabs">
        {tabs.map(({ bankCode, titleIcon }) => {
          const cls = classnames({ active: activeTab === bankCode });

          return (
            <NavItem key={bankCode}>
              <NavLink
                className={`banklogostablink ${cls}`}
                onClick={() => toggle(bankCode)}
              >
                <i className={`banksprttablogos logo${titleIcon}`}></i>
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      <TabContent className="sitetabs" activeTab={activeTab}>
        {tabs.map(({ bankCode, component: Comp }) => {
          const accounts = accountsByBankCode[bankCode];

          return (
            <TabPane key={bankCode} tabId={bankCode}>
              <Comp accounts={accounts} />
            </TabPane>
          );
        })}
      </TabContent>
      <div className="bttminfolist">
        <ul>
          <li>
            Yalnızca sistemimize kayıt olduğunuz isim, soyisim ve T.C. Kimlik
            Numarası’na ait banka hesaplarından gelen tutarlar kabul
            edilmektedir.
          </li>
          <li>
            Yatırmak istediğiniz miktarı bankanız üzerinden yukardaki Icrypex
            hesabına Havale/EFT yapabilirsiniz.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OpenOrderDepoWithTabDepositBank;
