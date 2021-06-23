import {useState, useMemo, useContext, useEffect, Fragment} from "react";
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
import AddCryptoAddressModal from "~/components/modals/AddCryptoAddressModal";
import { openOrderContext } from "./OpenOrder";
import {getWhitelists} from "~/state/slices/cryptoaddreswhitelist.slice";
import classnames from "classnames";


const OpenOrderDepoWithTabWithdrawCrypto = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form","common", "login","finance"]);
  const { isWithdrawingCrypto } = useSelector(state => state.withdraw);
  const { info } = useSelector(state => state.user);
  const { whitelists = []} = useSelector(state => state.cryptoAddressWhitelist);
  const { groupedCryptoAddresses = {} } = useSelector(state => state.assets);
  const [apiError, setApiError] = useState("");
  const { cryptoCurrencies = [], tokenCurrencies = [] } = useCurrencies();
  const [total, setTotal] = useState("");
  const { allAssets } = useSelector(state => state.assets);
  const cryptoFees = useSelector( state => state.api.settings?.cryptoFees );
  const {
    register,
    handleSubmit,
    errors,
    watch,
    clearErrors,
    setValue,
      reset
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

  const [read, setRead] = useState({click: false, show: false});
  const btnClass  = classnames({ 'disabled': read.click === false,'w-100': true });
  const { symbol: watchedSymbol } = watch();
  const { state: orderContext } = useContext(openOrderContext);

  const selectedAddress = useMemo(
    () => whitelists?.filter(c => c.symbol === watchedSymbol),
    [watchedSymbol, whitelists]
  );

  const {  balance: selectedBalance, selectedCryptoAddress: selectedCryptoAddress, selectedCryptoFree:selectedCryptoFree } = useMemo(() => {
   setValue("amount", "", { shouldValidate: false });
   setTotal("")
    const selectedCryptoAddress = groupedCryptoAddresses?.[watchedSymbol]?.[0]
    const balance = allAssets?.balances?.find?.(
        ({ currency_id }) => currency_id === selectedCryptoAddress?.currency_id
    );
    const selectedCryptoFree = cryptoFees?.filter(c => c.id ===  visibleCurrencies.find(
        ({ symbol }) => symbol === watchedSymbol
    )?.id && c.customerGroupId === info.customergroupid)
    return {  balance, selectedCryptoAddress, selectedCryptoFree };
  }, [watchedSymbol, allAssets, whitelists]);

  useEffect(() => {
    const { symbol, mode } = orderContext;
    if (mode === "withdraw" && symbol && visibleSymbols.includes(symbol)) {
      setValue("symbol", symbol);
    }
  }, [orderContext, setValue, visibleSymbols]);

  useEffect(() => {
   dispatch(getWhitelists())
  },[]);


  const showForm = () => {
    if(read.click) {setRead({...read,show: !read.show})}
  }


  const getTotal = value => {
    const amount = parseFloat(value);
    let total = ""
    const fee =  selectedCryptoFree[0]?.amount;
    if(fee && !Number.isNaN(fee) && value !== "") {
       total = amount - fee
    }else {
       total = amount
    }
    setTotal( total?.toFixed(8))
  };

  const onSubmit = async data => {
    const { symbol: _symbol, amount, read, address, destinationtag } = data;
    const currencyid = visibleCurrencies.find(
      ({ symbol }) => symbol === _symbol
    )?.id;

    if (total > 0) {
      setApiError("");
      const { payload } = await dispatch(
        withDrawCrypto({
          currencyid,
          address,
          destinationtag,
          amount,
          read: true,
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
                  <p>İşleminize devam edebilmek için lütfen <a className="urllink"><u>Kural ve Şartları</u></a> dikkatle okuyup onaylayınız.</p>
                  <div className="contcheckbox">
                    <div className="custom-control custom-checkbox">
                      <Input
                          className="custom-control-input"
                          id="withdrawTabCryptoIhaveRead"
                          type="checkbox"
                          onClick={() => setRead && setRead(  {...read,click: !read.click})}
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
                  <Button variant="primary" className={btnClass} onClick={() => showForm()}>
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
                              min: { value: selectedCryptoFree[0]?.amount ? selectedCryptoFree[0]?.amount : 0, message: t("shouldBeMin", { value: selectedCryptoFree[0]?.amount ? selectedCryptoFree[0]?.amount :0 }) },
                              max: {
                                value: selectedBalance ? Number(selectedBalance.balance).toFixed(8): 0,
                                message: t("shouldBeMax", { value:selectedBalance ? Number(selectedBalance.balance).toFixed(8) : 0 }),
                              },
                            })}
                            onChange={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              const { value } = e.target;
                              if (!Number.isNaN(value) && value !== "") {
                                getTotal(parseFloat(value))
                              }
                            }}
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
                          className="custom-select"
                          type="select"
                          name="customerbankid"
                          innerRef={register({
                            valueAsNumber: true,
                            required: t("isRequired"),
                          })}
                      >
                        {selectedAddress.map(whitelist => {
                          const { address, short_name, id } = whitelist;
                          return (
                              short_name ? (
                                  <option value={id} key={id}>
                                    {`${short_name} - ${address}`}
                                  </option>
                              ) : ""
                          );
                        })}
                      </Input>
                      <InputGroupAddon addonType="append">
                        <Button variant="secondary" className="active" onClick={openCryptoAddressModal}>
                          <IconSet sprite="sprtsmclrd" size="16" name="addbtn" />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.address && (
                        <FormText className="inputresult resulterror">
                          {errors.address?.message}
                        </FormText>
                    )}
                    <Row form className="form-group">
                      <Col>{t("common:transferFee")}</Col>
                      <Col xs="auto">{selectedCryptoFree[0]?.amount} {watchedSymbol}</Col>
                    </Row>
                    <Row form className="form-group">
                      <Col>{t("common:amountToBeTransfer")}</Col>
                      <Col xs="auto">{total} {watchedSymbol}</Col>
                    </Row>
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
                      {t("common:sendApprovalEmail")}
                    </Button>
                  </div>
                </Form>
                <DepositWithdrawalTermsModal
                    isOpen={openModal === "depositwithdrawalterms"}
                    clearModals={clearOpenModals}
                />
                <AddCryptoAddressModal
                    isOpen={openModal === "addcryptoaddress"}
                    watchedSymbol={watchedSymbol}
                    selectedCryptoAddress={selectedCryptoAddress}
                    issuccess={false}
                    isError={false}
                    clearModals={clearOpenModals}
                />
              </div>
            </div>
        )}
      </Fragment>
  );
};

export default OpenOrderDepoWithTabWithdrawCrypto;
