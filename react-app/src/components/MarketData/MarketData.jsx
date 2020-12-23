import MarketDataSymbol from "./MarketDataSymbol";
import MarketDataDetail from "./MarketDataDetail";
import MarketDataLast from "./MarketDataLast";
import MarketDataChart from "./MarketDataChart";

const MarketData = props => {
    return (
        <div className="mainbox mainbox-marketdata">
            <div className="marketdata">

                <ul className="marketdata-tabs sitetabs nav nav-tabs nav-justified" role="tablist">
                    <li className="nav-item"><a className="nav-link active" href="#md_symbol" data-toggle="tab" role="tab" aria-selected="true">Sembol</a></li>
                    <li className="nav-item"><a className="nav-link" href="#md_detail" data-toggle="tab" role="tab" aria-selected="false">Detay</a></li>
                    <li className="nav-item"><a className="nav-link" href="#md_last" data-toggle="tab" role="tab" aria-selected="false">Son İşlemler</a></li>
                    <li className="nav-item"><a className="nav-link" href="#md_chart" data-toggle="tab" role="tab" aria-selected="false">Grafik</a></li>
                </ul>

                <div className="marketdata-tabcontent sitetabs tab-content">
                    <div id="md_symbol" className="marketdata-tabsymbol tab-pane fade show active" role="tabpanel">
                        <MarketDataSymbol />
                    </div>
                    <div id="md_detail" className="marketdata-tabdetail tab-pane fade" role="tabpanel">
                        <MarketDataDetail />
                    </div>
                    <div id="md_last" className="marketdata-tablast tab-pane fade" role="tabpanel">
                        <MarketDataLast />
                    </div>
                    <div id="md_chart" className="marketdata-tabchart tab-pane fade" role="tabpanel">
                        <MarketDataChart />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MarketData;