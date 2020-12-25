import { IconSet } from "../IconSet.jsx";
import { Button } from "../Button.jsx";

const BuySellActionMarket = props => {
    return (
        <div className="buysellaction-market">
            <div className="buysellaction-formarea row">
                <div className="col buycol">
                    <form className="buysellaction-form siteformui" autoComplete="off" noValidate>
                        <div className="formhead">
                            <h4 className="formhead-title">BTC AL</h4>
                            <div className="formhead-curr">
                                <IconSet
                                    sprite="sprtsmclrd"
                                    size="16"
                                    name="wallet"
                                />
                                <p>49,950,000.00 TRY</p>
                            </div>
                        </div>
                        <div className="formbttm">
                            <Button
                                type="button"
                                size=""
                                variant="success"
                                data-toggle="modal"
                                data-target="#buysellModalConfirm"
                            >
                                BTC AL
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="col sellcol">
                    <form className="buysellaction-form siteformui" autoComplete="off" noValidate>
                        <div className="formhead">
                            <h4 className="formhead-title">BTC SAT</h4>
                            <div className="formhead-curr">
                                <IconSet
                                    sprite="sprtsmclrd"
                                    size="16"
                                    name="wallet"
                                />
                                <p>49,950,000.00 TRY</p>
                            </div>
                        </div>
                        <div className="formbttm">
                            <Button
                                type="button"
                                size=""
                                variant="danger"
                                data-toggle="modal"
                                data-target="#buysellModalConfirm"
                            >
                                BTC SAT
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BuySellActionMarket;