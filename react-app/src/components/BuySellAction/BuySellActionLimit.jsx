import React, {useState, useEffect, useRef} from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Progress, FormText, Tooltip,
} from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import { inRange } from "lodash";

import { IconSet } from "../IconSet.jsx";
import { Button } from "../Button.jsx";
import {useForm} from "react-hook-form";
import {fetchBalance} from "~/state/slices/balance.slice";
import {usePrices} from "~/state/hooks";
import {fetchEasyBuy} from "~/state/slices/easybuy.slice";
import {fetchEasySell} from "~/state/slices/easysell.slice";
import {getFormattedPrice} from "~/util";
import {setOpenModal} from "~/state/slices/ui.slice";
import {fetchLimitBuyOrder} from "~/state/slices/limitbuyorder.slice";
import {fetchLimitSellOrder} from "~/state/slices/limitsellorder.slice";
import {TooltipResult} from "~/components/TooltipResult";

const buySellRangePercent = [0, 25, 50, 75, 100];

const BuySellActionLimit = props => {

  // const targetRef = useRef()
  const { t } = useTranslation(["form","common", "finance"]);
  const dispatch = useDispatch();
  const { fiatCurrency, cryptoCurrency, selectedPrice, selectedPair } = usePrices();
  const [rangeBuyPortfolio, setRangeBuyPortfolio] = useState(buySellRangePercent[0]);
  const [rangeSellPortfolio, setRangeSellPortfolio] = useState(buySellRangePercent[0]);
  const { fiatBalance, cryptoBalance } = useSelector(state => state.balance);
  const { selectedBuyOrder,selectedSellOrder } = useSelector(state => state.order);
  const [totalBuy, setTotalBuy] = useState("0.00");
  const [fiatBuyPrice, setFiatBuyPrice] = useState("");
  const [totalSell, setTotalSell] = useState("0.00");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");


  const { register: registerBuy, handleSubmit: handleSubmitBuy, errors: errorsBuy, setValue: setValueBuy,
    reset: resetBuy, getValues: getBuyValues } = useForm({
    mode: "onChange",
    defaultValues: {
      fiatBuyPrice: "",
      cryptoBuyAmount: "",
    },
  });
  const { register :registerSell, handleSubmit: handleSubmitSell,errors: errorsSell,
    setValue: setValueSell, reset: resetSell , getValues : getSellValues  } = useForm({
    mode: "onChange",
    defaultValues: {
      fiatSellPrice: "",
      cryptoSellAmount: "",
    },
  });

  useEffect(() => {
    if (selectedPair) {
      setValueBuy("fiatBuyPrice", selectedPrice.price, { shouldValidate: true });
      setValueBuy("cryptoBuyAmount", "");
      setValueSell("fiatSellPrice", selectedPrice.price, { shouldValidate: true });
      setValueSell("cryptoSellAmount", "");
      setTotalBuy("")
      setTotalSell("")
      setRangeSellPortfolio(buySellRangePercent[0])
      setRangeBuyPortfolio(buySellRangePercent[0])
      dispatch(fetchBalance({currencyid: selectedPair?.second_currency_id, isFiat: true,isPadding: true}));
      dispatch(fetchBalance({currencyid: selectedPair?.first_currency_id, isFiat: false,isPadding: true}));}
  }, [dispatch, selectedPair]);

  useEffect(()=> {
    if(selectedBuyOrder.minprice) {
      setValueBuy("fiatBuyPrice", selectedBuyOrder.minprice, { shouldValidate: false });
      setValueSell("fiatSellPrice", selectedBuyOrder.minprice, { shouldValidate: false });

      setValueSell("cryptoSellAmount", selectedBuyOrder.sumAmount);
      setTotalSell(selectedBuyOrder.sumAmount * selectedBuyOrder.minprice)
      if(cryptoBalance) {
        setRangeSellPortfolio(Number( (selectedBuyOrder.sumAmount * 100) / cryptoBalance) .toFixed(0));
      }else {setRangeSellPortfolio(100)}
    }
  },[dispatch, selectedBuyOrder])

  useEffect(()=> {
    if(selectedSellOrder.minprice) {
      setValueSell("fiatSellPrice", selectedSellOrder.minprice, { shouldValidate: false });
      setValueBuy("fiatBuyPrice", selectedSellOrder.minprice, { shouldValidate: false });

      setValueBuy("cryptoBuyAmount", selectedSellOrder.sumAmount);
      setTotalBuy(selectedSellOrder.sumAmount * selectedSellOrder.minprice)
      if(fiatBalance > 0 ) {
        setRangeBuyPortfolio(Number( (selectedSellOrder.sumAmount * 100) / fiatBalance) .toFixed(0));
      }else {setRangeBuyPortfolio(100)}
    }
  },[dispatch, selectedSellOrder])

  const buyRangeCircleCls = classnames({
    percstepa00: inRange(rangeBuyPortfolio, 0, 25),
    percstepa25: inRange(rangeBuyPortfolio, 25, 50),
    percstepa50: inRange(rangeBuyPortfolio, 50, 75),
    percstepa75: inRange(rangeBuyPortfolio, 75, 100),
    percstepa100: inRange(rangeBuyPortfolio, 100, 101),
  });

  const sellRangeCircleCls = classnames({
    percstepa00: inRange(rangeSellPortfolio, 0, 25),
    percstepa25: inRange(rangeSellPortfolio, 25, 50),
    percstepa50: inRange(rangeSellPortfolio, 50, 75),
    percstepa75: inRange(rangeSellPortfolio, 75, 100),
    percstepa100: inRange(rangeSellPortfolio, 100, 101),
  });
  const onBuySubmit = async data => {
    if (data?.cryptoBuyAmount > 0) {
      setApiError("");
      setIsSubmitted(true);
      const  firstcurrencyid  = selectedPair.first_currency_id;
      const  secondcurrencyid  = selectedPair.second_currency_id;
      const amount  = data.cryptoBuyAmount;
      const price  = data.fiatBuyPrice;
      const { payload } = await dispatch(fetchLimitBuyOrder({ firstcurrencyid,secondcurrencyid,amount,price }));

      if (payload?.status !== 1) {
        setApiError(payload?.errormessage);
        setIsSubmitted(false);
      } else {
        setApiError("");
        setValueBuy("fiatBuyPrice", selectedPrice.price, { shouldValidate: true });
        setValueBuy("cryptoBuyAmount", "");
        setValueSell("fiatSellPrice", selectedPrice.price, { shouldValidate: true });
        setValueSell("cryptoSellAmount", "");
        setTotalBuy("")
        setTotalSell("")
        setRangeSellPortfolio(buySellRangePercent[0])
        setRangeBuyPortfolio(buySellRangePercent[0])
        setIsSubmitted(false);
        await  dispatch(fetchBalance({currencyid: selectedPair?.second_currency_id, isFiat: true, isPadding: false}));
        dispatch(setOpenModal("buysellconfirm"));
      }
    }

  };

  const onSellSubmit = async data => {
    if (data?.cryptoSellAmount > 0) {
      setApiError("");
      setIsSubmitted(true);
      const  firstcurrencyid  = selectedPair.first_currency_id;
      const  secondcurrencyid  = selectedPair.second_currency_id;

      const amount  = data.cryptoSellAmount;
      const price  = data.fiatSellPrice;
      const { payload } = await dispatch(fetchLimitSellOrder({ firstcurrencyid,secondcurrencyid,amount, price }));
      if (payload?.status !== 1) {
        setApiError(payload?.errormessage);
        setIsSubmitted(false);
      } else {
        setApiError("");
        setValueBuy("fiatBuyPrice", selectedPrice.price, { shouldValidate: true });
        setValueBuy("cryptoBuyAmount", "");
        setValueSell("fiatSellPrice", selectedPrice.price, { shouldValidate: true });
        setValueSell("cryptoSellAmount", "");
        setTotalBuy("")
        setTotalSell("")
        setRangeSellPortfolio(buySellRangePercent[0])
        setRangeBuyPortfolio(buySellRangePercent[0])
        setIsSubmitted(false);
        await  dispatch(fetchBalance({currencyid: selectedPair?.first_currency_id, isFiat: false, isPadding: false}));
        dispatch(setOpenModal("buysellconfirm"));
      }
    }
  };

  return (
    <div className="buysellaction-limit buyselllimittooltip">
      <Row className="buysellaction-formarea">
        <Col className="buycol">
          <Form
            className="buysellaction-form siteformui"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmitBuy(onBuySubmit)}
          >
            <div className="formhead">
              <h4 className="formhead-title">
                {t("finance:buywhat", { item: cryptoCurrency })}
              </h4>
              <div className="formhead-curr">
                <IconSet sprite="sprtsmclrd" size="16" name="wallet" />
                <p>{ getFormattedPrice(fiatBalance, 2)} {fiatCurrency}</p>
              </div>
            </div>
            <div className="formfieldset">
              <FormGroup className={`${errorsBuy.fiatBuyPrice && "inputresult resulterror"}`}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("common:price")}</InputGroupText>
                  </InputGroupAddon>
                  <Input
                      type="text"
                      name="fiatBuyPrice"
                      id="fiatBuyLimitPrice"
                      readOnly={isSubmitted}
                      innerRef={registerBuy({
                        valueAsNumber: true,
                        required: t("isRequired"),
                        min: { value: 0, message: t("shouldBeMin", { value: 0 }) },
                      })}
                      onChange={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const { value } = e.target;

                        if (!Number.isNaN(value) && value !== "") {
                          const parsed = parseFloat(value);
                          setFiatBuyPrice(parsed)}
                      }}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>{fiatCurrency}</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {errorsBuy.fiatBuyPrice && (
                    <TooltipResult error isOpen={errorsBuy.fiatBuyPrice} target="fiatBuyLimitPrice" container=".buyselllimittooltip">
                      {errorsBuy.fiatBuyPrice?.message}
                    </TooltipResult>
                )}
              </FormGroup>
              <FormGroup className={`${errorsBuy.cryptoBuyAmount && "inputresult resulterror"}`}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("common:amount")}</InputGroupText>
                  </InputGroupAddon>
                  <Input
                      type="number"
                      name="cryptoBuyAmount"
                      id="cryptoBuyLimitAmount"
                      readOnly={isSubmitted}
                      innerRef={registerBuy({
                        valueAsNumber: true,
                        required: t("isRequired"),
                        min: { value: 0, message: t("shouldBeMin", { value: 0 }) },
                        max: {
                          value:  Number(fiatBalance / fiatBuyPrice ).toFixed(8),
                          message: t("shouldBeMax", { value: Number(fiatBalance / fiatBuyPrice ).toFixed(8) }),
                        },
                      })}
                      onChange={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const { value } = e.target;
                        if (!Number.isNaN(value) && value !== "") {
                          const parsed = parseFloat(value);
                          const fiatBuyPrice = getBuyValues("fiatBuyPrice")
                          if(!Number.isNaN(fiatBuyPrice) && fiatBuyPrice !== "") {
                            setTotalBuy(Number(fiatBuyPrice * parsed).toFixed(2))
                            setRangeBuyPortfolio(Number( (parsed * 100) / fiatBalance) .toFixed(0));
                          }
                        }else {  setTotalBuy(Number(0).toFixed(8))}
                      }} />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>{cryptoCurrency}</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {errorsBuy.cryptoBuyAmount && (
                    <TooltipResult error isOpen={errorsBuy.cryptoBuyAmount} target="cryptoBuyLimitAmount" container=".buyselllimittooltip">
                      {errorsBuy.cryptoBuyAmount?.message}
                    </TooltipResult>
                )}
              </FormGroup>
            </div>
            <div className="formrange">
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>{t("finance:portfolio")}</Label>
                </Col>
                <Col>
                  <div className="rangeprogress">
                    <Progress
                      className="rangeprogress-progress"
                      value={rangeBuyPortfolio}
                    />
                    <div
                        className={`rangeprogress-circle ${buyRangeCircleCls}`}
                        data-val={rangeBuyPortfolio}
                    >
                      {buySellRangePercent.map((el, idx) => {
                        return <span key={`${el}_${idx}`} className={`val-${el}`}></span>;
                      })}
                    </div>
                    <output
                        className="rangeprogress-bubble"
                        style={{left: `calc(${rangeBuyPortfolio}% + (${8 - rangeBuyPortfolio * 0.15}px))`}}
                    >
                      {rangeBuyPortfolio}%
                    </output>
                    <Input
                        className="rangeprogress-range custom-range"
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={rangeBuyPortfolio}
                        onChange={({ target }) => {
                          const fiatBuyPrice = getBuyValues("fiatBuyPrice")
                          if(!Number.isNaN(fiatBuyPrice) && fiatBuyPrice !== "") {
                            setValueBuy("cryptoBuyAmount",  Number(((fiatBalance / fiatBuyPrice)/100) * target.value ).toFixed(8), { shouldValidate: true });
                            setTotalBuy(Number((fiatBalance / 100) * target.value).toFixed(2))

                          }
                          setRangeBuyPortfolio(target.value);
                        }}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>{t("common:total")}</Label>
                </Col>
                <Col className="text-right">
                  <span>{totalBuy} {fiatCurrency}</span>
                </Col>
              </Row>
            </div>
            <div className="formbttm">
              <Button variant="success"
                      type="submit"
                      disabled={isSubmitted}>
                {t("finance:buywhat", { item: cryptoCurrency })}
              </Button>
            </div>
          </Form>
        </Col>
        <Col className="sellcol">
          <Form
            className="buysellaction-form siteformui"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmitSell(onSellSubmit)}

          >
            <div className="formhead">
              <h4 className="formhead-title">
                {t("finance:sellwhat", { item: cryptoCurrency })}
              </h4>
              <div className="formhead-curr">
                <IconSet sprite="sprtsmclrd" size="16" name="wallet" />
                <p>{getFormattedPrice(cryptoBalance, 8)} {cryptoCurrency}</p>
              </div>
            </div>
            <div className="formfieldset">
              <FormGroup className={`${errorsSell.fiatSellPrice && "inputresult resulterror"}`}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("common:price")}</InputGroupText>
                  </InputGroupAddon>
                  <Input
                      type="text"
                      name="fiatSellPrice"
                      id="fiatSellLimitPrice"
                      readOnly={isSubmitted}
                      innerRef={registerSell({
                        valueAsNumber: true,
                        required: t("isRequired"),
                        min: { value: 0, message: t("shouldBeMin", { value: 0 }) },
                      })}
                      onChange={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const { value } = e.target;

                        if (!Number.isNaN(value) && value !== "") {
                          const parsed = parseFloat(value);
                          const cryptoSellAmount = getSellValues("cryptoSellAmount")
                          if (!Number.isNaN(cryptoSellAmount) && cryptoSellAmount !== "") {
                            setTotalSell(Number(cryptoSellAmount * parsed).toFixed(2))
                          }
                        }else { setTotalSell("")}
                      }}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>{fiatCurrency}</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {errorsSell.fiatSellPrice && (
                    <TooltipResult error isOpen={errorsSell.fiatSellPrice} target="fiatSellLimitPrice" container=".buyselllimittooltip">
                      {errorsSell.fiatSellPrice?.message}
                    </TooltipResult>
                )}
              </FormGroup>
              <FormGroup className={`${errorsSell.cryptoSellAmount && "inputresult resulterror"}`}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("common:amount")}</InputGroupText>
                  </InputGroupAddon>
                  <Input
                      type="number"
                      name="cryptoSellAmount"
                      id="cryptoSellLimitAmount"
                      readOnly={isSubmitted}
                      innerRef={registerSell({
                        valueAsNumber: true,
                        required: t("isRequired"),
                        min: { value: 0, message: t("shouldBeMin", { value: 0 }) },
                        max: {
                          value:  Number(cryptoBalance).toFixed(8),
                          message: t("shouldBeMax", { value: Number(cryptoBalance ).toFixed(8) }),
                        },
                      })}
                      onChange={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const { value } = e.target;

                        if (!Number.isNaN(value) && value !== "") {
                          const parsed = parseFloat(value);
                          const fiatSellPrice  = getSellValues("fiatSellPrice")
                          setTotalSell(Number(fiatSellPrice * parsed).toFixed(2))
                          setRangeSellPortfolio(Number( (parsed * 100) / cryptoBalance) .toFixed(0));
                        }else {  setTotalSell(Number(0).toFixed(2))}
                      }}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>{cryptoCurrency}</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {errorsSell.cryptoSellAmount && (
                    <TooltipResult error isOpen={errorsSell.cryptoSellAmount} target="cryptoSellLimitAmount" container=".buyselllimittooltip">
                      {errorsSell.cryptoSellAmount?.message}
                    </TooltipResult>
                )}
              </FormGroup>
            </div>
            <div className="formrange">
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>{t("finance:portfolio")}</Label>
                </Col>
                <Col>
                  <div className="rangeprogress">
                    <Progress
                      className="rangeprogress-progress"
                      value={rangeSellPortfolio}
                    />
                    <div
                        className={`rangeprogress-circle ${sellRangeCircleCls}`}
                        data-val={rangeSellPortfolio}
                    >
                      {buySellRangePercent.map((el, idx) => {
                        return <span key={`${el}_${idx}`} className={`val-${el}`}></span>;
                      })}
                    </div>
                    <output
                        className="rangeprogress-bubble"
                        style={{left: `calc(${rangeSellPortfolio}% + (${8 - rangeSellPortfolio * 0.15}px))`}}
                    >
                      {rangeSellPortfolio}%
                    </output>
                    <Input
                        className="rangeprogress-range custom-range"
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={rangeSellPortfolio}
                        onChange={({ target }) => {
                          const fiatSellPrice  = getSellValues("fiatSellPrice")
                          if (!Number.isNaN(fiatSellPrice) && fiatSellPrice !== "") {
                            setValueSell("cryptoSellAmount",  Number((cryptoBalance / 100) * target.value ).toFixed(8), { shouldValidate: true });
                            setTotalSell(Number(((cryptoBalance / 100) * target.value) * parseFloat(fiatSellPrice)).toFixed(2))
                          }
                          setRangeSellPortfolio(target.value);
                        }}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>{t("common:total")}</Label>
                </Col>
                <Col className="text-right">
                  <span>{totalSell} {fiatCurrency}</span>
                </Col>
              </Row>
            </div>
            <div className="formbttm">
              <Button variant="danger"
                      type="submit"
                      disabled={isSubmitted}>
                {t("finance:sellwhat", { item: cryptoCurrency })}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default BuySellActionLimit;
