
import { ReactComponent as PerLineIcon } from "../../assets/images/icons/path_icon_pericon.svg";

const MarketDataDetail = props => {
    return (
        <div className="marketdata-detail">

            <div className="tabcont tabcont-head">
                <p>BTC/TRY - Bitcoin / Türk Lirası</p>
            </div>

            <div className="mddetailtable">
                <div className="sitetablediv">
                    <div className="tbl-tbody tbl-striped">
                        <div className="tbl-tr">
                            <div className="tbl-td fxd txt">Bid</div>
                            <div className="tbl-td fxd chg"><span className="sitecolorgreen">-2.22%</span></div>
                            <div className="tbl-td aut per">
                                <PerLineIcon className="mdper mdper-up" />
                            </div>
                        </div>
                        <div className="tbl-tr">
                            <div className="tbl-td fxd txt">Bid High</div>
                            <div className="tbl-td fxd chg"><span className="sitecolorred">+1.38%</span></div>
                            <div className="tbl-td aut per">
                                <PerLineIcon className="mdper mdper-down" />
                            </div>
                        </div>
                        <div className="tbl-tr">
                            <div className="tbl-td fxd txt">Bid Low</div>
                            <div className="tbl-td fxd chg"><span className="sitecolorred">+2.24%</span></div>
                            <div className="tbl-td aut per">
                                <PerLineIcon className="mdper mdper-down" />
                            </div>
                        </div>
                        <div className="tbl-tr">
                            <div className="tbl-td fxd txt">Ask</div>
                            <div className="tbl-td fxd chg"><span className="sitecolorgreen">+3.57%</span></div>
                            <div className="tbl-td aut per">
                                <PerLineIcon className="mdper mdper-up" />
                            </div>
                        </div>
                        <div className="tbl-tr">
                            <div className="tbl-td fxd txt">Ask High</div>
                            <div className="tbl-td fxd chg"><span className="sitecolorred">-1.56%</span></div>
                            <div className="tbl-td aut per">
                                <PerLineIcon className="mdper mdper-down" />
                            </div>
                        </div>
                        <div className="tbl-tr">
                            <div className="tbl-td fxd txt">Ask Low</div>
                            <div className="tbl-td fxd chg"><span className="sitecolorred">-1.56%</span></div>
                            <div className="tbl-td aut per">
                                <PerLineIcon className="mdper mdper-down" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MarketDataDetail;