import { useState } from "react";
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";

import { IconSet } from "../IconSet.jsx";
import OpenOrderAssetsChartList from "./OpenOrderAssetsChartList.jsx";
import OpenOrderAssetsAddressList from "./OpenOrderAssetsAddressList.jsx";

const tabs = [
  {
    title: "Varlıklar",
    component: OpenOrderAssetsChartList,
  },
  {
    title: "Adresler",
    component: OpenOrderAssetsAddressList,
  },
];

const OpenOrderAssets = props => {

  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
      <div className="openorders-assets tabareaflexflow">
        <div className="tabcont tabcont-head">
          <div className="tabcont-head-col">
            <Nav pills justified className="tabcont-head-navpills assets-tabs sitetabs">
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
        <div className="assets assets-tabs tabareaflexflow">
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

export default OpenOrderAssets;
