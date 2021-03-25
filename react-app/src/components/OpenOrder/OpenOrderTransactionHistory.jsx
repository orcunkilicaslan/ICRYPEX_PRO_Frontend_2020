import { useState, useMemo, useEffect } from "react";
import {
  Row,
  Col,
  Label,
  Input,
  ButtonGroup,
  Form,
  FormGroup, FormText,
} from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sub } from "date-fns";
import { omit, merge, groupBy } from "lodash";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { useClientRect, usePrices } from "~/state/hooks/";
import {
  fetchOrderHistory,
  toggleHideOthersHistory,
} from "~/state/slices/order.slice";
import { formatDate, formatDateDistance } from "~/util/";

import { setOpenModal } from "~/state/slices/ui.slice";
import OrderHistoryFilter from "~/components/modals/OrderHistoryFilter.jsx";
import DepositWithdrawalTermsModal from "~/components/modals/DepositWithdrawalTermsModal";

const orderBy = [
  "Önce Yeni Tarihli",
  "Önce Eski Tarihli",
  "Önce Alış",
  "Önce Satış",
  "Alfabetik",
];
const transactionTypes = [
  { label: "Alış", name: "isbuyorders" },
  { label: "Satış", name: "issellorders" },
  { label: "Tamamlandı", name: "isfilledorders" },
  { label: "İptal", name: "iscanceledorders" },
];
const periodBy = ["1G", "1H", "2H", "1A", "3A"];

const OpenOrderTransactionHistory = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "coinbar"]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const [apiError, setApiError] = useState("");
  const { lang } = useSelector(state => state.ui);
  const { allPairs, selectedPair } = usePrices();
  const orderSlice = useSelector(state => state.order);
  const orderHistory = orderSlice?.history || [];
  const isFetching = orderSlice?.isFetchingHistory;
  const hideOthers = orderSlice?.hideOthersHistory;

  const defaultValues = useMemo(() => {
    const today = formatDate(new Date(), "yyyy-MM-dd", { locale: lang });
    const threeMonthsAgo = formatDate(
      sub(new Date(), { months: 3 }),
      "yyyy-MM-dd",
      { locale: lang }
    );

    return {
      pairids: allPairs.map(({ id }) => Number(id)),
      orderby: 1,
      isbuyorders: true,
      issellorders: true,
      isfilledorders: true,
      iscanceledorders: true,
      periodby: 5,
      startdate: threeMonthsAgo,
      enddate: today,
      // startfrom: 0,
      // takecount: 20
    };
  }, [allPairs, lang]);

  const visibleOrders = useMemo(() => {
    if (!hideOthers) {
      return orderHistory;
    } else {
      const byPair = groupBy(orderHistory, ({ pairname }) => pairname);

      return byPair[selectedPair?.name] || [];
    }
  }, [hideOthers, orderHistory, selectedPair]);

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
    const { pairids, enddate, startdate, ...rest } = defaultValues;
    const toSubmit = {
      ...rest,
      pairids: JSON.stringify(pairids),
    };

    dispatch(fetchOrderHistory(toSubmit));
  }, [defaultValues, dispatch]);

  const onSubmit = async data => {
    setApiError("");
    const { pairids, periodby } = data;
    let toSubmit = { pairids: JSON.stringify(pairids?.map?.(Number)) };

    if (periodby) {
      merge(toSubmit, omit(data, ["pairids", "startdate", "enddate"]));
    } else {
      const startdate = formatDate(data?.startdate, "yyyy-MM-dd", {
        locale: lang,
      });
      const enddate = formatDate(data?.enddate, "yyyy-MM-dd", { locale: lang });

      merge(
        toSubmit,
        omit(data, ["pairids", "periodby", "startdate", "enddate"]),
        { startdate, enddate }
      );
    }

    const { payload } = await dispatch(fetchOrderHistory(toSubmit));

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

  const onToggleHideOthers = () => {
    dispatch(toggleHideOthersHistory());
  };

  const { openModal } = useSelector(state => state.ui);

  const openFiltersModal = () => {
    dispatch(setOpenModal("orderhistoryfilter"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  return (
    <div className="openorders-history">
      <Form
        className="siteformui"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >

        <Row className="tabcont tabcont-filterbar d-none">
          <Col>
            <Input
              className="custom-select custom-select-sm"
              type="select"
              multiple
              size={3}
              name="pairids"
              innerRef={register({
                required: t("isRequired"),
              })}
            >
              {allPairs.map(({ id, name, symbol }) => {
                return (
                  <option value={id} key={symbol}>
                    {name}
                  </option>
                );
              })}
            </Input>
            {errors.pairids && (
                <FormText className="inputresult resulterror">
                  {errors.pairids?.message}
                </FormText>
            )}
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
          <Col xs="auto">
            <div className="custom-control custom-checkbox">
              <Input
                className="custom-control-input"
                type="checkbox"
                id="ordersHistoryHideOtherPairs"
                checked={hideOthers}
                onChange={onToggleHideOthers}
              />
              <Label
                className="custom-control-label"
                htmlFor="ordersHistoryHideOtherPairs"
                check
              >
                {t("coinbar:hidePairs")}
              </Label>
            </div>
          </Col>
        </Row>

        <Row className="tabcont tabcont-filterbar">
          <Col xs="auto">
            <Button
                variant="secondary"
                size="sm"
                onClick={openFiltersModal}
            >
              İşlem Çiftleri
            </Button>
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
          <Col>
            <Input
                className="custom-select custom-select-sm"
                type="select"
            >
              {["İşlem Tipi", "Alış", "Satış"].map((el, idx) => {
                return (
                    <option value={idx + 1} key={`${el}_${idx}`}>
                      {el}
                    </option>
                );
              })}
            </Input>
          </Col>
          <Col>
            <Input
                className="custom-select custom-select-sm"
                type="select"
            >
              {["Durumu", "Tamamlandı", "İptal"].map((el, idx) => {
                return (
                    <option value={idx + 1} key={`${el}_${idx}`}>
                      {el}
                    </option>
                );
              })}
            </Input>
          </Col>
          <Col xs="auto">
            <div className="custom-control custom-checkbox mb-0">
              <Input
                  className="custom-control-input"
                  type="checkbox"
                  id="ordersHistoryHideOtherPairs"
                  checked={hideOthers}
                  onChange={onToggleHideOthers}
              />
              <Label
                  className="custom-control-label"
                  htmlFor="ordersHistoryHideOtherPairs"
                  check
              >
                {t("coinbar:hidePairs")}
              </Label>
            </div>
          </Col>
          <Col xs="auto" className="d-none">
            <ButtonGroup>
              <Button
                  variant="outline-primary"
                  size="sm"
                  type="submit"
                  disabled={isFetching}
              >
                Filtrele
              </Button>
              <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={onReset}
              >
                Sıfırla
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        {apiError && (
          <span style={{ color: "coral", fontSize: "1rem" }}>{apiError}</span>
        )}
      </Form>
      <OrderHistoryFilter
          isOpen={openModal === "orderhistoryfilter"}
          clearModals={clearOpenModals}
      />
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
            {visibleOrders.map(
              ({
                buying_amount,
                buying_currency_id,
                buyingcurrency,
                commission,
                created_at,
                customer_group_id,
                id,
                market_price,
                order_side_id,
                order_status_id,
                order_type_id,
                orderside,
                orderstatus,
                ordertype,
                pairname,
                price,
                selling_amount,
                selling_currency_id,
                sellingcurrency,
                status,
                stop_price,
                updated_amount,
                updated_at,
                updated_commission,
              }) => {
                const cls1 = classnames({
                  sitecolorgreen: order_side_id === 1,
                  sitecolorred: order_side_id !== 1,
                });

                const cls2 = classnames({
                  sitecolorgreen: order_status_id === 1,
                  sitecolorred: order_status_id !== 1,
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
                        {id}
                      </Table.Td>
                      <Table.Td sizeauto className="date">
                        <span title={updated_at}>
                          {formatDateDistance(
                            new Date(updated_at),
                            Date.now(),
                            {
                              locale: lang,
                            }
                          )}
                        </span>
                      </Table.Td>
                      <Table.Td sizeauto className="symb">
                        {pairname}
                      </Table.Td>
                      <Table.Td sizeauto className="type">
                        {ordertype} - <span className={cls1}>{orderside}</span>
                      </Table.Td>
                      <Table.Td sizefixed className="avrg">
                        ----
                      </Table.Td>
                      <Table.Td sizefixed className="pric">
                        {price} {sellingcurrency}
                      </Table.Td>
                      <Table.Td sizefixed className="hppn">
                        {buying_amount} {buyingcurrency}
                      </Table.Td>
                      <Table.Td sizefixed className="amnt">
                        {buying_amount} {buyingcurrency}
                      </Table.Td>
                      <Table.Td sizefixed className="totl">
                        ---
                      </Table.Td>
                      <Table.Td sizeauto className="comm">
                        {commission} {sellingcurrency}
                      </Table.Td>
                      <Table.Td sizeauto className="stts">
                        <span className={cls2}>{orderstatus}</span>
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
