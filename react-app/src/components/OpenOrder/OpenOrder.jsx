import { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

import OpenOrderOrders from "./OpenOrderOrders.jsx";
import OpenOrderTransactionHistory from "./OpenOrderTransactionHistory.jsx";
import OpenOrderAssets from "./OpenOrderAssets.jsx";
import OpenOrderAccountActivities from "./OpenOrderAccountActivities.jsx";

const tabs = [
  {
    title: "Açık Emirler",
    component: OpenOrderOrders,
  },
  {
    title: "İşlem Geçmişi",
    component: OpenOrderTransactionHistory,
  },
  {
    title: "Varlıklar",
    component: OpenOrderAssets,
  },
  {
    title: "Yatır-Çek",
    component: () => <div>Yatır-Çek</div>,
  },
  {
    title: "Hesap Hareketleri",
    component: OpenOrderAccountActivities,
  },
];

const OpenOrder = props => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="mainbox mainbox-openorders">
      <div className="openorders openorders-tabs tabareaflexflow">
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

export default OpenOrder;
