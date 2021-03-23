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
import { sub } from "date-fns";
import { omit, merge } from "lodash";

import { Button } from "../Button.jsx";
import Table from "../Table.jsx";
import { useClientRect, useCurrencies } from "~/state/hooks/";
import { fetchTransactionHistories } from "~/state/slices/transaction.slice";
import { formatDate, formatDateDistance } from "~/util/";

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

const OpenOrderAccountActivitiesHistory = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form"]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { activeCurrencies } = useCurrencies();
  const { histories = [] } = useSelector(state => state.transaction);
  const { lang } = useSelector(state => state.ui);
  const [apiError, setApiError] = useState("");

  const [validCurrencies, defaultValues] = useMemo(() => {
    const today = formatDate(new Date(), "yyyy-MM-dd", { locale: lang });
    const threeMonthsAgo = formatDate(
      sub(new Date(), { months: 3 }),
      "yyyy-MM-dd",
      { locale: lang }
    );
    const currencies = activeCurrencies.filter(
      ({ symbol }) => symbol !== "EUR"
    );
    const currencyids = currencies.map(({ id }) => Number(id));

    const defaults = {
      currencyids,
      orderby: 1,
      isdeposit: true,
      iswithdraw: true,
      isrealized: true,
      iscanceled: true,
      periodby: 5,
      startdate: threeMonthsAgo,
      enddate: today,
    };

    return [currencies, defaults];
  }, [activeCurrencies, lang]);

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
    const { currencyids, enddate, startdate, ...rest } = defaultValues;
    const toSubmit = {
      ...rest,
      currencyids: JSON.stringify(currencyids),
    };

    dispatch(fetchTransactionHistories(toSubmit));
  }, [defaultValues, dispatch]);

  const onSubmit = async data => {
    setApiError("");
    const { currencyids, periodby } = data;
    let toSubmit = { currencyids: JSON.stringify(currencyids) };

    if (periodby) {
      merge(toSubmit, omit(data, ["currencyids", "startdate", "enddate"]));
    } else {
      const startdate = formatDate(data?.startdate, "yyyy-MM-dd", {
        locale: lang,
      });
      const enddate = formatDate(data?.enddate, "yyyy-MM-dd", { locale: lang });

      merge(
        toSubmit,
        omit(data, ["currencyids", "periodby", "startdate", "enddate"]),
        { startdate, enddate }
      );
    }

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
    <div className="activities-history">
      <Form
        className="siteformui"
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
              size={2}
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
              className="d-none"
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
              type="date"
              bsSize="sm"
              title="Start Date"
              name="startdate"
              innerRef={register({
                valueAsDate: true,
              })}
            />
            <Input
              type="date"
              bsSize="sm"
              name="enddate"
              title="End Date"
              innerRef={register({
                valueAsDate: true,
              })}
            />
          </Col>
        </Row>
        <ButtonGroup xs="auto">
          <Button type="submit" size="sm" variant="outline-primary">
            Filtrele
          </Button>
          <Button size="sm" variant="outline-danger" onClick={onReset}>
            Sıfırla
          </Button>
        </ButtonGroup>
        {apiError && (
          <span style={{ color: "coral", fontSize: "1rem" }}>{apiError}</span>
        )}
      </Form>
      <div className="activitieshistorytable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="nmbr">
                İşlem No
              </Table.Th>
              <Table.Th sizeauto className="date">
                Tarih
              </Table.Th>
              <Table.Th sizeauto className="type">
                İşlem Tipi
              </Table.Th>
              <Table.Th sizeauto className="mthd">
                Yöntem
              </Table.Th>
              <Table.Th sizeauto className="bank">
                Banka
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                Miktar
              </Table.Th>
              <Table.Th sizeauto className="txid">
                Referans Kodu / TX ID
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
            {histories.map(
              ({
                amount,
                currencysymbol,
                datetime,
                id,
                request_type_id,
                requesttype,
                requst_method_id,
                requstmethod,
                status,
              }) => {
                const typecls = classnames({
                  sitecolorgreen: request_type_id === 1,
                  sitecolorred: request_type_id === 2,
                });

                const statuscls = classnames({
                  sitecolorgreen: status === 4,
                  sitecolorred: status === 5,
                });

                return (
                  <Table.Tr key={id}>
                    <Table.Td sizeauto className="nmbr">
                      {id}
                    </Table.Td>
                    <Table.Td sizeauto className="date">
                      <span title={datetime}>
                        {formatDateDistance(new Date(datetime), Date.now(), {
                          locale: lang,
                        })}
                      </span>
                    </Table.Td>
                    <Table.Td sizeauto className="type">
                      <span className={typecls}>{requesttype}</span>
                    </Table.Td>
                    <Table.Td sizeauto className="mthd">
                      {requstmethod}
                    </Table.Td>
                    <Table.Td sizeauto className="bank">
                      ---
                    </Table.Td>
                    <Table.Td sizefixed className="amnt">
                      {amount} {currencysymbol}
                    </Table.Td>
                    <Table.Td sizeauto className="txid">
                      ---
                    </Table.Td>
                    <Table.Td sizeauto className="stts">
                      <span className={statuscls}>{status}</span>
                    </Table.Td>
                  </Table.Tr>
                );
              }
            )}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default OpenOrderAccountActivitiesHistory;
