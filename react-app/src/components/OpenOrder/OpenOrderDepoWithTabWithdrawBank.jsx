import { Form, Row, Col, InputGroup, InputGroupAddon, Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";

const banksSelect = ["Hesap Seçiniz", "Akbank", "Garanti", "Finansbank"];
const TRANSACTION_FEE = 25;

const OpenOrderDepoWithTabWithdrawBank = props => {
  const { t } = useTranslation(["form"]);
  const { register, handleSubmit, getValues, errors } = useForm({
    mode: "onChange",
    defaultValues: {
      // account: "Hesap seçiniz",
      amount: "",
    },
  });
  const onSubmit = data => console.log({ data });

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
              <Col>İşlem Ücreti</Col>
              <Col xs="auto">{TRANSACTION_FEE?.toFixed(2)} TRY</Col>
            </Row>
            <Row form className="form-group">
              <Col>Hesaba Geçecek Miktar</Col>
              <Col xs="auto">
                {Number.isNaN(getValues("amount"))
                  ? null
                  : getValues("amount") + TRANSACTION_FEE}{" "}
                TRY
              </Col>
            </Row>
          </div>
          <div className="formbttm">
            <Button type="submit" variant="secondary" className="active">
              ÇEKME İSTEĞİ GÖNDER
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OpenOrderDepoWithTabWithdrawBank;
