import { useState } from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { take } from "lodash";

import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet";
import { useCurrencies } from "~/state/hooks/";
import { withDrawCrypto } from "~/state/slices/withdraw.slice";

const FEE_RATE = 15;

const OpenOrderDepoWithTabWithdrawCrypto = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form"]);
  const { isWithdrawingCrypto } = useSelector(state => state.withdraw);
  const { groupedCryptoAddresses = {} } = useSelector(state => state.assets);
  const { cryptoCurrencies = [] } = useCurrencies();
  const { register, handleSubmit, errors, watch, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      symbol: cryptoCurrencies[0]?.symbol,
      amount: "",
      address: "",
    },
  });
  const [apiError, setApiError] = useState("");

  const watchedSymbol = watch("symbol");
  const [cryptoAddress] = take(groupedCryptoAddresses[watchedSymbol]);

  const getTotal = value => {
    const amount = parseFloat(value);
    const total = amount - FEE_RATE;

    if (Number.isNaN(amount) || amount <= 0) return null;

    return total < 0 ? null : total?.toFixed(2);
  };

  const onSubmit = async data => {
    const { symbol: _symbol, amount, address, destinationtag } = data;
    const currencyid = cryptoCurrencies.find(({ symbol }) => symbol === _symbol)
      ?.id;
    const total = getTotal(amount);

    if (total > 0) {
      setApiError("");
      const { payload } = await dispatch(
        withDrawCrypto({ currencyid, amount, address })
      );

      if (!payload?.status) {
        setApiError(payload?.errormessage);
      } else {
        clearErrors();
        setApiError("");
      }
    }
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
                  {cryptoCurrencies.map(({ symbol }) => {
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
              <div>
                {errors.amount && (
                  <span style={{ color: "red", fontSize: "1rem" }}>
                    {errors.amount?.message}
                  </span>
                )}
              </div>
            </Row>
            <InputGroup className="form-group">
              <Input
                type="text"
                readOnly
                value={cryptoAddress?.address || ""}
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
            <div>
              {errors.address && (
                <span style={{ color: "red", fontSize: "1rem" }}>
                  {errors.address?.message}
                </span>
              )}
            </div>
            <Row form className="form-group">
              <Col>Transfer Ücreti</Col>
              <Col xs="auto">{FEE_RATE} TRY</Col>
            </Row>
            <Row form className="form-group">
              <Col>Hesaba Geçecek Miktar</Col>
              <Col xs="auto">{getTotal(watch("amount"))} TRY</Col>
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
              ONAY E-POSTA GÖNDER
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OpenOrderDepoWithTabWithdrawCrypto;
