import { IconSet } from "../IconSet.jsx";
import BuySellActionMarket from "./BuySellActionMarket.jsx";

const BuySellAction = props => {
    return (
        <div className="mainbox mainbox-buysellaction">
            <div className="buysellaction tabareaflexflow">

                <div className="buysellaction-head">
                    <div className="buysellaction-head-col tabarea">
                        <ul className="sitetabs nav nav-pills nav-justified" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" href="#bs_market" data-toggle="tab" role="tab" aria-selected="true">Market</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#bs_limit" data-toggle="tab" role="tab" aria-selected="false">Limit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#bs_stoplimit" data-toggle="tab" role="tab" aria-selected="false">Stop Limit</a>
                            </li>
                        </ul>
                    </div>
                    <div className="buysellaction-head-col cominfo">
                        <h6>İşlem Komisyonu</h6>
                        <p>Piyasa Yapıcı 0.25% - Piyasa Alıcı 0.35%</p>
                        <IconSet
                            sprite="sprtsmclrd"
                            size="16"
                            name="info infoiconbox"
                            data-toggle="popover"
                            data-trigger="focus"
                            tabIndex="0"
                            data-container="body"
                            data-html="true"
                            data-placement="bottom"
                            data-content="<div class='tooltipbox'><div class='tooltipbox-head'><div class='tooltipbox-head-col'>VIP UCRET</div><div class='tooltipbox-head-col'>DESTEK 0850 255 1079</div></div><div class='tooltipbox-body'><div class='sitetablediv commissiontable'><div class='tbl-thead'><div class='tbl-tr'><div class='tbl-th aut txt'>TRY Hacim /<br />30 Gün</div><div class='tbl-th fxd mkr'>Piyasa Yapıcı Emirler<br/>[MAKER]</div><div class='tbl-th aut spc'></div><div class='tbl-th fxd tkr'>Piyasa Alıcı Emirler<br/>[TAKER]</div></div></div><div class='tbl-tbody tbl-brdrbtm'><div class='tbl-tr'><div class='tbl-td aut txt'>100.000</div><div class='tbl-td fxd mkr'>0.0025</div><div class='tbl-td aut spc'></div><div class='tbl-td fxd tkr'>0.0035</div></div><div class='tbl-tr'><div class='tbl-td aut txt'>1.000.000</div><div class='tbl-td fxd mkr'>0.0015</div><div class='tbl-td aut spc'></div><div class='tbl-td fxd tkr'>0.0030</div></div><div class='tbl-tr'><div class='tbl-td aut txt'>5.000.000</div><div class='tbl-td fxd mkr'>0.0010</div><div class='tbl-td aut spc'></div><div class='tbl-td fxd tkr'>0.0025</div></div></div></div></div></div>"
                        />
                    </div>
                </div>
                <div className="sitetabs tab-content">
                    <div id="bs_market" className="tab-pane fade show active" role="tabpanel">
                        <BuySellActionMarket />
                    </div>
                    <div id="bs_limit" className="tab-pane fade" role="tabpanel">B</div>
                    <div id="bs_stoplimit" className="tab-pane fade" role="tabpanel">C</div>
                </div>
            </div>
        </div>
    );
};

export default BuySellAction;