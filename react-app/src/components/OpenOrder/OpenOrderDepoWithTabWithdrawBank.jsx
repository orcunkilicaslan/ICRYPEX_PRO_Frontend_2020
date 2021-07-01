import { useState, useEffect, useMemo } from "react";
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
import classnames from "classnames";

import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";
import { withdrawBankwire } from "~/state/slices/withdraw.slice";
import { fetchBankAccounts } from "~/state/slices/user.slice";
import { useCurrencies } from "~/state/hooks/";
import { setOpenModal } from "~/state/slices/ui.slice";
import {
  AddBankAccountModal,
  DepositWithdrawalTermsModal,
} from "~/components/modals/";
import NumberInput from "~/components/NumberInput.jsx";
import { AlertResult } from "~/components/AlertResult.jsx";

const OpenOrderDepoWithTabWithdrawBank = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "finance", "common", "login"]);
  const { accounts = [] } = useSelector(state => state.user);
  const { allAssets } = useSelector(state => state.assets);
  const { openModal } = useSelector(state => state.ui);
  const { all: allCurrencies } = useCurrencies();
  const [isWithdrawingBank, setIsWithdrawingBank] = useState(true);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [read, setRead] = useState({
    click: false,
    show: false,
  });
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
      customerbankid: accounts?.[0]?.id || "",
      amount: "",
    },
  });
  const { amount: watchedAmount, customerbankid: watchedId } = watch();

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
    setApiError("");
    setApiSuccess("");
    setValue("amount", "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedId]);

  useEffect(() => {
    dispatch(fetchBankAccounts());
  }, [dispatch]);

  useEffect(() => {
    setIsWithdrawingBank(!(watchedAmount && watchedAmount > 0));
  }, [watchedAmount]);

  const showForm = () => {
    if (read.click) {
      setRead({ ...read, show: !read.show });
    }
  };
  const copyToBalance = () => {
    setValue("amount", selectedBalance?.balance, { shouldValidate: true });
  };

  const getTotal = value => {
    const amount = parseFloat(value);

    if (Number.isNaN(amount) || amount <= 0) return null;

    return amount?.toFixed(2);
  };

  const onSubmit = async data => {
    const { customerbankid, amount } = data;

    if (amount > 0) {
      setApiError("");
      setApiSuccess("");
      const { payload } = await dispatch(
        withdrawBankwire({ customerbankid, amount, read: "true" })
      );

      if (!payload?.status) {
        setApiError(payload?.errormessage);
      } else {
        clearErrors();
        setApiError("");
        setApiSuccess(payload?.description);
        setValue("amount", "");
      }
    }
  };

  const openTermsModal = () => {
    dispatch(setOpenModal("depositwithdrawalterms"));
  };

  const openAddBankAccModal = () => {
    dispatch(setOpenModal("addbankaccount"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  const btnClass = classnames({
    disabled: read.click === false,
    "w-100": true,
  });

  return !read.show ? (
    <div className="dandwinforesult resultbox">
      <div className="modal-content text-center">
        <div className="modal-body modal-confirm">
          <IconSet sprite="sprtlgclrd" size="50clrd" name="warning" />
          <h6>{t("finance:withdrawalBankTransfer")}</h6>
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
                id="withdrawBankTabIhaveRead"
                type="checkbox"
                onClick={() =>
                  setRead && setRead({ ...read, click: !read.click })
                }
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
    <div className="dandwtab-bank">
      <div className="dandwtab-form">
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
                <Button
                  variant="secondary"
                  className="active"
                  onClick={openAddBankAccModal}
                >
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
              <NumberInput
                control={control}
                name="amount"
                rules={{
                  valueAsNumber: true,
                  required: t("isRequired"),
                  min: {
                    value: 0,
                    message: t("shouldBeMin", { value: 0 }),
                  },
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
                }}
                inputProps={{
                  placeholder: t("finance:withdrawAmount"),
                  thousandSeparator: true,
                  decimalScale:
                    selectedAccount?.currency?.digit_show ||
                    selectedAccount?.currency?.digit,
                  fixedDecimalScale: true,
                  onValueChange: target => {
                    const { floatValue } = target;

                    if (floatValue) {
                      setValue("amount", floatValue);
                    }
                  },
                }}
              />
              <div className="form-control totalbalance text-right">
                <small>{t("common:balance")}</small>
                <NumberFormat
                  value={selectedBalance?.balance || 0}
                  displayType={"text"}
                  title={selectedBalance?.balance || 0}
                  thousandSeparator={true}
                  fixedDecimalScale
                  decimalScale={
                    selectedAccount?.currency?.digit_show ||
                    selectedAccount?.currency?.digit
                  }
                  suffix={` ${selectedAccount?.currency?.symbol}`}
                />
              </div>
              <InputGroupAddon addonType="append">
                <Button
                  variant="secondary"
                  className="active"
                  onClick={() => copyToBalance()}
                >
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
              <Col>{t("common:total")}</Col>
              <Col xs="auto">
                <NumberFormat
                  value={getTotal(watchedAmount) || 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  fixedDecimalScale
                  decimalScale={
                    selectedAccount?.currency?.digit_show ||
                    selectedAccount?.currency?.digit
                  }
                  suffix={` ${selectedAccount?.currency?.symbol}`}
                />
              </Col>
            </Row>
          </div>
          <div className="formbttm">
            {apiError && <AlertResult error>{apiError}</AlertResult>}
            {apiSuccess && <AlertResult success>{apiSuccess}</AlertResult>}
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
      </div>
    </div>
  );
};

export default OpenOrderDepoWithTabWithdrawBank;
