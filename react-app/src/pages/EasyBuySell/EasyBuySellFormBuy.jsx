import { useState,useEffect } from "react";
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

import { ReactComponent as TildeSmIcon } from "~/assets/images/icons/path_icon_tildesm.svg";
import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";
import { usePrices } from "~/state/hooks/";
import {useDispatch, useSelector} from "react-redux";
import {fetchBalance} from "~/state/slices/balance.slice";
import {fetchEasyBuy} from "~/state/slices/easybuy.slice";
import {AlertResult} from "~/components/AlertResult";

const EasyBuySellFormBuy = props => {
  const { t } = useTranslation(["form", "common", "finance"]);
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { fiatBalance } = useSelector(state => state.balance);
  const [apiError, setApiError] = useState(null);
  const { fiatCurrency, cryptoCurrency, selectedPrice, selectedPair } = usePrices();
  const { register, handleSubmit, errors, setValue, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      fiatAmount: "",
      cryptoAmount: "",

    },
  });
  const [currencyBalance, setCurrencyBalance] = useState(0);
  const [selectCurrency, setSelectCurrency] = useState(0);

  useEffect(() => {
    if (selectedPair) {
      reset();
      if(selectCurrency !== selectedPair.second_currency_id) {
        setCurrencyBalance(0)
      }
      setSelectCurrency(selectedPair?.second_currency_id)
      dispatch(fetchBalance({currencyid: selectedPair?.second_currency_id, isFiat: true, isPadding: true}));
     }
  }, [dispatch, selectedPair]);

  useEffect(() => {
    setCurrencyBalance(parseFloat(fiatBalance).toFixed(2))
  }, [dispatch, fiatBalance]);


  const onReset = event => {
    event.preventDefault();
    event.stopPropagation();
    setIsSubmitted(false);
    setIsConfirmed(false);
    reset();
  };


  const onSubmit = async data => {

    if (data?.fiatAmount > 0) {
      setIsSubmitted(true);
      setApiError("");
      const  firstcurrencyid  = selectedPair.first_currency_id;
      const  secondcurrencyid  = selectedPair.second_currency_id;
      const amount  = data.fiatAmount;
      const { payload } = await dispatch(fetchEasyBuy({ firstcurrencyid,secondcurrencyid,amount }));
      if (!payload?.status) {
        setApiError(payload?.errormessage);
      } else {
        await  dispatch(fetchBalance({currencyid: selectedPair?.second_currency_id, isFiat: true, isPadding: false}));
        setApiError("");
        setIsConfirmed(true);
      }
    }
  };

  return (
    <div className="easybuysell-cont">
      { 0 === 1 ? (
          <AlertResult error center>Hata Mesajı Buraya Gelecek...</AlertResult>
      ) : null}
      <Form
        className="siteformui"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row className="easybuysell-form-inputs">
          <FormGroup
            className={`col ${errors.fiatAmount && "inputresult resulterror"}`}
          >
            <div className="formflexlabel">
              <Label>{t("finance:amountToBeTaken")} - {fiatCurrency}</Label>
              <div className="labelassets">
                <p>
                  {t('finance:available')}: <span>{parseFloat(currencyBalance).toFixed(2)} {fiatCurrency}</span>
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
                    value: parseFloat(currencyBalance).toFixed(2),
                    message: t("shouldBeMax", { value: parseFloat(currencyBalance).toFixed(2) }),
                  },
                })}
                onChange={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  const { value } = e.target;

                  if (!Number.isNaN(value)) {
                    const parsed = parseFloat(value);
                    const price = selectedPrice?.price;
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
          <FormGroup className="col-auto">
            <div className="inputchangeicon">
              <IconSet sprite="sprtsmclrd" size="16" name="change" />
            </div>
          </FormGroup>
          <FormGroup
            className={`col ${
              errors.cryptoAmount && "inputresult resulterror"
            }`}
          >
            <div className="formflexlabel">
              <Label>{t("finance:amountToBeTaken")} - {cryptoCurrency}</Label>
              <div className="labelprice">
                <p>
                  {t('common:price')}: <TildeSmIcon className="tildesm" />{" "}
                  <span>{selectedPrice?.price} {fiatCurrency}</span>
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
                    const price = selectedPrice?.price;
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
        </Row>
        <div className="easybuysell-form-btns">
          <Button
            variant="success"
            className="w-50"
            type="submit"
            disabled={isSubmitted}
          >
            {t("finance:buywhat", { item: cryptoCurrency })}
          </Button>
        </div>
      </Form>
      {isSubmitted ? (
          isConfirmed ? (
                  <div className="easybuysell-confirm">
                    <div className="easybuysell-confirm-title">
                      <h4>İŞLEM ONAYI</h4>
                    </div>
                    <div className="easybuysell-confirm-result modal-maincont">
                      <div className="modal-content modal-sm text-center">
                        <div className="modal-body modal-confirm">
                          <IconSet sprite="sprtlgclrd" size="50clrd" name="check" />
                          <p>
                            {cryptoCurrency} alış işleminiz başarıyla tamamlanmıştır.
                          </p>
                          <p>
                            <a className="urllink" href="#">
                              <u>İşlem Geçmişi</u>
                            </a>{" "}
                            ya da{" "}
                            <a className="urllink" href="#">
                              <u>Varlıklar</u>
                            </a>{" "}
                            bölümünden kontrol edebilirsiniz.
                          </p>
                        </div>
                        <div className="modal-footer">
                          <Button variant="primary" className="w-100" onClick={onReset}>
                            YENİ İŞLEM
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
              ) :
              null
      ) : null}
    </div>
  );
};

export default EasyBuySellFormBuy;
