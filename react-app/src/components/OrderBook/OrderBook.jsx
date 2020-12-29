import ChartistGraph from 'react-chartist';

const orderbookbuytable = [

    {
        id      : "01",
        total   : "0.4908453",
        amount  : "234.3444",
        price   : "0.000230"
    },
    {
        id      : "02",
        total   : "1.8045543",
        amount  : "432.0045",
        price   : "0.000432"
    },
    {
        id      : "03",
        total   : "0.2334455",
        amount  : "023.9450",
        price   : "0.000053"
    },
    {
        id      : "04",
        total   : "0.2390449",
        amount  : "302.8432",
        price   : "0.000452"
    },
    {
        id      : "05",
        total   : "1.0734532",
        amount  : "904.9322",
        price   : "0.035573"
    },
    {
        id      : "06",
        total   : "2.0794121",
        amount  : "932.9935",
        price   : "0.000035"
    },
    {
        id      : "07",
        total   : "0.4908453",
        amount  : "234.3444",
        price   : "0.000230"
    },
    {
        id      : "08",
        total   : "1.8045543",
        amount  : "432.0045",
        price   : "0.000432"
    },
    {
        id      : "09",
        total   : "0.2334455",
        amount  : "023.9450",
        price   : "0.000053"
    },
    {
        id      : "10",
        total   : "0.2390449",
        amount  : "302.8432",
        price   : "0.000452"
    },
    {
        id      : "11",
        total   : "1.0734532",
        amount  : "904.9322",
        price   : "0.035573"
    },
    {
        id      : "12",
        total   : "2.0794121",
        amount  : "932.9935",
        price   : "0.000035"
    }

];

const orderbookselltable = [

    {
        id      : "01",
        total   : "0.4908453",
        amount  : "234.3444",
        price   : "0.000230"
    },
    {
        id      : "02",
        total   : "1.8045543",
        amount  : "432.0045",
        price   : "0.000432"
    },
    {
        id      : "03",
        total   : "0.2334455",
        amount  : "023.9450",
        price   : "0.000053"
    },
    {
        id      : "04",
        total   : "0.2390449",
        amount  : "302.8432",
        price   : "0.000452"
    },
    {
        id      : "05",
        total   : "1.0734532",
        amount  : "904.9322",
        price   : "0.035573"
    },
    {
        id      : "06",
        total   : "2.0794121",
        amount  : "932.9935",
        price   : "0.000035"
    },
    {
        id      : "07",
        total   : "0.4908453",
        amount  : "234.3444",
        price   : "0.000230"
    },
    {
        id      : "08",
        total   : "1.8045543",
        amount  : "432.0045",
        price   : "0.000432"
    },
    {
        id      : "09",
        total   : "0.2334455",
        amount  : "023.9450",
        price   : "0.000053"
    },
    {
        id      : "10",
        total   : "0.2390449",
        amount  : "302.8432",
        price   : "0.000452"
    },
    {
        id      : "11",
        total   : "1.0734532",
        amount  : "904.9322",
        price   : "0.035573"
    },
    {
        id      : "12",
        total   : "2.0794121",
        amount  : "932.9935",
        price   : "0.000035"
    }

];

const orderbookbuydata = {
    series: [[1,2,3,4,5,7,9,11,12,13,15,18]]
};

const orderbookselldata = {
    series: [[18,15,13,12,11,9,7,5,4,3,2,1]]
};

const orderbookchartoptions = {
    reverseData: false,
    horizontalBars: true,
    fullWidth: true,
    axisX:{
        offset: 0
    },
    axisY:{
        offset: 0
    },
    chartPadding:{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
};

const orderbookcharttype = 'Bar'


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
                                <ChartistGraph className="orderbookchart orderbookchartbuy" data={orderbookbuydata} options={orderbookchartoptions} type={orderbookcharttype} />
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

                                        {orderbookbuytable.map(({ id, total, amount, price }) => {
                                            return (
                                                <div className={"tbl-tr " + (id === "03" ? "orderactive" : "")} key={id}>
                                                    <div className="tbl-td fxd totl">{total}</div>
                                                    <div className="tbl-td fxd amnt">{amount}</div>
                                                    <div className="tbl-td fxd pric">{price}</div>
                                                </div>
                                            );
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col chartsell">
                        <div className="orderbook-chartarea">
                            <div className="orderbook-chartarea-rectangle">
                                <ChartistGraph className="orderbookchart orderbookchartsell" data={orderbookselldata} options={orderbookchartoptions} type={orderbookcharttype} />
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

                                        {orderbookselltable.map(({ id, total, amount, price }) => {
                                            return (
                                                <div className={"tbl-tr " + (id === "08" ? "orderactive" : "")} key={id}>
                                                    <div className="tbl-td fxd pric">{price}</div>
                                                    <div className="tbl-td fxd amnt">{amount}</div>
                                                    <div className="tbl-td fxd totl">{total}</div>
                                                </div>
                                            );
                                        })}

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