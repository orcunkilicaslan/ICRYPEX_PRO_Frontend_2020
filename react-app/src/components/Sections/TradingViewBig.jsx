import { useSelector } from "react-redux";
import TradingViewWidget from "react-tradingview-widget";

const TradingViewBig = props => {

    const { lang: currentLanguage } = useSelector(state => state.ui);
    const { selected: currentPair } = useSelector(state => state.pair);

    return (
        <div className="mainbox mainbox-tradingviewbig">
            <div className="tradingviewbig">
                <div className="tradingview-widget-container">
                    <TradingViewWidget
                        symbol={currentPair?.symbol === "LINKUSD" ? "KRAKEN:LINKUSD" : currentPair.symbol}
                        theme={"Dark"}
                        locale={currentLanguage?.toUpperCase?.x()}
                        timezone={"Europe/Istanbul"}
                        interval={"3"}
                        style={"1"}
                        toolbar_bg={"#f1f3f6"}
                        enable_publishing={false}
                        hide_legend={true}
                        hide_side_toolbar={false}
                        hide_top_toolbar={false}
                        allow_symbol_change={true}
                        withdateranges={true}
                        save_image={false}
                        autosize
                    />
                </div>
            </div>
        </div>
    );
};

export default TradingViewBig;
