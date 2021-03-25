import { useState, useMemo, useContext, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup,
  Label,
  FormText,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet";
import { useCurrencies } from "~/state/hooks/";
import { withDrawCrypto } from "~/state/slices/withdraw.slice";
import { setOpenModal } from "~/state/slices/ui.slice";
import DepositWithdrawalTermsModal from "~/components/modals/DepositWithdrawalTermsModal.jsx";
import { openOrderContext } from "./OpenOrder";

const FEE_RATE = 15;

const OpenOrderDepoWithTabWithdrawCrypto = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form"]);
  const { isWithdrawingCrypto } = useSelector(state => state.withdraw);
  const { groupedCryptoAddresses = {} } = useSelector(state => state.assets);
  const [apiError, setApiError] = useState("");
  const { cryptoCurrencies = [], tokenCurrencies = [] } = useCurrencies();
  const {
    register,
    handleSubmit,
    errors,
    watch,
    clearErrors,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      symbol: cryptoCurrencies[0]?.symbol,
      amount: "",
      address: "",
      destinationtag: "",
      read: false,
    },
  });

  const [visibleCurrencies, visibleSymbols] = useMemo(() => {
    const currencies = cryptoCurrencies.concat(tokenCurrencies);
    const symbols = currencies.map(({ symbol }) => symbol);

    return [currencies, symbols];
  }, [cryptoCurrencies, tokenCurrencies]);

  const { symbol: watchedSymbol } = watch();
  const { state: orderContext } = useContext(openOrderContext);

  const selectedAddress = useMemo(
    () => groupedCryptoAddresses?.[watchedSymbol]?.[0],
    [watchedSymbol, groupedCryptoAddresses]
  );

  useEffect(() => {
    const { symbol, mode } = orderContext;

    if (mode === "withdraw" && symbol && visibleSymbols.includes(symbol)) {
      setValue("symbol", symbol);
    }
  }, [orderContext, setValue, visibleSymbols]);

  const getTotal = value => {
    const amount = parseFloat(value);
    const total = amount - FEE_RATE;

    if (Number.isNaN(amount) || amount <= 0) return null;

    return total < 0 ? null : total?.toFixed(2);
  };

  const onSubmit = async data => {
    const { symbol: _symbol, amount, read, address, destinationtag } = data;
    const currencyid = visibleCurrencies.find(
      ({ symbol }) => symbol === _symbol
    )?.id;
    const total = getTotal(amount);

    if (total > 0) {
      setApiError("");
      const { payload } = await dispatch(
        withDrawCrypto({
          currencyid,
          address,
          destinationtag,
          amount,
          read: JSON.stringify(read),
        })
      );

      if (!payload?.status) {
        setApiError(payload?.errormessage);
      } else {
        clearErrors();
        setApiError("");
      }
    }
  };

  const { openModal } = useSelector(state => state.ui);

  const openTermsModal = () => {
    dispatch(setOpenModal("depositwithdrawalterms"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  return (
    <div className="dandwtab-crypto">
      <div className="dandwtab-form">
        <Form
          className="withdrawcryptoform siteformui"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="formfieldset">
            <Row form>
              <FormGroup className="col-auto">
                <Input
                  className="custom-select"
                  type="select"
                  name="symbol"
                  innerRef={register()}
                >
                  {visibleCurrencies.map(({ symbol }) => {
                    return <option key={symbol}>{symbol}</option>;
                  })}
                </Input>
              </FormGroup>
              <InputGroup className="form-group col">
                <Input
                  type="number"
                  name="amount"
                  placeholder={t("withdrawAmount")}
                  innerRef={register({
                    valueAsNumber: true,
                    required: t("isRequired"),
                    min: { value: 0, message: t("shouldBeMin", { value: 0 }) },
                    max: {
                      value: 999999,
                      message: t("shouldBeMax", { value: 999999 }),
                    },
                  })}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>{watchedSymbol}</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.amount && (
                <FormText className="inputresult resulterror">
                  {errors.amount?.message}
                </FormText>
              )}
            </Row>
            <InputGroup className="form-group">
              <Input
                type="text"
                readOnly
                value={selectedAddress?.address || ""}
                className="form-control"
                name="address"
                innerRef={register({
                  required: t("isRequired"),
                  maxLength: {
                    value: 100,
                    message: t("shouldBeMaxLength", { value: 100 }),
                  },
                })}
              />
              <InputGroupAddon addonType="append">
                <Button variant="secondary" className="active">
                  <IconSet sprite="sprtsmclrd" size="16" name="addbtn" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            {errors.address && (
              <FormText className="inputresult resulterror">
                {errors.address?.message}
              </FormText>
            )}
            <InputGroup className="form-group">
              <Input
                readOnly
                value={selectedAddress?.destination_tag || ""}
                className="form-control d-none"
                name="destinationtag"
                innerRef={register({
                  valueAsNumber: true,
                  maxLength: {
                    value: 10,
                    message: t("shouldBeMaxLength", { value: 10 }),
                  },
                })}
              />
            </InputGroup>
            <Row form className="form-group">
              <Col>Transfer Ücreti</Col>
              <Col xs="auto">{FEE_RATE} TRY</Col>
            </Row>
            <Row form className="form-group">
              <Col>Hesaba Geçecek Miktar</Col>
              <Col xs="auto">{getTotal(watch("amount"))} TRY</Col>
            </Row>
          </div>
          <div className="confirmcheckbox">
            {errors.read && (
              <FormText className="inputresult resulterror">
                {errors.read?.message}
              </FormText>
            )}
            <div className="custom-control custom-checkbox">
              <Input
                className="custom-control-input"
                id="withdrawCryptoTabIhaveRead"
                type="checkbox"
                name="read"
                innerRef={register({ required: t("form:isRequired") })}
              />
              <Label
                className="custom-control-label"
                htmlFor="withdrawCryptoTabIhaveRead"
              >
                <Button onClick={openTermsModal}>Kural ve Şartları</Button>{" "}
                okudum onaylıyorum.
              </Label>
            </div>
          </div>
          <div className="formbttm">
            {apiError && (
              <span style={{ color: "red", fontSize: "1rem" }}>{apiError}</span>
            )}
            <Button
              type="submit"
              disabled={isWithdrawingCrypto}
              variant="secondary"
              className="active"
            >
              ONAY E-POSTA GÖNDER
            </Button>
          </div>
        </Form>
        <DepositWithdrawalTermsModal
          isOpen={openModal === "depositwithdrawalterms"}
          clearModals={clearOpenModals}
        />
      </div>
    </div>
  );
};

export default OpenOrderDepoWithTabWithdrawCrypto;
