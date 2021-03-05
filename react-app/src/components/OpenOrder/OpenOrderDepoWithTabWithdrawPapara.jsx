import {
  Form,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "~/components/Button.jsx";
import { withdrawPapara } from "~/state/slices/withdraw.slice";

const PAPARA_FEE_RATE = 2;
const PAPARA_FEE_LIMIT = 250;

const OpenOrderDepoWithTabWithdrawPapara = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form"]);
  const { isWithdrawingPapara } = useSelector(state => state.withdraw);
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      // account: "Hesap seçiniz",
      amount: "",
    },
  });

  const getFee = amount => {
    const fee = (PAPARA_FEE_RATE / 100) * amount;

    return Math.min(PAPARA_FEE_LIMIT, fee);
  };

  const onSubmit = async data => {
    if (data?.amount > 0) {
      const result = await dispatch(withdrawPapara(data));
      console.log({ result, data });
    }
  };

  const getTotal = value => {
    const float = parseFloat(value);

    if (Number.isNaN(float) || float <= 0) return null;

    return float?.toFixed(2);
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
              {/* <InputGroupAddon addonType="prepend">
                <InputGroupText>Çekmek İstediğiniz Miktar</InputGroupText>
              </InputGroupAddon> */}
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
              <InputGroupAddon addonType="append">
                <InputGroupText>TRY</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <Row form className="form-group">
              <Col>Papara komisyonu ({`${PAPARA_FEE_RATE}%`} + KDV)</Col>
              <Col xs="auto">{getFee(watch("amount"))}</Col>
            </Row>
            <Row form className="form-group">
              <Col>Hesaba Geçecek Miktar</Col>
              <Col xs="auto">{getTotal(watch("amount"))} TRY</Col>
            </Row>
          </div>
          <div className="formbttm">
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
      </div>
    </div>
  );
};

export default OpenOrderDepoWithTabWithdrawPapara;
