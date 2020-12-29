import { ReactComponent as PerLineIcon } from "../../assets/images/icons/path_icon_pericon.svg";

const mddetailtable = [

    {
        label   : "Bid",
        change  : "-2.22%",
        mdper   : "up",
    },
    {
        label   : "Bid High",
        change  : "+1.38%",
        mdper   : "down",
    },
    {
        label   : "Bid Low",
        change  : "+2.24%",
        mdper   : "down",
    },
    {
        label   : "Ask",
        change  : "+3.57%",
        mdper   : "up",
    },
    {
        label   : "Ask High",
        change  : "-1.56%",
        mdper   : "down",
    },
    {
        label   : "Ask Low",
        change  : "-1.56%",
        mdper   : "down",
    },

];

const MarketDataDetail = props => {
    return (
        <div className="marketdata-detail">

            <div className="tabcont tabcont-head">
                <p>BTC/TRY - Bitcoin / Türk Lirası</p>
            </div>

            <div className="mddetailtable">
                <div className="sitetablediv">
                    <div className="tbl-tbody tbl-striped">

                        {mddetailtable.map(({ label, change, mdper }) => {
                            return (
                                <div className="tbl-tr" key={label}>
                                    <div className="tbl-td fxd txt">{label}</div>
                                    <div className="tbl-td fxd chg"><span className={ mdper === "up" ? "sitecolorgreen" : "sitecolorred" }>{change}</span></div>
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
    );
};

export default MarketDataDetail;