import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import MarketDataSymbol from "./MarketDataSymbol.jsx";
import MarketDataDetail from "./MarketDataDetail.jsx";
import MarketDataLast from "./MarketDataLast.jsx";
import MarketDataChart from "./MarketDataChart.jsx";

const MarketData = props => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="mainbox mainbox-marketdata">
            <div className="marketdata marketdata-tabs tabareaflexflow">
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
                            Sembol
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Detay
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Son İşlemler
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            Grafik
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className="sitetabs" activeTab={activeTab}>
                    <TabPane tabId="1">
                        <MarketDataSymbol />
                    </TabPane>
                    <TabPane tabId="2">
                        <MarketDataDetail />
                    </TabPane>
                    <TabPane tabId="3">
                        <MarketDataLast />
                    </TabPane>
                    <TabPane tabId="4">
                        <MarketDataChart />
                    </TabPane>
                </TabContent>
            </div>
        </div>
    );
};

export default MarketData;