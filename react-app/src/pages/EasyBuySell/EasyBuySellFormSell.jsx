import { useState } from "react";
import {
  Row,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { ReactComponent as TildeSmIcon } from "~/assets/images/icons/path_icon_tildesm.svg";
import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";
import Table from "~/components/Table.jsx";
import { usePrices } from "~/state/hooks/";

const EasyBuySellFormSell = props => {
  const { t } = useTranslation(["form", "common", "finance"]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { fiatCurrency, cryptoCurrency, selectedPrice } = usePrices();
  const { register, handleSubmit, errors, setValue, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      fiatAmount: "",
      cryptoAmount: "",
    },
  });

  const onReset = event => {
    event.preventDefault();
    event.stopPropagation();
    setIsSubmitted(false);
    setIsConfirmed(false);
    reset();
  };

  const onConfirm = event => {
    event.preventDefault();
    event.stopPropagation();
    setIsConfirmed(true);
  };

  const onSubmit = data => {
    setIsSubmitted(true);
  };

  return (
    <div className="easybuysell-cont">
      <Form
        className="siteformui"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row className="easybuysell-form-inputs">
          <FormGroup
              className={`col ${errors.cryptoAmount && ("inputresult resulterror")}`}
          >
            <div className="formflexlabel">
              <Label>MİKTAR {cryptoCurrency}</Label>
              <div className="labelassets">
                <p>
                  Kullanılabilir: <span>1.41811575 {cryptoCurrency}</span>
                </p>
                <Button type="button" className="ml-1">
                  <IconSet sprite="sprtsmclrd" size="16" name="addbtn" />
                </Button>
              </div>
            </div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>{t("common:amount")}</InputGroupText>
              </InputGroupAddon>
              <Input
                type="number"
                name="cryptoAmount"
                readOnly={isSubmitted}
                innerRef={register({
                  valueAsNumber: true,
                  required: t("isRequired"),
                  min: { value: 0, message: t("shouldBeMin", { value: 0 }) },
                  max: {
                    value: 999999,
                    message: t("shouldBeMax", { value: 999999 }),
                  },
                })}
                onChange={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  const { value } = e.target;

                  if (!Number.isNaN(value)) {
                    const parsed = parseFloat(value);
                    const { price } = selectedPrice;
                    const fiatAmount = Number(price * parsed).toFixed(2);
                    setValue("fiatAmount", fiatAmount, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>{cryptoCurrency}</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {errors.cryptoAmount && (
                <FormText className="inputresult resulterror">
                  {errors.cryptoAmount?.message}
                </FormText>
            )}
          </FormGroup>
          <FormGroup className="col-auto">
            <div className="inputchangeicon">
              <IconSet sprite="sprtsmclrd" size="16" name="change" />
            </div>
          </FormGroup>
          <FormGroup
              className={`col ${errors.fiatAmount && ("inputresult resulterror")}`}
          >
            <div className="formflexlabel">
              <Label>MİKTAR {fiatCurrency}</Label>
              <div className="labelprice">
                <p>
                  {cryptoCurrency} Fiyat: <TildeSmIcon className="tildesm" />{" "}
                  <span>66,238.89 {fiatCurrency}</span>
                </p>
              </div>
            </div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>{t("common:amount")}</InputGroupText>
              </InputGroupAddon>
              <Input
                type="number"
                name="fiatAmount"
                readOnly={isSubmitted}
                innerRef={register({
                  valueAsNumber: true,
                  required: t("isRequired"),
                  min: { value: 0, message: t("shouldBeMin", { value: 0 }) },
                  max: {
                    value: 999999,
                    message: t("shouldBeMax", { value: 999999 }),
                  },
                })}
                onChange={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  const { value } = e.target;

                  if (!Number.isNaN(value)) {
                    const parsed = parseFloat(value);
                    const { price } = selectedPrice;
                    const cryptoAmount = Number(parsed / price).toFixed(8);
                    setValue("cryptoAmount", cryptoAmount, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>{fiatCurrency}</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {errors.fiatAmount && (
                <FormText className="inputresult resulterror">
                  {errors.fiatAmount?.message}
                </FormText>
            )}
          </FormGroup>
        </Row>
        <div className="easybuysell-form-btns">
          <Button
            variant="danger"
            className="w-50"
            type="submit"
            disabled={isSubmitted}
          >
            {t("finance:sellwhat", { item: cryptoCurrency })}
          </Button>
        </div>
      </Form>
      {isSubmitted ? (
        isConfirmed ? (
          <div className="easybuysell-confirm resultsuccess">
            <div className="easybuysell-confirm-title">
              <h4>
                <IconSet sprite="sprtsmclrd" size="16" name="check" />
                İŞLEMİNİZ BAŞARIYLA GERÇEKLEŞTİ
              </h4>
              <p>
                Bitcoin satış işleminiz başarıyla tamamlanmıştır.{" "}
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
            <div className="easybuysell-confirm-table">
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th sizeauto className="type">
                      İşlem Tipi
                    </Table.Th>
                    <Table.Th sizeauto className="symb">
                      Çift
                    </Table.Th>
                    <Table.Th sizefixed className="amtc">
                      Miktar <span>TRY</span>
                    </Table.Th>
                    <Table.Th sizefixed className="amts">
                      Miktar <span>BTC</span>
                    </Table.Th>
                    <Table.Th sizeauto className="comm">
                      Komisyon
                    </Table.Th>
                    <Table.Th sizefixed className="totl">
                      Toplam Tutar
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody striped>
                  <Table.Tr>
                    <Table.Td sizeauto className="type">
                      Stop Limit - <span className="sitecolorred">Satış</span>
                    </Table.Td>
                    <Table.Td sizeauto className="symb">
                      BTC/TRY
                    </Table.Td>
                    <Table.Td sizefixed className="amtc">
                      999,999.99 TRY
                    </Table.Td>
                    <Table.Td sizefixed className="amts">
                      1.48000000 BTC
                    </Table.Td>
                    <Table.Td sizeauto className="comm">
                      999.99 TRY
                    </Table.Td>
                    <Table.Td sizefixed className="totl">
                      449.887546 TRY
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </div>
            <Button variant="secondary" className="active" onClick={onReset}>
              RESET
            </Button>
          </div>
        ) : (
          <div className="easybuysell-confirm">
            <div className="easybuysell-confirm-title">
              <h4>İŞLEM ONAYI</h4>
            </div>
            <div className="easybuysell-confirm-table">
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th sizeauto className="type">
                      İşlem Tipi
                    </Table.Th>
                    <Table.Th sizeauto className="symb">
                      Çift
                    </Table.Th>
                    <Table.Th sizefixed className="amtc">
                      Miktar <span>TRY</span>
                    </Table.Th>
                    <Table.Th sizefixed className="amts">
                      Miktar <span>BTC</span>
                    </Table.Th>
                    <Table.Th sizeauto className="comm">
                      Komisyon
                    </Table.Th>
                    <Table.Th sizefixed className="totl">
                      Toplam Tutar
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody striped>
                  <Table.Tr>
                    <Table.Td sizeauto className="type">
                      Stop Limit - <span className="sitecolorred">Satış</span>
                    </Table.Td>
                    <Table.Td sizeauto className="symb">
                      BTC/TRY
                    </Table.Td>
                    <Table.Td sizefixed className="amtc">
                      999,999.99 TRY
                    </Table.Td>
                    <Table.Td sizefixed className="amts">
                      1.48000000 BTC
                    </Table.Td>
                    <Table.Td sizeauto className="comm">
                      999.99 TRY
                    </Table.Td>
                    <Table.Td sizefixed className="totl">
                      449.887546 TRY
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </div>
            <div className="easybuysell-confirm-btns">
              <Button
                variant="secondary"
                className="active"
                onClick={() => setIsSubmitted(false)}
              >
                İPTAL ET
              </Button>
              <Button variant="success" onClick={onConfirm}>
                İŞLEMİ ONAYLA
              </Button>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default EasyBuySellFormSell;
