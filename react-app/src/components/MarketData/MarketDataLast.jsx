
const mdlasttable = [

    {
        id      : "01",
        time    : "09:04:24",
        amount  : "0.20493654",
        price   : "48,698"
    },
    {
        id      : "02",
        time    : "10:02:36",
        amount  : "0.00020498",
        price   : "48,698"
    },
    {
        id      : "03",
        time    : "10:01:50",
        amount  : "0.10252914",
        price   : "48,697"
    },
    {
        id      : "04",
        time    : "10:01:49",
        amount  : "0.02775202",
        price   : "48,679"
    },
    {
        id      : "05",
        time    : "10:01:49",
        amount  : "0.02062184",
        price   : "48,679"
    },
    {
        id      : "06",
        time    : "09:04:24",
        amount  : "0.20493654",
        price   : "48,698"
    }

];

const MarketDataLast = props => {
    return (
        <div className="marketdata-last">

            <div className="mdlasttable scrollbar">
                <div className="sitetablediv scrollbar-tbl">
                    <div className="scrollbar-tbl-th">
                        <div className="tbl-thead">
                            <div className="tbl-tr">
                                <div className="tbl-th fxd time">Zaman</div>
                                <div className="tbl-th fxd amnt">Miktar</div>
                                <div className="tbl-th fxd pric">Fiyat (TRY)</div>
                            </div>
                        </div>
                    </div>
                    <div className="scrollbar-tbl-tb">
                        <div className="tbl-tbody tbl-striped tbl-hovered">

                            {mdlasttable.map(({ id, time, amount, price }) => {
                                return (
                                    <div className="tbl-tr" key={id}>
                                        <div className="tbl-td fxd time">{time}</div>
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
    );
};

export default MarketDataLast;