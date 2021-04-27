import { useState,useEffect } from "react";
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
  Progress, FormText,
} from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import { inRange } from "lodash";

import { IconSet } from "../IconSet.jsx";
import { Button } from "../Button.jsx";
import {fetchBalance} from "~/state/slices/balance.slice";
import {useForm} from "react-hook-form";
import {usePrices} from "~/state/hooks";
import { getFormattedPrice } from "~/util/";
import {fetchEasyBuy} from "~/state/slices/easybuy.slice";
import {fetchEasySell} from "~/state/slices/easysell.slice";
import {setOpenModal} from "~/state/slices/ui.slice";
import BuySellConfirmModal from "~/components/modals/BuySellConfirmModal.jsx";
import DepositWithdrawalTermsModal from "~/components/modals/DepositWithdrawalTermsModal";

const buySellRangePercent = [0, 25, 50, 75, 100];

const BuySellActionMarket = props => {

  const { t } = useTranslation(["form", "common", "finance"]);
  const { fiatCurrency, cryptoCurrency, selectedPrice, selectedPair } = usePrices();
  const [rangeBuyPortfolio, setRangeBuyPortfolio] = useState(buySellRangePercent[0]);
  const [rangeSellPortfolio, setRangeSellPortfolio] = useState(buySellRangePercent[0]);
  const { fiatBalance, cryptoBalance } = useSelector(state => state.balance);
  const { easySell } = useSelector(state => state.easySell);
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalBuy, setTotalBuy] = useState("0.00");
  const [totalSell, setTotalSell] = useState("0.00");
  const [apiError, setApiError] = useState("");

  const { register: registerBuy, handleSubmit: handleSubmitBuy, errors: errorsBuy, setValue: setValueBuy, reset: resetBuy } = useForm({
    mode: "onChange",
    defaultValues: {
      fiatBuyAmount: "",
      cryptoBuyAmount: "",
      fiatSellAmount: "",
      cryptoSellAmount: "",
    },
  });

  const { register :registerSell, handleSubmit: handleSubmitSell,errors: errorsSell, setValue: setValueSell, reset: resetSell } = useForm({
    mode: "onChange",
    defaultValues: {
      fiatBuyAmount: "",
      cryptoBuyAmount: "",
      fiatSellAmount: "",
      cryptoSellAmount: "",
    },
  });
  
  

  useEffect(() => {
    if (selectedPair) {
      console.log({selectedPair})
      resetBuy();
      resetSell();
      dispatch(fetchBalance({currencyid: selectedPair?.second_currency_id, isFiat: true,isPadding: true}));
     dispatch(fetchBalance({currencyid: selectedPair?.first_currency_id, isFiat: false, isPending: true}));}
  }, [dispatch, selectedPair]);


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
      const  firstcurrencyid  = selectedPair.first_currency_id;
      const  secondcurrencyid  = selectedPair.second_currency_id;
      const amount  = totalBuy;
      const { payload } = await dispatch(fetchEasyBuy({ firstcurrencyid,secondcurrencyid,amount }));

      if (!payload?.status) {
        setApiError(payload?.errormessage);
      } else {
        setApiError("");
        setIsSubmitted(true);
      }
    }
  };

  const onSellSubmit = async data => {

    if (data?.cryptoSellAmount > 0) {
      setApiError("");
      const  firstcurrencyid  = selectedPair.first_currency_id;
      const  secondcurrencyid  = selectedPair.second_currency_id;
      const sellingamount  = data.cryptoSellAmount;
      const buyingamount   = totalSell;
      const { payload } = await dispatch(fetchEasySell({ firstcurrencyid,secondcurrencyid,buyingamount,sellingamount }));
      if (!payload?.status) {
        setApiError(payload?.errormessage);
      } else {
        setApiError("");
        setIsSubmitted(true);
      }
    }
  };

  const { openModal } = useSelector(state => state.ui);

  const openConfirmModal = () => {
    dispatch(setOpenModal("buysellconfirm"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  return (
    <div className="buysellaction-market">
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
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("common:price")}</InputGroupText>
                  </InputGroupAddon>
                  <div className="form-control">
                    {t("finance:market")}
                  </div>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>{fiatCurrency}</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup className={`${errorsBuy.cryptoBuyAmount && "inputresult resulterror"}`}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("common:amount")}</InputGroupText>
                  </InputGroupAddon>
                  <Input  type="number"
                          name="cryptoBuyAmount"
                          readOnly={isSubmitted}
                          innerRef={registerBuy({
                            valueAsNumber: true,
                            required: t("isRequired"),
                            min: { value: 0, message: t("shouldBeMin", { value: 0 }) },
                            max: {
                              value:  Number(fiatBalance / selectedPrice?.price ).toFixed(2),
                              message: t("shouldBeMax", { value: Number(fiatBalance / selectedPrice?.price ).toFixed(2) }),
                            },
                          })}
                          onChange={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            const { value } = e.target;

                            if (!Number.isNaN(value) && value !== "") {
                              const parsed = parseFloat(value);
                              const price = selectedPrice?.price;
                              setTotalBuy(Number(price * parsed).toFixed(2))
                              setRangeBuyPortfolio(Number( (parsed * 100) / fiatBalance) .toFixed(0));
                            }else {  setTotalBuy(Number(0).toFixed(8))}
                          }}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>{cryptoCurrency}</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {errorsBuy.cryptoBuyAmount && (
                    <FormText className="inputresult resulterror">
                      {errorsBuy.cryptoBuyAmount?.message}
                    </FormText>
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
                          setValueBuy("cryptoBuyAmount",  Number(((fiatBalance / selectedPrice?.price)/100) * target.value ).toFixed(8), { shouldValidate: true });
                          setRangeBuyPortfolio(target.value);

                          setTotalBuy(Number((fiatBalance / 100) * target.value).toFixed(2))
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
              <Button
                  variant="success"
                  type="submit"
                  disabled={isSubmitted}
                  onClick={openConfirmModal}
              >
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
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("common:price")}</InputGroupText>
                  </InputGroupAddon>
                  <div className="form-control">
                    {t("finance:market")}
                  </div>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>{fiatCurrency}</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup className={`${errorsSell.cryptoSellAmount && "inputresult resulterror"}`}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("common:amount")}</InputGroupText>
                  </InputGroupAddon>
                  <Input  type="number"
                          name="cryptoSellAmount"
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
                              const price = selectedPrice?.price;
                              setTotalSell(Number(price * parsed).toFixed(2))
                              setRangeSellPortfolio(Number( (parsed * 100) / cryptoBalance) .toFixed(0));
                            }else {  setTotalSell(Number(0).toFixed(2))}
                          }}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>{cryptoCurrency}</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {errorsSell.cryptoSellAmount && (
                    <FormText className="inputresult resulterror">
                      {errorsSell.cryptoSellAmount?.message}
                    </FormText>
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
                          setValueSell("cryptoSellAmount",  Number((cryptoBalance / 100) * target.value ).toFixed(8), { shouldValidate: true });
                          setTotalSell(Number(((cryptoBalance / 100) * target.value) * selectedPrice?.price ).toFixed(2))
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
                      disabled={isSubmitted} >
                {t("finance:sellwhat", { item: cryptoCurrency })}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <BuySellConfirmModal
          isOpen={openModal === "buysellconfirm"}
          isSuccess={true}
          clearModals={clearOpenModals}
      />
    </div>
  );
};

export default BuySellActionMarket;
