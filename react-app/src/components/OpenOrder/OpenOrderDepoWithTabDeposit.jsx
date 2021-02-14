import { useState, useContext, useEffect } from "react";
import {
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

import OpenOrderDepoWithTabDepositBank from "~/components/OpenOrder/OpenOrderDepoWithTabDepositBank.jsx";
import OpenOrderDepoWithTabDepositPapara from "~/components/OpenOrder/OpenOrderDepoWithTabDepositPapara.jsx";
import OpenOrderDepoWithTabDepositCrypto from "~/components/OpenOrder/OpenOrderDepoWithTabDepositCrypto.jsx";
import { openOrderContext, TRANSACTION_METHODS } from "./OpenOrder";

const tabs = [
  {
    title: "Banka",
    component: OpenOrderDepoWithTabDepositBank,
    method: "bank",
  },
  {
    title: "Papara",
    component: OpenOrderDepoWithTabDepositPapara,
    method: "papara",
  },
  {
    title: "Kripto",
    component: OpenOrderDepoWithTabDepositCrypto,
    method: "crypto",
  },
];

const OpenOrderDepoWithTabDeposit = props => {
  const {
    state: { method },
  } = useContext(openOrderContext);
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (TRANSACTION_METHODS.includes(method)) {
      const activeTab = tabs.find(tab => method === tab.method)?.title;
      if (activeTab) setActiveTab(activeTab);
    }
  }, [method]);

  return (
    <div className="depositandwithdraw-deposit">
      <div className="dandwtab-wrp">
        <div className="dandwtab-wrp-side">
          <Nav pills className="sitetabs pillsver">
            {tabs.map(tab => {
              const { title } = tab;
              const cls = classnames({ active: activeTab === title });

              return (
                <NavItem key={title}>
                  <NavLink className={cls} onClick={() => toggle(title)}>
                    {title}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <div className="confirmcheckbox siteformui">
            <div className="custom-control custom-checkbox">
              <Input
                className="custom-control-input"
                id="depositTabIhaveRead"
                type="checkbox"
                defaultChecked
              />
              <Label
                className="custom-control-label"
                htmlFor="depositTabIhaveRead"
              >
                <a href="#" title="" rel="bookmark" target="_blank">
                  Kural ve Şartları
                </a>{" "}
                okudum onaylıyorum.
              </Label>
            </div>
          </div>
        </div>
        <div className="dandwtab-wrp-cont tabareaflexflow">
          <TabContent className="sitetabs" activeTab={activeTab}>
            {tabs.map(({ title, component: Comp }) => {
              return (
                <TabPane key={title} tabId={title}>
                  <Comp />
                </TabPane>
              );
            })}
          </TabContent>
        </div>
      </div>
    </div>
  );
};

export default OpenOrderDepoWithTabDeposit;
