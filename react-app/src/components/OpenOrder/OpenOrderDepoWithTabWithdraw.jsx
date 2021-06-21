import { useState, useContext, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import OpenOrderDepoWithTabWithdrawBank from "~/components/OpenOrder/OpenOrderDepoWithTabWithdrawBank.jsx";
import OpenOrderDepoWithTabWithdrawCrypto from "~/components/OpenOrder/OpenOrderDepoWithTabWithdrawCrypto.jsx";
import { openOrderContext, TRANSACTION_METHODS } from "./OpenOrder";

const OpenOrderDepoWithTabWithdraw = props => {
  const {
    state: { method },
  } = useContext(openOrderContext);
  const { t } = useTranslation(["common"]);
  const tabs = [
    {
      title: t("bank"),
      component: OpenOrderDepoWithTabWithdrawBank,
      method: "bank",
    },
    {
      title: t("crypto"),
      component: OpenOrderDepoWithTabWithdrawCrypto,
      method: "crypto",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (TRANSACTION_METHODS.includes(method)) {
      const activeTab = tabs.find(tab => method === tab.method)?.title;
      if (activeTab) setActiveTab(activeTab);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  return (
    <div className="depositandwithdraw-withdraw">
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

export default OpenOrderDepoWithTabWithdraw;
