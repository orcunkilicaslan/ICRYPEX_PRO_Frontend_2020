import { ReactComponent as MdTableFavIcon } from "../../assets/images/icons/path_icon_mdtable_fav.svg";
import { ReactComponent as MdTableSearchIcon } from "../../assets/images/icons/path_icon_mdtable_search.svg";
import { ReactComponent as PerLineIcon } from "../../assets/images/icons/path_icon_pericon.svg";

import { TableMain, TableThead, TableTbody, TableTr, TableTh, TableTd } from "../TableMain.jsx";
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
                <TableMain scrollbar>
                    <TableThead scrollbar>
                        <TableTr>
                            <TableTh sizeauto className="fav"></TableTh>
                            <TableTh sizefixed className="sym">Sembol</TableTh>
                            <TableTh sizefixed className="buy">Alış</TableTh>
                            <TableTh sizefixed className="sll">Satış</TableTh>
                            <TableTh sizefixed className="vol">Hacim</TableTh>
                            <TableTh sizefixed className="chg">Değişim</TableTh>
                            <TableTh sizeauto className="per"></TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody scrollbar striped hovered>

                        {mdsymboltable.map(({ pair, data:{buy, sell, volume, change, mdper} }) => {
                            return (
                                <TableTr key={pair}>
                                    <TableTd sizeauto className="fav">
                                        <a className="tablefavico" href="#" title="Favorime Ekle">
                                            <MdTableFavIcon />
                                        </a>
                                    </TableTd>
                                    <TableTd sizefixed className="sym">{pair}</TableTd>
                                    <TableTd sizefixed className="buy">{buy}</TableTd>
                                    <TableTd sizefixed className="sll">{sell}</TableTd>
                                    <TableTd sizefixed className="vol">{volume}</TableTd>
                                    <TableTd sizefixed className="chg">{change}</TableTd>
                                    <TableTd sizeauto className="per">
                                        <PerLineIcon className={"mdper mdper-" + mdper} />
                                    </TableTd>
                                </TableTr>
                            );
                        })}

                    </TableTbody>
                </TableMain>
            </div>
        </div>
    );
};

export default MarketDataSymbol;