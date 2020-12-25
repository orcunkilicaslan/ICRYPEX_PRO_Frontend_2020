import { ReactComponent as MdTableFavIcon } from "../../assets/images/icons/path_icon_mdtable_fav.svg";
import { ReactComponent as MdTableSearchIcon } from "../../assets/images/icons/path_icon_mdtable_search.svg";
import { ReactComponent as PerLineIcon } from "../../assets/images/icons/path_icon_pericon.svg";
import {LinkButton} from "../LinkButton";

const MarketDataSymbol = props => {
    return (
        <div className="marketdata-symbol">
            <div className="tabcont tabcont-filterbar siteformui row">
                <div className="btn-group btn-group-sm col" role="group">
                    <LinkButton
                        size="sm"
                        variant="secondary"
                        href="/"
                        title="Favorilerim"
                    >
                        <MdTableFavIcon className="filterfavico" />
                    </LinkButton>
                    <LinkButton
                        size="sm"
                        variant="secondary"
                        href="/"
                        title="TRY"
                    >
                        TRY
                    </LinkButton>
                    <LinkButton
                        size="sm"
                        variant="secondary"
                        href="/"
                        title="USD"
                    >
                        USD
                    </LinkButton>
                    <LinkButton
                        size="sm"
                        variant="secondary"
                        href="/"
                        title="USDT"
                    >
                        USDT
                    </LinkButton>
                    <LinkButton
                        size="sm"
                        variant="secondary active"
                        href="/"
                        title="Tümü"
                    >
                        Tümü
                    </LinkButton>
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
                            <div className="tbl-tr">
                                <div className="tbl-td aut fav">
                                    <a className="tablefavico" href="#" title="Favorime Ekle">
                                        <MdTableFavIcon />
                                    </a>
                                </div>
                                <div className="tbl-td fxd sym">BTC/TRY</div>
                                <div className="tbl-td fxd buy">3.63500</div>
                                <div className="tbl-td fxd sll">2.45300</div>
                                <div className="tbl-td fxd vol">10.23M</div>
                                <div className="tbl-td fxd chg">-2.22%</div>
                                <div className="tbl-td aut per">
                                    <PerLineIcon className="mdper mdper-up" />
                                </div>
                            </div>
                            <div className="tbl-tr">
                                <div className="tbl-td aut fav">
                                    <a className="tablefavico" href="#" title="Favorime Ekle">
                                        <MdTableFavIcon />
                                    </a>
                                </div>
                                <div className="tbl-td fxd sym">BTC/USD</div>
                                <div className="tbl-td fxd buy">5.88721</div>
                                <div className="tbl-td fxd sll">1.095200</div>
                                <div className="tbl-td fxd vol">14.02M</div>
                                <div className="tbl-td fxd chg">+1.38%</div>
                                <div className="tbl-td aut per">
                                    <PerLineIcon className="mdper mdper-down" />
                                </div>
                            </div>
                            <div className="tbl-tr">
                                <div className="tbl-td aut fav">
                                    <a className="tablefavico" href="#" title="Favorime Ekle">
                                        <MdTableFavIcon />
                                    </a>
                                </div>
                                <div className="tbl-td fxd sym">BTC/USDT</div>
                                <div className="tbl-td fxd buy">4.99102</div>
                                <div className="tbl-td fxd sll">4.05740</div>
                                <div className="tbl-td fxd vol">24.80M</div>
                                <div className="tbl-td fxd chg">+2.24%</div>
                                <div className="tbl-td aut per">
                                    <PerLineIcon className="mdper mdper-down" />
                                </div>
                            </div>
                            <div className="tbl-tr">
                                <div className="tbl-td aut fav">
                                    <a className="tablefavico" href="#" title="Favorime Ekle">
                                        <MdTableFavIcon />
                                    </a>
                                </div>
                                <div className="tbl-td fxd sym">ETH/TRY</div>
                                <div className="tbl-td fxd buy">1.88932</div>
                                <div className="tbl-td fxd sll">3.94618</div>
                                <div className="tbl-td fxd vol">12.39M</div>
                                <div className="tbl-td fxd chg">+3.57%</div>
                                <div className="tbl-td aut per">
                                    <PerLineIcon className="mdper mdper-up" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketDataSymbol;