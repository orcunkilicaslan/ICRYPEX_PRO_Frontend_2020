import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import MarketDataSymbol from "./MarketDataSymbol.jsx";
import MarketDataDetail from "./MarketDataDetail.jsx";
import MarketDataLast from "./MarketDataLast.jsx";
import MarketDataChart from "./MarketDataChart.jsx";

const MarketData = props => {
  const { t } = useTranslation("common");
  const tabs = [
    {
      title: t("symbol"),
      component: MarketDataSymbol,
      idx: 1,
    },
    {
      title: t("detail"),
      component: MarketDataDetail,
      idx: 2,
    },
    {
      title: t("recentTransactions"),
      component: MarketDataLast,
      idx: 3,
    },
    {
      title: t("graph"),
      component: MarketDataChart,
      idx: 4,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].idx);

  const toggle = idx => {
    if (activeTab !== idx) setActiveTab(idx);
  };

  return (
    <div className="mainbox mainbox-marketdata">
      <div className="marketdata marketdata-tabs tabareaflexflow">
        <Nav tabs justified className="sitetabs">
          {tabs.map(tab => {
            const { title, idx } = tab;
            const cls = classnames({ active: activeTab === idx });

            return (
              <NavItem key={title}>
                <NavLink className={cls} onClick={() => toggle(idx)}>
                  {title}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent className="sitetabs" activeTab={activeTab}>
          {tabs.map(({ title, component: Comp, idx }) => {
            return (
              <TabPane key={title} tabId={idx}>
                <Comp />
              </TabPane>
            );
          })}
        </TabContent>
      </div>
    </div>
  );
};

export default MarketData;
