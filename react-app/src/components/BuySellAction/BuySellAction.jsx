import { useState } from "react";
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

import { IconSet } from "../IconSet.jsx";
import { Button } from "../Button.jsx";
import Table from "../Table.jsx";
import BuySellActionMarket from "./BuySellActionMarket.jsx";
import BuySellActionLimit from "./BuySellActionLimit.jsx";
import BuySellActionStopLimit from "./BuySellActionStopLimit.jsx";

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
  const [activeTab, setActiveTab] = useState(tabs[0].title);

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
            <h6>İşlem Komisyonu</h6>
            <p>Piyasa Yapıcı 0.25% - Piyasa Alıcı 0.35%</p>
            <Button id="buysellactionPopover" className="popoverbtn">
              <IconSet sprite="sprtsmclrd" size="16" name="info infoiconbox" />
            </Button>
            <UncontrolledPopover
              trigger="focus"
              placement="bottom"
              target="buysellactionPopover"
            >
              <PopoverBody className="tooltipbox">
                <div className="tooltipbox-head">
                  <div className="tooltipbox-head-col">VIP UCRET</div>
                  <div className="tooltipbox-head-col">
                    DESTEK 0850 255 1079
                  </div>
                </div>
                <div className="tooltipbox-body">
                  <Table className="commissiontable">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th sizeauto className="txt">
                          TRY Hacim /<br />
                          30 Gün
                        </Table.Th>
                        <Table.Th sizefixed className="mkr">
                          Piyasa Yapıcı Emirler
                          <br />
                          [MAKER]
                        </Table.Th>
                        <Table.Th sizeauto className="spc" />
                        <Table.Th sizefixed className="tkr">
                          Piyasa Alıcı Emirler
                          <br />
                          [TAKER]
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
                <Comp />
              </TabPane>
            );
          })}
        </TabContent>
      </div>
    </div>
  );
};

export default BuySellAction;
