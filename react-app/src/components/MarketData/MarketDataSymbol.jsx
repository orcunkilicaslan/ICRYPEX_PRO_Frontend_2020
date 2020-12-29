import { ReactComponent as MdTableFavIcon } from "../../assets/images/icons/path_icon_mdtable_fav.svg";
import { ReactComponent as MdTableSearchIcon } from "../../assets/images/icons/path_icon_mdtable_search.svg";
import { ReactComponent as PerLineIcon } from "../../assets/images/icons/path_icon_pericon.svg";
import { ButtonLink } from "../ButtonLink.jsx";

const mdsymboltable = [

    {
        pair: "BTC/TRY",
        data: {
            buy     : "3.63500",
            sell    : "2.45300",
            volume  : "10.23M",
            change  : "-2.22%",
            mdper   : "up",
        }
    },
    {
        pair: "BTC/USD",
        data: {
            buy     : "5.88721",
            sell    : "1.095200",
            volume  : "14.02M",
            change  : "+1.38%",
            mdper   : "down",
        }
    },
    {
        pair: "BTC/USDT",
        data: {
            buy     : "4.99102",
            sell    : "4.05740",
            volume  : "24.80M",
            change  : "+2.24%",
            mdper   : "down",
        }
    },
    {
        pair: "ETH/TRY",
        data: {
            buy     : "1.88932",
            sell    : "3.94618",
            volume  : "12.39M",
            change  : "+3.57%",
            mdper   : "up",
        }
    }

];

const MarketDataSymbol = props => {
    return (
        <div className="marketdata-symbol">
            <div className="tabcont tabcont-filterbar siteformui row">
                <div className="btn-group btn-group-sm col" role="group">
                    <ButtonLink
                        size="sm"
                        variant="secondary"
                        href="/"
                        title="Favorilerim"
                    >
                        <MdTableFavIcon className="filterfavico" />
                    </ButtonLink>
                    <ButtonLink
                        size="sm"
                        variant="secondary"
                        href="/"
                        title="TRY"
                    >
                        TRY
                    </ButtonLink>
                    <ButtonLink
                        size="sm"
                        variant="secondary"
                        href="/"
                        title="USD"
                    >
                        USD
                    </ButtonLink>
                    <ButtonLink
                        size="sm"
                        variant="secondary"
                        href="/"
                        title="USDT"
                    >
                        USDT
                    </ButtonLink>
                    <ButtonLink
                        size="sm"
                        variant="secondary active"
                        href="/"
                        title="Tümü"
                    >
                        Tümü
                    </ButtonLink>
                </div>
                <div className="btn-group btn-group-sm col-auto" role="group">
                    <input className="mdsearchinput form-control form-control-sm" type="text" placeholder="Arama" value="" />
                    <div className="mdsearchicon">
                        <MdTableSearchIcon />
                    </div>
                </div>
            </div>
            <div className="mdsymboltable scrollbar">
                <div className="sitetablediv scrollbar-tbl">
                    <div className="scrollbar-tbl-th">
                        <div className="tbl-thead">
                            <div className="tbl-tr">
                                <div className="tbl-th aut fav"></div>
                                <div className="tbl-th fxd sym">Sembol</div>
                                <div className="tbl-th fxd buy">Alış</div>
                                <div className="tbl-th fxd sll">Satış</div>
                                <div className="tbl-th fxd vol">Hacim</div>
                                <div className="tbl-th fxd chg">Değişim</div>
                                <div className="tbl-th aut per"></div>
                            </div>
                        </div>
                    </div>
                    <div className="scrollbar-tbl-tb">
                        <div className="tbl-tbody tbl-striped tbl-hovered">

                            {mdsymboltable.map(({ pair, data:{buy, sell, volume, change, mdper} }) => {
                                return (
                                    <div className="tbl-tr" key={pair}>
                                        <div className="tbl-td aut fav">
                                            <a className="tablefavico" href="#" title="Favorime Ekle">
                                                <MdTableFavIcon />
                                            </a>
                                        </div>
                                        <div className="tbl-td fxd sym">{pair}</div>
                                        <div className="tbl-td fxd buy">{buy}</div>
                                        <div className="tbl-td fxd sll">{sell}</div>
                                        <div className="tbl-td fxd vol">{volume}</div>
                                        <div className="tbl-td fxd chg">{change}</div>
                                        <div className="tbl-td aut per">
                                            <PerLineIcon className={"mdper mdper-" + mdper} />
                                        </div>
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

export default MarketDataSymbol;