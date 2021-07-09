import { useState, useContext, useEffect } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";

import { IconSet } from "../IconSet.jsx";
import OpenOrderDepoWithTabDeposit from "~/components/OpenOrder/OpenOrderDepoWithTabDeposit.jsx";
import OpenOrderDepoWithTabWithdraw from "~/components/OpenOrder/OpenOrderDepoWithTabWithdraw.jsx";
import { openOrderContext, TRANSACTION_MODES } from "./OpenOrder";

const OpenOrderDepoWith = props => {
  const { allAssets } = useSelector(state => state.assets);
  const { t } = useTranslation(["common", "finance"]);

  const tabs = [
    {
      title: t("finance:deposit"),
      component: OpenOrderDepoWithTabDeposit,
    },
    {
      title: t("finance:withdraw"),
      component: OpenOrderDepoWithTabWithdraw,
    },
  ];

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <h6>{t("approximately")}</h6>
          <p>
            <NumberFormat
              value={allAssets?.total_TRY}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale
              suffix={" TRY"}
            />
            {" / "}
            <NumberFormat
              value={allAssets?.total_BTC}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale
              suffix={" BTC"}
            />
          </p>
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
