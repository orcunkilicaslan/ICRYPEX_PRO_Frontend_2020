import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

import MarketDataSymbol from "./MarketDataSymbol.jsx";
import MarketDataDetail from "./MarketDataDetail.jsx";
import MarketDataLast from "./MarketDataLast.jsx";
import MarketDataChart from "./MarketDataChart.jsx";

const tabs = [
  {
    title: "Sembol",
    component: MarketDataSymbol,
  },
  {
    title: "Detay",
    component: MarketDataDetail,
  },
  {
    title: "Son İşlemler",
    component: MarketDataLast,
  },
  {
    title: "Grafik",
    component: MarketDataChart,
  },
];

const MarketData = props => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="mainbox mainbox-marketdata">
      <div className="marketdata marketdata-tabs tabareaflexflow">
        <Nav tabs justified className="sitetabs">
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

export default MarketData;
