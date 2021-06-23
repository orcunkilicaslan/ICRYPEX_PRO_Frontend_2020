import { useState, useEffect, useMemo, Fragment } from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Label,
  FormText,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";

import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";
import { withdrawBankwire } from "~/state/slices/withdraw.slice";
import { fetchBankAccounts } from "~/state/slices/user.slice";
import { useCurrencies } from "~/state/hooks/";
import { setOpenModal } from "~/state/slices/ui.slice";
import DepositWithdrawalTermsModal from "~/components/modals/DepositWithdrawalTermsModal.jsx";
import AddBankAccountModal from "~/components/modals/AddBankAccountModal";
import classnames from "classnames";
import NumberInput from "~/components/NumberInput.jsx";

const OpenOrderDepoWithTabWithdrawBank = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "finance", "common", "login"]);
  const [isWithdrawingBank, setIsWithdrawingBank ]  = useState(true);
  const { accounts = [] } = useSelector(state => state.user);
  const { allAssets } = useSelector(state => state.assets);
  const { all: allCurrencies } = useCurrencies();
  const [apiError, setApiError] = useState("");
  const { register, handleSubmit, errors, watch, clearErrors, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      customerbankid: accounts?.[0]?.id || "",
      amount: "",
      read: false,
    },
  });
  const { amount: watchedAmount, customerbankid: watchedId } = watch();
  const [read, setRead] = useState({click: false, show: false, success:false});
  const btnClass  = classnames({ 'disabled': read.click === false,'w-100': true });

  const showForm = () => {
    if(read.click) {setRead({...read,show: !read.show})}
  }
  const copyToBalance = () => {
    setValue("amount",selectedBalance?.balance, { shouldValidate: true });
  }

  const userAccounts = useMemo(() => {
    return accounts.map(account => {
      const { currency_id } = account;
      const currency = allCurrencies.find(
        ({ id }) => currency_id === Number(id)
      );

      return { ...account, currency };
    });
  }, [accounts, allCurrencies]);

  const { account: selectedAccount, balance: selectedBalance } = useMemo(() => {
    const account = userAccounts.find(({ id }) => watchedId === id);
    const balance = allAssets?.balances?.find?.(
      ({ currency_id }) => currency_id === account?.currency_id
    );

    return { account, balance };
  }, [watchedId, userAccounts, allAssets]);

  useEffect(() => {
    dispatch(fetchBankAccounts());
  }, [dispatch]);
  useEffect(() => {
      setIsWithdrawingBank(!(watchedAmount && watchedAmount> 0))
  }, [watchedAmount]);

  const getTotal = value => {
    const amount = parseFloat(value);

    if (Number.isNaN(amount) || amount <= 0) return null;

    return amount?.toFixed(2);
  };

  const onSubmit = async data => {
    const { customerbankid, amount, read } = data;

    if (amount > 0) {
      setApiError("");
      const { payload } = await dispatch(
        withdrawBankwire({ customerbankid, amount, read: JSON.stringify(read) })
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

  const openAddBankAccModal = () => {
    dispatch(setOpenModal("addbankaccount"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  return (
      <Fragment>
        {!read.show ? (
            <div className="dandwinforesult resultbox">
              <div className="modal-content text-center">
                <div className="modal-body modal-confirm">
                  <IconSet sprite="sprtlgclrd" size="50clrd" name="warning" />
                  <h6>{t("finance:withdrawalBankTransfer")}</h6>
                  <p>İşleminize devam edebilmek için lütfen <a className="urllink" onClick={openTermsModal}><u>Kural ve Şartları</u></a> dikkatle okuyup onaylayınız.</p>
                  <div className="contcheckbox">
                    <div className="custom-control custom-checkbox">
                      <Input
                          className="custom-control-input"
                          id="withdrawBankTabIhaveRead"
                          type="checkbox"
                          onClick={() => setRead && setRead(  {...read,click: !read.click})}
                      />
                      <Label
                          className="custom-control-label"
                          htmlFor="withdrawBankTabIhaveRead"
                      >
                        {t("login:readAndAgreeCapital")}
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Button variant="primary"  className={btnClass} onClick={() => showForm()}>
                    {t("common:continue")}
                  </Button>
                </div>
              </div>
            </div>
        ) : (
            <div className="dandwtab-bank">
              <div className="dandwtab-form">
                {!read.success? (
                    <Fragment>
                      <Form
                          className="withdrawbankform siteformui"
                          autoComplete="off"
                          noValidate
                          onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="formfieldset">
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
                              {userAccounts.map(account => {
                                const { iban, id, name } = account;

                                return (
                                    <option value={id} key={id}>
                                      {`${name} - ${iban}`}
                                    </option>
                                );
                              })}
                            </Input>
                            <InputGroupAddon addonType="append">
                              <Button variant="secondary" className="active" onClick={openAddBankAccModal}>
                                <IconSet sprite="sprtsmclrd" size="16" name="addbtn" />
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                          {errors.customerbankid && (
                              <FormText className="inputresult resulterror">
                                {errors.customerbankid?.message}
                              </FormText>
                          )}
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
                                    value: selectedBalance?.balance
                                        ? selectedBalance.balance
                                        : 999999,
                                    message: t("shouldBeMax", {
                                      value: selectedBalance?.balance
                                          ? selectedBalance.balance
                                          : 999999,
                                    }),
                                  },
                                })}
                            />
                            <div className="form-control totalbalance text-right">
                              <small> {t("common:balance")}</small>
                              {selectedBalance?.balance} {selectedAccount?.currency?.symbol}
                            </div>
                            <InputGroupAddon addonType="append">
                              <Button variant="secondary" className="active" onClick={() => copyToBalance()}>
                                <IconSet sprite="sprtsmclrd" size="16" name="transfer" />
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                          {errors.amount && (
                              <FormText className="inputresult resulterror">
                                {errors.amount?.message}
                              </FormText>
                          )}
                          <Row form className="form-group">
                            <Col>{t("finance:amountToDeposit")}</Col>
                            <Col xs="auto">
                              {getTotal(watchedAmount)} {selectedAccount?.currency?.symbol}
                            </Col>
                          </Row>
                        </div>
                        <div className="formbttm">
                          {apiError && (
                              <span style={{ color: "red", fontSize: "1rem" }}>{apiError}</span>
                          )}
                          <Button
                              type="submit"
                              variant="secondary"
                              className="active"
                              disabled={isWithdrawingBank}
                          >
                            {t("finance:createATicket")}
                          </Button>
                        </div>
                      </Form>
                      <DepositWithdrawalTermsModal
                          isOpen={openModal === "depositwithdrawalterms"}
                          clearModals={clearOpenModals}
                      />
                      <AddBankAccountModal
                          isOpen={openModal === "addbankaccount"}
                          isSuccess={false}
                          isError={false}
                          clearModals={clearOpenModals}
                      />
                    </Fragment>
                ) : (
                    <div className="resultbox">
                      <div className="modal-content modal-sm text-center">
                        <div className="modal-body modal-confirm">
                          <IconSet sprite="sprtlgclrd" size="50clrd" name="check" />
                          <p>İşleminiz başarıyla tamamlanmıştır.</p>
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
                          <Button variant="primary" className="w-100">
                            YENİ İŞLEM
                          </Button>
                        </div>
                      </div>
                    </div>
                )}
              </div>
            </div>
        )}
      </Fragment>
  );
};

export default OpenOrderDepoWithTabWithdrawBank;
