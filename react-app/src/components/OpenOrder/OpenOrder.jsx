import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import OpenOrderOrders from "./OpenOrderOrders.jsx";
import OpenOrderTransactionHistory from "./OpenOrderTransactionHistory.jsx";
import OpenOrderAssets from "./OpenOrderAssets.jsx";
import OpenOrderDepositWithdrawal from "./OpenOrderDepositWithdrawal.jsx";
import OpenOrderAccountActivities from "./OpenOrderAccountActivities.jsx";

const OpenOrder = props => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="mainbox mainbox-openorders">
            <div className="openorders openorders-tabs tabareaflexflow">
                <Nav
                    tabs
                    justified
                    className="sitetabs"
                >
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Açık Emirler
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            İşlem Geçmişi
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Varlıklar
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            Yatır-Çek
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '5' })}
                            onClick={() => { toggle('5'); }}
                        >
                            Hesap Hareketleri
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className="sitetabs" activeTab={activeTab}>
                    <TabPane tabId="1">
                        <OpenOrderOrders />
                    </TabPane>
                    <TabPane tabId="2">
                        <OpenOrderTransactionHistory />
                    </TabPane>
                    <TabPane tabId="3">
                        <OpenOrderAssets />
                    </TabPane>
                    <TabPane tabId="4">
                        <OpenOrderDepositWithdrawal />
                    </TabPane>
                    <TabPane tabId="5">
                        <OpenOrderAccountActivities />
                    </TabPane>
                </TabContent>
            </div>
        </div>
    );
};

export default OpenOrder;