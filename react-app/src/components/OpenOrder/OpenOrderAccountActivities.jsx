import { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import OpenOrderAccountActivitiesPending from "./OpenOrderAccountActivitiesPending.jsx";
import OpenOrderAccountActivitiesHistory from "./OpenOrderAccountActivitiesHistory.jsx";

const OpenOrderAccountActivities = props => {
  const { t } = useTranslation(["openorder", "common"]);
  const tabs = [
    {
      title: t("pendingOrders"),
      component: OpenOrderAccountActivitiesPending,
    },
    {
      title: t("transferHistory"),
      component: OpenOrderAccountActivitiesHistory,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="openorders-activities">
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
          <Button type="button" className="printiconlink">
            <span>{t("common:print")}</span>
            <IconSet sprite="sprtsmclrd" size="16" name="print" />
          </Button>
        </div>
      </div>
      <div className="activities activities-tabs tabareaflexflow">
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

export default OpenOrderAccountActivities;
