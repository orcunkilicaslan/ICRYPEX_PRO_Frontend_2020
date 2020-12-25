import { ReactComponent as PerLineIcon } from "../../assets/images/icons/path_icon_pericon.svg";
import { IconSet } from "../IconSet.jsx";

const priceListJSON = {

    "coinid": 1,
    "data": {
        "lastPrice"     : "43,199",
        "bestBuy"       : "21,149",
        "bestSell"      : "12,345",
        "change24h"     : "10,539",
        "high24h"       : "24,247",
        "low24h"        : "7,357",
        "average24h"    : "32,643",
        "volume"        : "32,643",
        "excavating"    : "1,474,00"
    }
};

const CompCryptocoinbar = props => {
    return (
        <div className="mainbox mainbox-cryptocoinbar">
            <div className="cryptocoinbar siteformui">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <span className="input-group-text selectedcur">BTC/TRY</span>
                    </div>
                    <div className="cryptostatsbar">
                        <div className="cryptostatsbar-biger">
                            <PerLineIcon className="mdper mdper-up" />
                            <span className="sitecolorgreen">9198.00</span>
                        </div>
                        <div className="cryptostatsbar-stats">
                            <ul className="bigstatslist">
                                <li>
                                    <h6>Son Fiyat</h6>
                                    <p>{priceListJSON.data.lastPrice} TRY</p>
                                </li>
                                <li>
                                    <h6>En İyi Alış</h6>
                                    <p>{priceListJSON.data.bestBuy} TRY</p>
                                </li>
                                <li>
                                    <h6>En İyi Satış</h6>
                                    <p>{priceListJSON.data.bestSell} TRY</p>
                                </li>
                                <li>
                                    <h6>24s Değişim</h6>
                                    <p>{priceListJSON.data.change24h} TRY</p>
                                </li>
                                <li>
                                    <h6>24s En Yüksek</h6>
                                    <p>{priceListJSON.data.high24h} TRY</p>
                                </li>
                                <li>
                                    <h6>24s En Düşük</h6>
                                    <p>{priceListJSON.data.lastPrice} TRY</p>
                                </li>
                                <li>
                                    <h6>24s Ortalama</h6>
                                    <p>{priceListJSON.data.average24h} TRY</p>
                                </li>
                                <li>
                                    <h6>BTC Hacim</h6>
                                    <p>{priceListJSON.data.volume} TRY</p>
                                </li>
                                <li>
                                    <h6>Kazılacak BTC</h6>
                                    <p>{priceListJSON.data.excavating} BTC</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="input-group-append">
                        <div className="input-group-text alarmbtn">
                            <a
                                className="iconbtn iconbtn-warning btn-sm"
                                href="#"
                                title="Alarm Kur"
                                data-toggle="modal"
                                data-target="#modalSetAlarm"
                            >
                                <div className="iconbtn-svg">
                                    <IconSet
                                        sprite="sprtsmclrd"
                                        size="16"
                                        name="bell"
                                    >
                                    </IconSet>
                                </div>
                                <div className="iconbtn-txt">
                                    <span>Alarm Kur</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompCryptocoinbar;