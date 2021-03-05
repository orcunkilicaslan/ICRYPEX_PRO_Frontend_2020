import { useState } from "react";
import { Form, Row, Col, InputGroup, InputGroupAddon, Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";
import { withdrawBankwire } from "~/state/slices/withdraw.slice";

const banksSelect = ["Hesap Seçiniz", "Akbank", "Garanti", "Finansbank"];

const OpenOrderDepoWithTabWithdrawBank = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form"]);
  const { isWithdrawingBank } = useSelector(state => state.withdraw);
  const [apiError, setApiError] = useState("");
  const { register, handleSubmit, errors, watch, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      // account: "Hesap seçiniz",
      amount: "",
    },
  });

  const onSubmit = async data => {
    if (data?.amount > 0) {
      setApiError("");
      const { payload } = await dispatch(withdrawBankwire(data));
      console.log({ payload, data });

      if (!payload?.status) {
        setApiError(payload?.errormessage);
      } else {
        clearErrors();
        setApiError("");
      }
    }
  };

  return (
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
                name="account"
                innerRef={register({ required: t("isRequired") })}
              >
                {banksSelect.map((el, idx) => {
                  return (
                    <option disabled={idx === 0} key={`${el}_${idx}`}>
                      {el}
                    </option>
                  );
                })}
              </Input>
              <InputGroupAddon addonType="append">
                <Button variant="secondary" className="active">
                  <IconSet sprite="sprtsmclrd" size="16" name="addbtn" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <div>
              {errors.account && (
                <span style={{ color: "red", fontSize: "1rem" }}>
                  {errors.account?.message}
                </span>
              )}
            </div>
            <InputGroup className="form-group col">
              <Input
                type="number"
                name="amount"
                placeholder="Çekmek İstenilen Miktar"
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
              <div className="form-control totalbalance text-right">
                <small>Bakiye</small>
                999,999.00 TRY
              </div>
              <InputGroupAddon addonType="append">
                <Button variant="secondary" className="active">
                  <IconSet sprite="sprtsmclrd" size="16" name="transfer" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <div>
              {errors.amount && (
                <span style={{ color: "red", fontSize: "1rem" }}>
                  {errors.amount?.message}
                </span>
              )}
            </div>
            <Row form className="form-group">
              <Col>Hesaba Geçecek Miktar</Col>
              <Col xs="auto">
                {Number.isNaN(watch("amount")) ? null : watch("amount")} TRY
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
              ÇEKME İSTEĞİ GÖNDER
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OpenOrderDepoWithTabWithdrawBank;
