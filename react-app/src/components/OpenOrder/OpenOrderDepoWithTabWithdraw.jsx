import { useState } from "react";
import { Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import OpenOrderDepoWithTabWithdrawBank from "~/components/OpenOrder/OpenOrderDepoWithTabWithdrawBank.jsx";
import OpenOrderDepoWithTabWithdrawPapara from "~/components/OpenOrder/OpenOrderDepoWithTabWithdrawPapara.jsx";
import OpenOrderDepoWithTabWithdrawCrypto from "~/components/OpenOrder/OpenOrderDepoWithTabWithdrawCrypto.jsx";

const tabs = [
  {
    title: "Banka",
    component: OpenOrderDepoWithTabWithdrawBank,
  },
  {
    title: "Papara",
    component: OpenOrderDepoWithTabWithdrawPapara,
  },
  {
    title: "Kripto",
    component: OpenOrderDepoWithTabWithdrawCrypto,
  },
];

const OpenOrderDepoWithTabWithdraw = props => {

  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
      <div className="depositandwithdraw-withdraw">
        <div className="dandwtab-wrp">
          <div className="dandwtab-wrp-side">
            <Nav
                pills
                className="sitetabs pillsver"
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
            <div className="confirmcheckbox siteformui">
              <div className="custom-control custom-checkbox">
                <Input
                    className="custom-control-input"
                    id="withdrawTabIhaveRead"
                    type="checkbox"
                    defaultChecked
                />
                <Label
                    className="custom-control-label"
                    htmlFor="withdrawTabIhaveRead"
                >
                  <a href="#" title="" rel="bookmark" target="_blank">Kural ve Şartları</a> okudum onaylıyorum.
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

export default OpenOrderDepoWithTabWithdraw;