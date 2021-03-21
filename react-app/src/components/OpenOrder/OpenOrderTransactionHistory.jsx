import { useState, useMemo, useEffect } from "react";
import {
  Row,
  Col,
  Label,
  Input,
  ButtonGroup,
  Form,
  FormGroup,
} from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { useClientRect, useCurrencies } from "~/state/hooks/";
import { fetchTransactionHistories } from "~/state/slices/transaction.slice";

const historytable = [
  {
    id: "01",
    idnmbr: "MR-99999",
    date: "21.02.2020",
    time: "18:23",
    pair: "BTC/TRY",
    typetext: "Stop Limit",
    typeresult1: "1",
    typeresult2: "Alış",
    average: "22,430 TRY",
    price: "22,430 TRY",
    transaction: "1,43004833 BTC",
    amount: "1,43004833 BTC",
    total: "50.98588353 TRY",
    commission: "10.98 TRY",
    statustype: "1",
    statustext: "Onaylandı",
  },
  {
    id: "02",
    idnmbr: "MR-99999",
    date: "21.02.2020",
    time: "18:23",
    pair: "BTC/ETH",
    typetext: "Market Limit",
    typeresult1: "1",
    typeresult2: "Alış",
    average: "35,120 TRY",
    price: "35,120 TRY",
    transaction: "1,47050968 BTC",
    amount: "1,47050968 BTC",
    total: "43,99958890 TRY",
    commission: "9.99 TRY",
    statustype: "1",
    statustext: "Onaylandı",
  },
  {
    id: "03",
    idnmbr: "MR-99999",
    date: "21.02.2020",
    time: "18:23",
    pair: "BTC/EOS",
    typetext: "Stop Limit",
    typeresult1: "0",
    typeresult2: "Satış",
    average: "3.469 TRY",
    price: "3.469 TRY",
    transaction: "1,28947736 BTC",
    amount: "1,28947736 BTC",
    total: "23,74630933 TRY",
    commission: "3,74 TRY",
    statustype: "1",
    statustext: "Onaylandı",
  },
  {
    id: "04",
    idnmbr: "MR-99999",
    date: "21.02.2020",
    time: "18:23",
    pair: "BTC/XRP",
    typetext: "Market Limit",
    typeresult1: "1",
    typeresult2: "Satış",
    average: "41,956 TRY",
    price: "41,956 TRY",
    transaction: "1,29846500 BTC",
    amount: "1,29846500 BTC",
    total: "65,84947640 TRY",
    commission: "5,84 TRY",
    statustype: "1",
    statustext: "Onaylandı",
  },
  {
    id: "05",
    idnmbr: "MR-99999",
    date: "21.02.2020",
    time: "18:23",
    pair: "BTC/XRP",
    typetext: "Market Limit",
    typeresult1: "1",
    typeresult2: "Alış",
    average: "1.029 TRY",
    price: "1.029 TRY",
    transaction: "1,75893923 BTC",
    amount: "1,75893923 BTC",
    total: "76,74638908 TRY",
    commission: "7,74 TRY",
    statustype: "1",
    statustext: "Onaylandı",
  },
];

const orderBy = [
  "Önce Yeni Tarihli",
  "Önce Eski Tarihli",
  "Önce Para Yatırma",
  "Önce Para Çekme",
  "Önce TRY",
  "Önce USD",
  "Önce Kripto Para",
  "Önce Banka",
  "Önce Papara",
];
const transactionTypes = [
  { label: "Yatırma", name: "isdeposit" },
  { label: "Çekme", name: "iswithdraw" },
  { label: "Tamamlandı", name: "isrealized" },
  { label: "İptal", name: "iscanceled" },
];
const periodBy = ["1G", "1H", "2H", "1A", "3A"];

const OpenOrderTransactionHistory = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form"]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { activeCurrencies } = useCurrencies();
  const { history } = useSelector(state => state.transaction);
  const [apiError, setApiError] = useState("");

  const validCurrencies = useMemo(
    () => activeCurrencies.filter(({ symbol }) => symbol !== "EUR"),
    [activeCurrencies]
  );

  const defaultValues = useMemo(() => {
    const currencyids = validCurrencies
      .map(({ id }) => Number(id))
      .sort((a, b) => a - b);

    return {
      currencyids,
      orderby: 1,
      isdeposit: true,
      iswithdraw: true,
      isrealized: true,
      iscanceled: true,
      periodby: 2,
    };
  }, [validCurrencies]);

  const {
    register,
    handleSubmit,
    errors,
    watch,
    reset,
    setValue,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues,
  });
  const { periodby: watchedPeriodby } = watch();

  useEffect(() => {
    dispatch(fetchTransactionHistories(defaultValues));
  }, [defaultValues, dispatch]);

  const onSubmit = async data => {
    setApiError("");
    const { currencyids } = data;
    const toSubmit = { ...data, currencyids: currencyids.map(Number) };

    const { payload } = await dispatch(fetchTransactionHistories(toSubmit));

    if (!payload?.status) {
      setApiError(payload?.errormessage);
    } else {
      setApiError("");
    }
  };

  const onReset = () => {
    reset(defaultValues);
    setApiError("");
    clearErrors();
  };

  return (
    <div className="openorders-history">
      <Form
        className="tabcont tabcont-filterbar siteformui"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row className="tabcont tabcont-filterbar">
          <Col>
            <Input
              className="custom-select custom-select-sm"
              type="select"
              multiple
              size={4}
              name="currencyids"
              innerRef={register({
                required: t("isRequired"),
              })}
            >
              {validCurrencies.map(({ symbol, id }) => {
                return (
                  <option value={Number(id)} key={symbol}>
                    {symbol}
                  </option>
                );
              })}
            </Input>
            <div>
              {errors.currencyids && (
                <span style={{ color: "red", fontSize: "1rem" }}>
                  {errors.currencyids?.message}
                </span>
              )}
            </div>
          </Col>
          <Col>
            <Input
              className="custom-select custom-select-sm"
              type="select"
              name="orderby"
              innerRef={register({
                valueAsNumber: true,
              })}
            >
              {orderBy.map((el, idx) => {
                return (
                  <option value={idx + 1} key={`${el}_${idx}`}>
                    {el}
                  </option>
                );
              })}
            </Input>
          </Col>
          <Col>
            <FormGroup check inline>
              {transactionTypes.map(({ label, name }) => {
                return (
                  <Label key={name} check>
                    <Input
                      name={name}
                      type="checkbox"
                      innerRef={register({ valueAsNumber: true })}
                    />
                    {label}{" "}
                  </Label>
                );
              })}
            </FormGroup>
          </Col>
          <Col>
            <Input
              name="periodby"
              innerRef={register({ valueAsNumber: true })}
              style={{ display: "none" }}
            />
            <ButtonGroup size="sm" className="w-100">
              {periodBy.map((el, idx) => {
                const cls = classnames({ active: watchedPeriodby === idx + 1 });

                return (
                  <Button
                    key={`${el}_${idx}`}
                    type="button"
                    size="sm"
                    className={cls}
                    variant="secondary"
                    onClick={() =>
                      setValue("periodby", idx + 1, { shouldValidate: true })
                    }
                  >
                    {el}
                  </Button>
                );
              })}
            </ButtonGroup>
          </Col>
          <Col xs="auto">
            <Input
              type="text"
              bsSize="sm"
              placeholder="Başlangıç - Bitiş Tarihi"
            />
          </Col>
          {/* <Col xs="auto">
            <div className="custom-control custom-checkbox">
              <Input
                className="custom-control-input"
                type="checkbox"
                id="ordersHideOtherPairs"
                defaultChecked
              />
              <Label
                className="custom-control-label"
                htmlFor="ordersHideOtherPairs"
                check
              >
                Diğer Çiftleri Gizle
              </Label>
            </div>
          </Col> */}
        </Row>
        <ButtonGroup>
          <Button variant="secondary" className="w-100 active" type="submit">
            Filtrele
          </Button>
          <Button variant="secondary" className="active" onClick={onReset}>
            Sıfırla
          </Button>
        </ButtonGroup>
        {apiError && (
          <span style={{ color: "coral", fontSize: "1rem" }}>{apiError}</span>
        )}
      </Form>
      <div className="ootransactionhistorytable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="brws" />
              <Table.Th sizeauto className="nmbr">
                İşlem No
              </Table.Th>
              <Table.Th sizeauto className="date">
                Tarih
              </Table.Th>
              <Table.Th sizeauto className="symb">
                Çift
              </Table.Th>
              <Table.Th sizeauto className="type">
                İşlem Tipi
              </Table.Th>
              <Table.Th sizefixed className="avrg">
                Ortalama
              </Table.Th>
              <Table.Th sizefixed className="pric">
                Fiyat
              </Table.Th>
              <Table.Th sizefixed className="hppn">
                Gerçekleşen
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                Miktar
              </Table.Th>
              <Table.Th sizefixed className="totl">
                Toplam
              </Table.Th>
              <Table.Th sizeauto className="comm">
                Komisyon
              </Table.Th>
              <Table.Th sizeauto className="stts">
                Durum
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
            striped
            hovered
            scrollbar
            scrollbarstyles={{ height: `${tableHeight - 36}px` }}
          >
            {historytable.map(
              ({
                id,
                idnmbr,
                date,
                time,
                pair,
                typetext,
                typeresult1,
                typeresult2,
                average,
                price,
                transaction,
                amount,
                total,
                commission,
                statustype,
                statustext,
              }) => {
                const cls1 = classnames({
                  sitecolorgreen: typeresult1 === "1",
                  sitecolorred: typeresult1 !== "1",
                });

                const cls2 = classnames({
                  sitecolorgreen: statustype === "1",
                  sitecolorred: statustype !== "1",
                });

                return (
                  <div className="hsttblbrwswrp" key={id}>
                    <Table.Tr className="hsttblbrwstr">
                      <Table.Td sizeauto className="brws">
                        <a href="#" title="İşlemi İnceleyin">
                          <IconSet
                            sprite="sprtsmclrd"
                            size="14"
                            name="browse"
                          />
                        </a>
                      </Table.Td>
                      <Table.Td sizeauto className="nmbr">
                        {idnmbr}
                      </Table.Td>
                      <Table.Td sizeauto className="date">
                        {date} - {time}
                      </Table.Td>
                      <Table.Td sizeauto className="symb">
                        {pair}
                      </Table.Td>
                      <Table.Td sizeauto className="type">
                        {typetext} - <span className={cls1}>{typeresult2}</span>
                      </Table.Td>
                      <Table.Td sizefixed className="avrg">
                        {average}
                      </Table.Td>
                      <Table.Td sizefixed className="pric">
                        {price}
                      </Table.Td>
                      <Table.Td sizefixed className="hppn">
                        {transaction}
                      </Table.Td>
                      <Table.Td sizefixed className="amnt">
                        {amount}
                      </Table.Td>
                      <Table.Td sizefixed className="totl">
                        {total}
                      </Table.Td>
                      <Table.Td sizeauto className="comm">
                        {commission}
                      </Table.Td>
                      <Table.Td sizeauto className="stts">
                        <span className={cls2}>{statustext}</span>
                      </Table.Td>
                    </Table.Tr>
                    <div className="hsttblbrwstbl">
                      <Table>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th sizeauto className="date">
                              Tarih
                            </Table.Th>
                            <Table.Th sizefixed className="hppr">
                              Gerçekleşen Fiyat
                            </Table.Th>
                            <Table.Th sizefixed className="hppn">
                              Gerçekleşen
                            </Table.Th>
                            <Table.Th sizeauto className="comm">
                              Komisyon
                            </Table.Th>
                            <Table.Th sizefixed className="totl">
                              Toplam
                            </Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          <Table.Tr>
                            <Table.Td sizeauto className="date">
                              21.02.2020 18:23
                            </Table.Td>
                            <Table.Td sizefixed className="hppr">
                              33,650 TRY
                            </Table.Td>
                            <Table.Td sizefixed className="hppn">
                              0,763282734 BTC
                            </Table.Td>
                            <Table.Td sizeauto className="comm">
                              45 TRY
                            </Table.Td>
                            <Table.Td sizefixed className="totl">
                              24,564 TRY
                            </Table.Td>
                          </Table.Tr>
                        </Table.Tbody>
                      </Table>
                    </div>
                  </div>
                );
              }
            )}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default OpenOrderTransactionHistory;
