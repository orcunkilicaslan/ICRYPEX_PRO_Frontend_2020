
const OrderBook = props => {
    return (
        <div className="mainbox mainbox-orderbook">
            <div className="orderbook">
                <div className="orderbook-head">
                    <div className="orderbook-head-col buyside">
                        <h4>Alış Emirleri</h4>
                        <p>Toplam: <span className="sitecolorgreen">4790000 BTC</span></p>
                    </div>
                    <div className="orderbook-head-col spreadside">
                        <div className="spreadside-lr text-right">
                            <p className="sitecolorgreen">24566</p>
                            <p>High</p>
                        </div>
                        <div className="spreadside-df text-center">
                            <p>134.65</p>
                        </div>
                        <div className="spreadside-lr text-left">
                            <p className="sitecolorred">24230</p>
                            <p>Low</p>
                        </div>
                    </div>
                    <div className="orderbook-head-col sellside">
                        <h4>Satış Emirleri</h4>
                        <p>Toplam: <span className="sitecolorred">4790000 TRY</span></p>
                    </div>
                </div>
                <div className="orderbook-chartbox row">
                    <div className="col chartbuy">
                        <div className="orderbook-chartarea">
                            <div className="orderbook-chartarea-rectangle">
                                <div className="orderbookchart orderbookchartbuy ct-chart"></div>
                            </div>
                            <div className="orderbook-chartarea-ordertable">
                                <div className="sitetablediv">
                                    <div className="tbl-thead">
                                        <div className="tbl-tr">
                                            <div className="tbl-th fxd totl">Toplam</div>
                                            <div className="tbl-th fxd amnt">Miktar</div>
                                            <div className="tbl-th fxd pric">Fiyat</div>
                                        </div>
                                    </div>
                                    <div className="tbl-tbody">
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd totl">0.4908453</div>
                                            <div className="tbl-td fxd amnt">234.3444</div>
                                            <div className="tbl-td fxd pric">0.000230</div>
                                        </div>
                                        <div className="tbl-tr orderactive">
                                            <div className="tbl-td fxd totl">1.8045543</div>
                                            <div className="tbl-td fxd amnt">432.0045</div>
                                            <div className="tbl-td fxd pric">0.000432</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd totl">0.2334455</div>
                                            <div className="tbl-td fxd amnt">023.9450</div>
                                            <div className="tbl-td fxd pric">0.000053</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd totl">0.2390449</div>
                                            <div className="tbl-td fxd amnt">302.8432</div>
                                            <div className="tbl-td fxd pric">0.000452</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd totl">1.0734532</div>
                                            <div className="tbl-td fxd amnt">904.9322</div>
                                            <div className="tbl-td fxd pric">0.035573</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd totl">2.0794121</div>
                                            <div className="tbl-td fxd amnt">932.9935</div>
                                            <div className="tbl-td fxd pric">0.000035</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd totl">0.4908453</div>
                                            <div className="tbl-td fxd amnt">234.3444</div>
                                            <div className="tbl-td fxd pric">0.000230</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd totl">1.8045543</div>
                                            <div className="tbl-td fxd amnt">432.0045</div>
                                            <div className="tbl-td fxd pric">0.000432</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd totl">0.2334455</div>
                                            <div className="tbl-td fxd amnt">023.9450</div>
                                            <div className="tbl-td fxd pric">0.000053</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd totl">0.2390449</div>
                                            <div className="tbl-td fxd amnt">302.8432</div>
                                            <div className="tbl-td fxd pric">0.000452</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd totl">1.0734532</div>
                                            <div className="tbl-td fxd amnt">904.9322</div>
                                            <div className="tbl-td fxd pric">0.035573</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd totl">2.0794121</div>
                                            <div className="tbl-td fxd amnt">932.9935</div>
                                            <div className="tbl-td fxd pric">0.000035</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col chartsell">
                        <div className="orderbook-chartarea">
                            <div className="orderbook-chartarea-rectangle">
                                <div className="orderbookchart orderbookchartsell ct-chart"></div>
                            </div>
                            <div className="orderbook-chartarea-ordertable">
                                <div className="sitetablediv">
                                    <div className="tbl-thead">
                                        <div className="tbl-tr">
                                            <div className="tbl-th fxd pric">Fiyat</div>
                                            <div className="tbl-th fxd amnt">Miktar</div>
                                            <div className="tbl-th fxd totl">Toplam</div>
                                        </div>
                                    </div>
                                    <div className="tbl-tbody">
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd pric">0.000230</div>
                                            <div className="tbl-td fxd amnt">234.3444</div>
                                            <div className="tbl-td fxd totl">0.4908453</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd pric">0.000432</div>
                                            <div className="tbl-td fxd amnt">432.0045</div>
                                            <div className="tbl-td fxd totl">1.8045543</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd pric">0.000053</div>
                                            <div className="tbl-td fxd amnt">023.9450</div>
                                            <div className="tbl-td fxd totl">0.2334455</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd pric">0.000452</div>
                                            <div className="tbl-td fxd amnt">302.8432</div>
                                            <div className="tbl-td fxd totl">0.2390449</div>
                                        </div>
                                        <div className="tbl-tr orderactive">
                                            <div className="tbl-td fxd pric">0.035573</div>
                                            <div className="tbl-td fxd amnt">904.9322</div>
                                            <div className="tbl-td fxd totl">1.0734532</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd pric">0.000035</div>
                                            <div className="tbl-td fxd amnt">932.9935</div>
                                            <div className="tbl-td fxd totl">2.0794121</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd pric">0.000230</div>
                                            <div className="tbl-td fxd amnt">234.3444</div>
                                            <div className="tbl-td fxd totl">0.4908453</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd pric">0.000432</div>
                                            <div className="tbl-td fxd amnt">432.0045</div>
                                            <div className="tbl-td fxd totl">1.8045543</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd pric">0.000053</div>
                                            <div className="tbl-td fxd amnt">023.9450</div>
                                            <div className="tbl-td fxd totl">0.2334455</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd pric">0.000452</div>
                                            <div className="tbl-td fxd amnt">302.8432</div>
                                            <div className="tbl-td fxd totl">0.2390449</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd pric">0.035573</div>
                                            <div className="tbl-td fxd amnt">904.9322</div>
                                            <div className="tbl-td fxd totl">1.0734532</div>
                                        </div>
                                        <div className="tbl-tr">
                                            <div className="tbl-td fxd pric">0.000035</div>
                                            <div className="tbl-td fxd amnt">932.9935</div>
                                            <div className="tbl-td fxd totl">2.0794121</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderBook;