import { useState, useCallback } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  UncontrolledPopover,
  PopoverBody,
} from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { IconSet } from "../IconSet.jsx";
import { Button } from "../Button.jsx";
import Table from "../Table.jsx";
import BuySellActionMarket from "./BuySellActionMarket.jsx";
import BuySellActionLimit from "./BuySellActionLimit.jsx";
import BuySellActionStopLimit from "./BuySellActionStopLimit.jsx";
import UserNotLoginBox from "~/pages/Sections/UserNotLoginBox.jsx";
import { setOpenModal } from "~/state/slices/ui.slice";
import {useTranslation} from "react-i18next";

const tabs = [
  {
    title: "Market",
    component: BuySellActionMarket,
  },
  {
    title: "Limit",
    component: BuySellActionLimit,
  },
  {
    title: "Stop Limit",
    component: BuySellActionStopLimit,
  },
];

const commissiontable = [
  {
    level: "100.000",
    maker: "0.0025",
    taker: "0.0035",
  },
  {
    level: "1.000.000",
    maker: "0.0015",
    taker: "0.0035",
  },
  {
    level: "5.000.000",
    maker: "0.0010",
    taker: "0.0025",
  },
];

const BuySellAction = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common", "finance"]);
  const [activeTab, setActiveTab] = useState(tabs[1].title);
  const { accesstoken } = useSelector(state => state.api);

  const openSigninModal = useCallback(() => {
    dispatch(setOpenModal("signin"));
  }, [dispatch]);

  const openSignupModal = useCallback(() => {
    dispatch(setOpenModal("signup"));
  }, [dispatch]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="mainbox mainbox-buysellaction">
      <div className="buysellaction tabareaflexflow">
        <div className="buysellaction-head">
          <div className="buysellaction-head-col tabarea">
            <Nav pills justified className="sitetabs">
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
          <div className="buysellaction-head-col cominfo">
            <h6>{t("finance:transactionCommission")}</h6>
            <p>{t("finance:marketMaker")} 0.25% - {t("finance:marketTaker")} 0.35%</p>
            <Button id="buysellactionPopover" className="popoverbtn d-none">
              <IconSet sprite="sprtsmclrd" size="16" name="info infoiconbox" />
            </Button>
            <UncontrolledPopover
              trigger="click"
              placement="bottom"
              target="buysellactionPopover"
            >
              <PopoverBody className="tooltipbox">
                <div className="tooltipbox-head">
                  <div className="tooltipbox-head-col">{t("finance:transactionCommission").toUpperCase()}</div>
                  <div className="tooltipbox-head-col">
                    {t("common:support").toUpperCase()} 0850 255 1079
                  </div>
                </div>
                <div className="tooltipbox-body">
                  <Table className="commissiontable">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th sizeauto className="txt">
                          TRY {t("common:volume")} /
                          <br />
                          30 {t("common:day")}
                        </Table.Th>
                        <Table.Th sizefixed className="mkr">
                          {t("finance:marketMaker")} {t("common:orders")}
                          <br />
                          [{t("common:maker").toUpperCase()}]
                        </Table.Th>
                        <Table.Th sizeauto className="spc" />
                        <Table.Th sizefixed className="tkr">
                          {t("finance:marketTaker")} {t("common:orders")}
                          <br />
                          [{t("common:taker").toUpperCase()}]
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody borderbottom>
                      {commissiontable.map(({ level, maker, taker }) => {
                        return (
                          <Table.Tr key={level}>
                            <Table.Td sizeauto className="txt">
                              {level}
                            </Table.Td>
                            <Table.Td sizefixed className="mkr">
                              {maker}
                            </Table.Td>
                            <Table.Td sizeauto className="spc" />
                            <Table.Td sizefixed className="tkr">
                              {taker}
                            </Table.Td>
                          </Table.Tr>
                        );
                      })}
                    </Table.Tbody>
                  </Table>
                </div>
              </PopoverBody>
            </UncontrolledPopover>
          </div>
        </div>
        <TabContent className="sitetabs" activeTab={activeTab}>
          {tabs.map(({ title, component: Comp }) => {
            return (
              <TabPane key={title} tabId={title}>
                {accesstoken ? (
                  <Comp />
                ) : (
                  <UserNotLoginBox
                    openSigninModal={openSigninModal}
                    openSignupModal={openSignupModal}
                  />
                )}
              </TabPane>
            );
          })}
        </TabContent>
      </div>
    </div>
  );
};

export default BuySellAction;
