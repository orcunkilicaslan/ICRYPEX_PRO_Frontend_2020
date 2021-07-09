import { useState, useMemo, useContext, useEffect, Fragment } from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  FormGroup,
  Label,
  FormText,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import NumberFormat from "react-number-format";

import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet";
import { useCurrencies, useLocaleFormat } from "~/state/hooks/";
import { withDrawCrypto, addSeenSymbol } from "~/state/slices/withdraw.slice";
import { setOpenModal } from "~/state/slices/ui.slice";
import DepositWithdrawalTermsModal from "~/components/modals/DepositWithdrawalTermsModal.jsx";
import AddCryptoAddressModal from "~/components/modals/AddCryptoAddressModal";
import { openOrderContext } from "./OpenOrder";
import { getWhitelists } from "~/state/slices/cryptoaddreswhitelist.slice";
import { AlertResult } from "~/components/AlertResult.jsx";
import NumberInput from "~/components/NumberInput.jsx";

const OpenOrderDepoWithTabWithdrawCrypto = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "common", "login", "finance"]);
  const { isWithdrawingCrypto, seenSymbols } = useSelector(
    state => state.withdraw
  );
  const { info } = useSelector(state => state.user);
  const { groupedWhitelists = {} } = useSelector(
    state => state.cryptoAddressWhitelist
  );
  const { groupedCryptoAddresses = {} } = useSelector(state => state.assets);
  const [apiError, setApiError] = useState("");
  const {
    cryptoCurrencies = [],
    tokenCurrencies = [],
    findCurrencyBySymbol,
  } = useCurrencies();
  const [total, setTotal] = useState("");
  const { allAssets } = useSelector(state => state.assets);
  const cryptoFees = useSelector(state => state.api.settings?.cryptoFees);
  const { openModal } = useSelector(state => state.ui);
  const { state: orderContext } = useContext(openOrderContext);
  const [apiSuccess, setApiSuccess] = useState("");
  const localeFormat = useLocaleFormat();

  const {
    register,
    handleSubmit,
    errors,
    watch,
    clearErrors,
    setValue,
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      symbol: cryptoCurrencies?.[0]?.symbol,
      amount: "",
      address: "",
      destinationtag: "",
    },
  });

  const [visibleCurrencies, visibleSymbols] = useMemo(() => {
    const currencies = cryptoCurrencies.concat(tokenCurrencies);
    const symbols = currencies.map(({ symbol }) => symbol);

    return [currencies, symbols];
  }, [cryptoCurrencies, tokenCurrencies]);

  const [read, setRead] = useState({ click: false, show: false });
  const btnClass = classnames({
    disabled: read.click === false,
    "w-100": true,
  });
  const { symbol: watchedSymbol, address: watchedAddress } = watch();

  const { selectedWhitelists, selectedWhitelist } = useMemo(() => {
    const selectedWhitelists = groupedWhitelists?.[watchedSymbol];
    const selectedWhitelist = selectedWhitelists?.find(
      ({ address }) => watchedAddress === address
    );

    return { selectedWhitelists, selectedWhitelist };
  }, [groupedWhitelists, watchedSymbol, watchedAddress]);

  const {
    balance: selectedBalance,
    selectedCryptoAddress,
    selectedCryptoFree,
    selectedCurrency,
  } = useMemo(() => {
    setValue("amount", "", { shouldValidate: false });
    setTotal("");
    const selectedCryptoAddress = groupedCryptoAddresses?.[watchedSymbol]?.[0];
    const balance = allAssets?.balances?.find?.(
      ({ currency_id }) => currency_id === selectedCryptoAddress?.currency_id
    );
    const selectedCryptoFree = cryptoFees?.filter(
      c =>
        c.id ===
          visibleCurrencies.find(({ symbol }) => symbol === watchedSymbol)
            ?.id && c.customerGroupId === info.customergroupid
    );
    const selectedCurrency = findCurrencyBySymbol(watchedSymbol);

    return {
      balance,
      selectedCryptoAddress,
      selectedCryptoFree,
      selectedCurrency,
    };
  }, [watchedSymbol, allAssets]);

  useEffect(() => {
    const { symbol, mode } = orderContext;

    if (mode === "withdraw" && symbol && visibleSymbols.includes(symbol)) {
      setValue("symbol", symbol);
    }
  }, [orderContext, setValue, visibleSymbols]);

  useEffect(() => {
    setApiError("");
    setApiSuccess("");

    if (watchedSymbol && !seenSymbols.includes(watchedSymbol)) {
      dispatch(addSeenSymbol(watchedSymbol));
      setRead({ click: false, show: false });
    }
  }, [dispatch, watchedSymbol]);

  useEffect(() => {
    if (read.show) {
      const mostRecent = seenSymbols?.[seenSymbols.length - 1];
      setValue("symbol", mostRecent);
    }
  }, [read, seenSymbols]);

  useEffect(() => {
    dispatch(getWhitelists());
  }, [dispatch]);

  const showForm = () => {
    if (read.click) {
      setRead({ ...read, show: !read.show });
    }
  };

  const getTotal = value => {
    const amount = parseFloat(value);
    let total = "";
    const fee = selectedCryptoFree[0]?.amount;

    if (fee && !Number.isNaN(fee) && value !== "") {
      total = amount - fee;
    } else {
      total = amount;
    }

    setTotal(total?.toFixed(8));
  };

  const onSubmit = async data => {
    const { symbol: _symbol, amount, address, destinationtag } = data;
    const currencyid = visibleCurrencies.find(
      ({ symbol }) => symbol === _symbol
    )?.id;

    if (total > 0) {
      setApiError("");
      setApiSuccess("");
      const toSubmit = {
        currencyid,
        address,
        destinationtag,
        amount,
        read: JSON.stringify(read.click),
      };

      const { payload } = await dispatch(withDrawCrypto(toSubmit));

      if (!payload?.status) {
        setApiError(payload?.errormessage);
      } else {
        setApiSuccess(payload?.description);
        clearErrors();
        setApiError("");
      }
    }
  };

  const openTermsModal = () => {
    dispatch(setOpenModal("depositwithdrawalterms"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  const openCryptoAddressModal = () => {
    dispatch(setOpenModal("addcryptoaddress"));
  };

  return (
    <Fragment>
      {!read.show ? (
        <div className="dandwinforesult resultbox">
          <div className="modal-content text-center">
            <div className="modal-body modal-confirm">
              <IconSet sprite="sprtlgclrd" size="50clrd" name="warning" />
              <h6>{t("finance:cryptocurrencyWithdrawals")} </h6>
              <p>
                {`${t("finance:rulesNotice1")} `}
                <span className="urllink">
                  <u onClick={() => openTermsModal()}>
                    {t("finance:rulesNotice2")}
                  </u>
                </span>
                {` ${t("finance:rulesNotice3")}`}
              </p>
              <div className="contcheckbox">
                <div className="custom-control custom-checkbox">
                  <Input
                    className="custom-control-input"
                    id="withdrawTabCryptoIhaveRead"
                    type="checkbox"
                    onClick={() =>
                      setRead && setRead({ ...read, click: !read.click })
                    }
                  />
                  <Label
                    className="custom-control-label"
                    htmlFor="withdrawTabCryptoIhaveRead"
                  >
                    {t("login:readAndAgreeCapital")}
                  </Label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button
                variant="primary"
                className={btnClass}
                onClick={() => showForm()}
              >
                {t("common:continue")}
              </Button>
            </div>
          </div>
        </div>
      ) : (
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
                      innerRef={register}
                    >
                      {visibleCurrencies.map(({ symbol }) => {
                        return <option key={symbol}>{symbol}</option>;
                      })}
                    </Input>
                  </FormGroup>
                  <InputGroup className="form-group col">
                    <NumberInput
                      control={control}
                      name="amount"
                      rules={{
                        required: t("isRequired"),
                        min: {
                          value: selectedCryptoFree?.[0]?.amount
                            ? selectedCryptoFree[0].amount
                            : 0,
                          message: t("shouldBeMin", {
                            value: selectedCryptoFree?.[0]?.amount
                              ? localeFormat(selectedCryptoFree[0].amount)
                              : 0,
                          }),
                        },
                        max: {
                          value: selectedBalance
                            ? Number(selectedBalance?.balance).toFixed(8)
                            : 0,
                          message: t("shouldBeMax", {
                            value: selectedBalance
                              ? localeFormat(selectedBalance?.balance)
                              : 0,
                          }),
                        },
                      }}
                      inputProps={{
                        placeholder: t("finance:withdrawAmount"),
                        thousandSeparator: true,
                        decimalScale:
                          selectedCurrency.digit_show || selectedCurrency.digit,
                        fixedDecimalScale: true,
                        onValueChange: target => {
                          const { floatValue } = target;

                          if (floatValue) {
                            setValue("amount", floatValue, {
                              shouldValidate: true,
                            });
                            getTotal(target.floatValue);
                          }
                        },
                        suffix: ` ${watchedSymbol}`,
                      }}
                    />
                  </InputGroup>
                  {errors.amount && (
                    <FormText className="inputresult resulterror">
                      {errors.amount?.message}
                    </FormText>
                  )}
                </Row>
                <InputGroup className="form-group">
                  <Input
                    className="custom-select"
                    type="select"
                    name="address"
                    innerRef={register({
                      required: t("isRequired"),
                    })}
                  >
                    {selectedWhitelists.map(whitelist => {
                      return whitelist?.short_name ? (
                        <option value={whitelist?.address} key={whitelist?.id}>
                          {`${whitelist?.short_name} - ${whitelist?.address}`}
                        </option>
                      ) : (
                        ""
                      );
                    })}
                  </Input>
                  <InputGroupAddon addonType="append">
                    <Button
                      variant="secondary"
                      className="active"
                      onClick={openCryptoAddressModal}
                    >
                      <IconSet sprite="sprtsmclrd" size="16" name="addbtn" />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                {errors.address && (
                  <FormText className="inputresult resulterror">
                    {errors.address?.message}
                  </FormText>
                )}
                {selectedCurrency?.hasdestinationtag ? (
                  <InputGroup className="form-group">
                    <Input
                      readOnly
                      name="destinationtag"
                      value={selectedWhitelist?.destination_tag}
                      innerRef={register({
                        valueAsNumber: true,
                      })}
                    />
                  </InputGroup>
                ) : null}
                <Row form className="form-group">
                  <Col>{t("common:transferFee")}</Col>
                  <Col xs="auto">
                    <NumberFormat
                      value={selectedCryptoFree[0]?.amount || 0}
                      displayType={"text"}
                      thousandSeparator={true}
                      fixedDecimalScale
                      decimalScale={
                        selectedCurrency.digit_show || selectedCurrency.digit
                      }
                      suffix={` ${watchedSymbol}`}
                    />
                  </Col>
                </Row>
                <Row form className="form-group">
                  <Col>{t("common:total")}</Col>
                  <Col xs="auto">
                    <NumberFormat
                      value={total || 0}
                      displayType={"text"}
                      thousandSeparator={true}
                      fixedDecimalScale
                      decimalScale={
                        selectedCurrency.digit_show || selectedCurrency.digit
                      }
                      suffix={` ${watchedSymbol}`}
                    />
                  </Col>
                </Row>
              </div>
              <div className="formbttm">
                {apiError && <AlertResult error>{apiError}</AlertResult>}
                {apiSuccess && <AlertResult success>{apiSuccess}</AlertResult>}
                <Button
                  type="submit"
                  disabled={isWithdrawingCrypto}
                  variant="secondary"
                  className="active"
                >
                  {t("common:sendApprovalEmail")}
                </Button>
              </div>
            </Form>
            <AddCryptoAddressModal
              isOpen={openModal === "addcryptoaddress"}
              watchedSymbol={watchedSymbol}
              selectedCryptoAddress={selectedCryptoAddress}
              issuccess={false}
              isError={false}
              clearModals={clearOpenModals}
              selectedCurrency={selectedCurrency}
            />
          </div>
        </div>
      )}
      <DepositWithdrawalTermsModal
        isOpen={openModal === "depositwithdrawalterms"}
        clearModals={clearOpenModals}
      />
    </Fragment>
  );
};

export default OpenOrderDepoWithTabWithdrawCrypto;
