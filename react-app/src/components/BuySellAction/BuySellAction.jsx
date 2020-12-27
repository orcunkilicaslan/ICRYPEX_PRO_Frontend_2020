import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { IconSet } from "../IconSet.jsx";

import BuySellActionMarket from "./BuySellActionMarket.jsx";

const BuySellAction = props => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="mainbox mainbox-buysellaction">
            <div className="buysellaction tabareaflexflow">

                <div className="buysellaction-head">
                    <div className="buysellaction-head-col tabarea">
                        <Nav
                            pills
                            justified
                            className="sitetabs"
                        >
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { toggle('1'); }}
                                >
                                    Market
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { toggle('2'); }}
                                >
                                    Limit
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '3' })}
                                    onClick={() => { toggle('3'); }}
                                >
                                    Stop Limit
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                    <div className="buysellaction-head-col cominfo">
                        <h6>İşlem Komisyonu</h6>
                        <p>Piyasa Yapıcı 0.25% - Piyasa Alıcı 0.35%</p>
                        <IconSet
                            sprite="sprtsmclrd"
                            size="16"
                            name="info infoiconbox"
                            data-toggle="popover"
                            data-trigger="focus"
                            tabIndex="0"
                            data-container="body"
                            data-html="true"
                            data-placement="bottom"
                            data-content="<div class='tooltipbox'><div class='tooltipbox-head'><div class='tooltipbox-head-col'>VIP UCRET</div><div class='tooltipbox-head-col'>DESTEK 0850 255 1079</div></div><div class='tooltipbox-body'><div class='sitetablediv commissiontable'><div class='tbl-thead'><div class='tbl-tr'><div class='tbl-th aut txt'>TRY Hacim /<br />30 Gün</div><div class='tbl-th fxd mkr'>Piyasa Yapıcı Emirler<br/>[MAKER]</div><div class='tbl-th aut spc'></div><div class='tbl-th fxd tkr'>Piyasa Alıcı Emirler<br/>[TAKER]</div></div></div><div class='tbl-tbody tbl-brdrbtm'><div class='tbl-tr'><div class='tbl-td aut txt'>100.000</div><div class='tbl-td fxd mkr'>0.0025</div><div class='tbl-td aut spc'></div><div class='tbl-td fxd tkr'>0.0035</div></div><div class='tbl-tr'><div class='tbl-td aut txt'>1.000.000</div><div class='tbl-td fxd mkr'>0.0015</div><div class='tbl-td aut spc'></div><div class='tbl-td fxd tkr'>0.0030</div></div><div class='tbl-tr'><div class='tbl-td aut txt'>5.000.000</div><div class='tbl-td fxd mkr'>0.0010</div><div class='tbl-td aut spc'></div><div class='tbl-td fxd tkr'>0.0025</div></div></div></div></div></div>"
                        />
                    </div>
                </div>
                <TabContent className="sitetabs" activeTab={activeTab}>
                    <TabPane tabId="1">
                        <BuySellActionMarket />
                    </TabPane>
                    <TabPane tabId="2">
                        Limit
                    </TabPane>
                    <TabPane tabId="3">
                        Stop Limit
                    </TabPane>
                </TabContent>
            </div>
        </div>
    );
};

export default BuySellAction;