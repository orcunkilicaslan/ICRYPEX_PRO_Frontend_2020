import { useEffect, useState } from "react";
import {
  Row,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as TildeSmIcon } from "~/assets/images/icons/path_icon_tildesm.svg";
import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";
import { usePrices, useLocaleUpperCase } from "~/state/hooks/";
import { fetchBalance } from "~/state/slices/balance.slice";
import { fetchEasySell } from "~/state/slices/easysell.slice";
import { AlertResult } from "~/components/AlertResult";

const EasyBuySellFormSell = props => {
  const { t } = useTranslation(["form", "common", "finance"]);
  const dispatch = useDispatch();
  const toUpperCase = useLocaleUpperCase();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { fiatCurrency, cryptoCurrency, selectedPrice, selectedPair } =
    usePrices();
  const { register, handleSubmit, errors, setValue, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      fiatAmount: "",
      cryptoAmount: "",
    },
  });
  const { cryptoBalance } = useSelector(state => state.balance);
  const [currencyBalance, setCurrencyBalance] = useState(0);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    setCurrencyBalance(0);
    if (selectedPair) {
      reset();
      dispatch(
        fetchBalance({
          currencyid: selectedPair?.first_currency_id,
          isFiat: false,
          isPadding: true,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedPair]);

  useEffect(() => {
    setCurrencyBalance(parseFloat(cryptoBalance).toFixed(8));
  }, [dispatch, cryptoBalance]);

  const onReset = event => {
    event.preventDefault();
    event.stopPropagation();
    setIsSubmitted(false);
    setIsConfirmed(false);
    reset();
  };

  const onSubmit = async data => {
    if (data?.cryptoAmount > 0) {
      setApiError("");
      setIsSubmitted(true);
      const firstcurrencyid = selectedPair.first_currency_id;
      const secondcurrencyid = selectedPair.second_currency_id;
      const buyingamount = data.fiatAmount;
      const sellingamount = data.cryptoAmount;
      const { payload } = await dispatch(
        fetchEasySell({
          firstcurrencyid,
          secondcurrencyid,
          buyingamount,
          sellingamount,
        })
      );
      if (!payload?.status) {
        setApiError(payload?.errormessage);
        setIsSubmitted(false);
        setIsConfirmed(false);
        reset();
      } else {
        setApiError("");
        await dispatch(
          fetchBalance({
            currencyid: selectedPair?.first_currency_id,
            isFiat: false,
            isPadding: false,
          })
        );
        setIsConfirmed(true);
      }
    }
  };

  return (
    <div className="easybuysell-cont">
      {apiError !== "" ? (
        <AlertResult error center>
          {apiError}
        </AlertResult>
      ) : null}
      <Form
        className="siteformui"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row className="easybuysell-form-inputs">
          <FormGroup
            className={`col ${
              errors.cryptoAmount && "inputresult resulterror"
            }`}
          >
            <div className="formflexlabel">
              <Label>
                {t("finance:amountToBeSold")} - {cryptoCurrency}
              </Label>
              <div className="labelassets">
                <p>
                  {t("finance:available")}:{" "}
                  <span>
                    {parseFloat(currencyBalance).toFixed(8)} {cryptoCurrency}
                  </span>
                </p>
              </div>
            </div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>{t("common:amount")}</InputGroupText>
              </InputGroupAddon>
              <Input
                type="number"
                name="cryptoAmount"
                readOnly={isSubmitted}
                innerRef={register({
                  valueAsNumber: true,
                  required: t("isRequired"),
                  min: { value: 0, message: t("shouldBeMin", { value: 0 }) },
                  max: {
                    value: parseFloat(currencyBalance).toFixed(8),
                    message: t("shouldBeMax", {
                      value: parseFloat(currencyBalance).toFixed(8),
                    }),
                  },
                })}
                onChange={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  const { value } = e.target;

                  if (!Number.isNaN(value)) {
                    const parsed = parseFloat(value);
                    const { price } = selectedPrice;
                    const fiatAmount = Number(price * parsed).toFixed(2);
                    setValue("fiatAmount", fiatAmount, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>{cryptoCurrency}</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {errors.cryptoAmount && (
              <FormText className="inputresult resulterror">
                {errors.cryptoAmount?.message}
              </FormText>
            )}
          </FormGroup>
          <FormGroup className="col-auto">
            <div className="inputchangeicon">
              <IconSet sprite="sprtsmclrd" size="16" name="change" />
            </div>
          </FormGroup>
          <FormGroup
            className={`col ${errors.fiatAmount && "inputresult resulterror"}`}
          >
            <div className="formflexlabel">
              <Label>
                {t("finance:amountToBeSold")} - {fiatCurrency}
              </Label>
              <div className="labelprice">
                <p>
                  {cryptoCurrency} {t("common:price")}:{" "}
                  <TildeSmIcon className="tildesm" />{" "}
                  <span>
                    {selectedPrice?.price} {fiatCurrency}
                  </span>
                </p>
              </div>
            </div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>{t("common:amount")}</InputGroupText>
              </InputGroupAddon>
              <Input
                type="number"
                name="fiatAmount"
                readOnly={isSubmitted}
                innerRef={register({
                  valueAsNumber: true,
                  required: t("isRequired"),
                  min: { value: 0, message: t("shouldBeMin", { value: 0 }) },
                  max: {
                    value: 999999,
                    message: t("shouldBeMax", { value: 999999 }),
                  },
                })}
                onChange={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  const { value } = e.target;

                  if (!Number.isNaN(value)) {
                    const parsed = parseFloat(value);
                    const { price } = selectedPrice;
                    const cryptoAmount = Number(parsed / price).toFixed(8);
                    setValue("cryptoAmount", cryptoAmount, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>{fiatCurrency}</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {errors.fiatAmount && (
              <FormText className="inputresult resulterror">
                {errors.fiatAmount?.message}
              </FormText>
            )}
          </FormGroup>
        </Row>
        <div className="easybuysell-form-btns">
          <Button
            variant="danger"
            className="w-50"
            type="submit"
            disabled={isSubmitted}
          >
            {t("finance:sellwhat", { item: cryptoCurrency })}
          </Button>
        </div>
      </Form>
      {isSubmitted ? (
        isConfirmed ? (
          <div className="easybuysell-confirm">
            <div className="easybuysell-confirm-title">
              <h4>{toUpperCase(t("finance:transactionConfirmation"))}</h4>
            </div>
            <div className="easybuysell-confirm-result modal-maincont">
              <div className="modal-content modal-sm text-center">
                <div className="modal-body modal-confirm">
                  <IconSet sprite="sprtlgclrd" size="50clrd" name="check" />
                  <p>{t("finance:sellSuccess", { item: cryptoCurrency })}</p>
                  <p>
                    {t("finance:checkNewTransaction", {
                      history: t("openorder:tradeHistory"),
                      assets: t("app:assets"),
                    })}
                  </p>
                </div>
                <div className="modal-footer">
                  <Button variant="primary" className="w-100" onClick={onReset}>
                    {toUpperCase(t("finance:newTransaction"))}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default EasyBuySellFormSell;
