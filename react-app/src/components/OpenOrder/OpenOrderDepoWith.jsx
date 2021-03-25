import { useState, useContext, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

import { IconSet } from "../IconSet.jsx";
import OpenOrderDepoWithTabDeposit from "~/components/OpenOrder/OpenOrderDepoWithTabDeposit.jsx";
import OpenOrderDepoWithTabWithdraw from "~/components/OpenOrder/OpenOrderDepoWithTabWithdraw.jsx";
import { openOrderContext, TRANSACTION_MODES } from "./OpenOrder";

const tabs = [
  {
    title: "Yatır",
    component: OpenOrderDepoWithTabDeposit,
  },
  {
    title: "Çek",
    component: OpenOrderDepoWithTabWithdraw,
  },
];

const OpenOrderDepoWith = props => {
  const {
    state: { mode },
  } = useContext(openOrderContext);
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (TRANSACTION_MODES.includes(mode)) {
      const isDeposit = mode === "deposit";
      let activeTab;

      if (isDeposit) activeTab = tabs[0].title;
      else activeTab = tabs[1].title;

      setActiveTab(activeTab);
    }
  }, [mode]);

  return (
    <div className="openorders-dandw openorders-dandw-tabs tabareaflexflow">
      <div className="tabcont tabcont-head">
        <div className="tabcont-head-col">
          <Nav
            pills
            justified
            className="tabcont-head-navpills assets-tabs sitetabs"
          >
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
        </div>
        <div className="tabcont-head-col">
          <IconSet sprite="sprtsmclrd" size="16" name="wallet" />
          <h6>Yaklaşık Olarak</h6>
          <p>1.350.750,00 TRY / 44.815,00 BTC</p>
        </div>
      </div>
      <div className="depositandwithdraw tabareaflexflow">
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
  );
};

export default OpenOrderDepoWith;
