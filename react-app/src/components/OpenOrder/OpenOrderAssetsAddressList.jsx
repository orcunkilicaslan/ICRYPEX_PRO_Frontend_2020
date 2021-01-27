import { useState } from "react";
import {ButtonGroup, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";

import { Button } from "../Button.jsx";
import OpenOrderAssetsAddressListTable from "./OpenOrderAssetsAddressListTable.jsx";

const tabs = [
  {
    title: "BTC",
    component: OpenOrderAssetsAddressListTable,
  },
  {
    title: "LTC",
    component: () => <div>LTC</div>,
  },
  {
    title: "ETH",
    component: () => <div>ETH</div>,
  },
  {
    title: "XRP",
    component: () => <div>XRP</div>,
  },
  {
    title: "MPAY",
    component: () => <div>MPAY</div>,
  },
  {
    title: "BAT",
    component: () => <div>BAT</div>,
  },
  {
    title: "XLM",
    component: () => <div>XLM</div>,
  },
  {
    title: "TRYB",
    component: () => <div>TRYB</div>,
  }
];

const OpenOrderAssetsAddressList = props => {

  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
      <div className="assets-addrslist">
        <div className="assetsaddress assetsaddress-tabs tabareaflexflow">

          <ButtonGroup size="sm" className="sitetabs nav">
            {tabs.map(tab => {
              const { title } = tab;
              const cls = classnames({ active: activeTab === title });

              return (
                  <Button size="sm" variant="secondary" className={cls} onClick={() => toggle(title)} key={title}>
                    {title}
                  </Button>
              );
            })}
          </ButtonGroup>
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

export default OpenOrderAssetsAddressList;
