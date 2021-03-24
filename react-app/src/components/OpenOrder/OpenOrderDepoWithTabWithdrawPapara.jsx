import { useState } from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input, Label,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "~/state/slices/ui.slice";
import DepositWithdrawalTermsModal from "~/components/modals/DepositWithdrawalTermsModal.jsx";

import { Button } from "~/components/Button.jsx";
import { withdrawPapara } from "~/state/slices/withdraw.slice";

const PAPARA_FEE_RATE = 2;
const PAPARA_FEE_LIMIT = 250;

const OpenOrderDepoWithTabWithdrawPapara = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form"]);
  const { isWithdrawingPapara } = useSelector(state => state.withdraw);
  const [apiError, setApiError] = useState("");
  const { register, handleSubmit, errors, watch, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: "",
    },
  });

  const getFee = amount => {
    if (Number.isNaN(amount) || amount <= 0) return 0;

    const fee = (PAPARA_FEE_RATE / 100) * amount;

    return Math.min(PAPARA_FEE_LIMIT, fee);
  };

  const getTotal = value => {
    const float = parseFloat(value);
    const fee = getFee(value);

    if (Number.isNaN(float) || float <= 0) return null;

    return (float - fee)?.toFixed(2);
  };

  const onSubmit = async data => {
    const { paparaid, amount } = data;
    const total = getTotal(amount);

    if (total > 0) {
      setApiError("");
      const { payload } = await dispatch(withdrawPapara({ paparaid, amount }));

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
    <div className="dandwtab-papara">
      <div className="dandwtab-form">
        <Form
          className="withdrawpaparaform siteformui"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="formfieldset">
            <InputGroup className="form-group">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Papara No</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                readOnly
                value={"1773547589"}
                className="form-control"
                name="paparaid"
                innerRef={register({ minLength: 10 })}
              />
            </InputGroup>
            <div>
              {errors.paparaid && (
                <span style={{ color: "red", fontSize: "1rem" }}>
                  {errors.paparaid?.message}
                </span>
              )}
            </div>
            <InputGroup className="form-group">
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
                <InputGroupText>TRY</InputGroupText>
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
              <Col>
                Papara komisyonu ({`${PAPARA_FEE_RATE}%`} [En fazla 250.00 TRY]
                + KDV)
              </Col>
              <Col xs="auto">{getFee(watch("amount"))} TRY</Col>
            </Row>
            <Row form className="form-group">
              <Col>Hesaba Geçecek Miktar</Col>
              <Col xs="auto">{getTotal(watch("amount"))} TRY</Col>
            </Row>
          </div>
          <div className="confirmcheckbox">
            <div className="custom-control custom-checkbox">
              <Input
                  className="custom-control-input"
                  id="withdrawTabIhaveRead"
                  type="checkbox"
                  defaultChecked
              />
              <Label
                  className="custom-control-label"
                  htmlFor="withdrawTabIhaveRead"
              >
                <Button
                    onClick={openTermsModal}
                >
                  Kural ve Şartları
                </Button>{" "}
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
              variant="secondary"
              className="active"
              disabled={isWithdrawingPapara}
            >
              PAPARA İLE ÇEK
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

export default OpenOrderDepoWithTabWithdrawPapara;
