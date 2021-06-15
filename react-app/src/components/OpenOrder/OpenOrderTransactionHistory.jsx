import { useState, useMemo, useEffect, memo } from "react";
import { Row, Col, Label, Input, Form } from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { sub, isWithinInterval } from "date-fns";
import { groupBy } from "lodash";
import NumberFormat from "react-number-format";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { useClientRect, usePrices, useCurrencies } from "~/state/hooks/";
import {
  fetchOrderHistory,
  toggleHideOthersHistory,
} from "~/state/slices/order.slice";
import { setOpenModal } from "~/state/slices/ui.slice";
import OrderHistoryFilter from "~/components/modals/OrderHistoryFilter.jsx";
import { formatDate, formatDateDistance } from "~/util/";
import ButtonGroupRadio from "~/components/ButtonGroupRadio";
import CustomSelect from "~/components/CustomSelect";
import { periodBy } from "./OpenOrder";

const OpenOrderTransactionHistory = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation([
    "form",
    "coinbar",
    "finance",
    "app",
    "common",
    "openorder",
  ]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { lang } = useSelector(state => state.ui);
  const { allPairs, selectedPair } = usePrices();
  const { findCurrencyBySymbol } = useCurrencies();
  const { openModal } = useSelector(state => state.ui);
  const orderSides = useSelector(state => state.api.settings?.orderSides);
  const orderStatuses = useSelector(state => state.api.settings?.orderStatuses);
  const orderSlice = useSelector(state => state.order);
  const [orderStatusIdx, setOrderStatusIdx] = useState(-1);
  const [ordersideIdx, setOrdersideIdx] = useState(-1);

  const orderHistory = orderSlice?.history;
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
      pairids: [],
      orderby: 0,
      isbuyorders: true,
      issellorders: true,
      isfilledorders: true,
      iscanceledorders: true,
      startdate: threeMonthsAgo,
      enddate: today,
      // startfrom: 0,
      // takecount: 20
    };
  }, [lang]);
  const [periodbyIndex, setPeriodbyIndex] = useState(0);
  const visibleOrders = useMemo(() => {
    let orders = orderHistory;
    const interval = periodBy[periodbyIndex]?.duration;
    const statusIdx = parseInt(orderStatusIdx, 10);
    const sideIdx = parseInt(ordersideIdx, 10);

    if (statusIdx !== -1) {
      orders = orders?.filter?.(
        ({ order_status_id }) => order_status_id === statusIdx
      );
    }

    if (sideIdx !== -1) {
      orders = orders?.filter?.(
        ({ order_side_id }) => order_side_id === sideIdx
      );
    }

    if (interval) {
      orders = orders?.filter?.(({ updated_at }) => {
        return isWithinInterval(new Date(updated_at), {
          start: sub(new Date(), interval),
          end: new Date(),
        });
      });
    }

    if (!hideOthers) {
      return orders;
    } else {
      const byPair = groupBy(orders, ({ pairname }) => pairname);

      return byPair[selectedPair?.name] || [];
    }
  }, [
    orderHistory,
    periodbyIndex,
    orderStatusIdx,
    ordersideIdx,
    hideOthers,
    selectedPair,
  ]);

  useEffect(() => {
    const pairids = allPairs.map(({ id }) => Number(id));
    const toSubmit = {
      ...defaultValues,
      pairids: JSON.stringify(pairids),
      orderby: 1,
    };

    dispatch(fetchOrderHistory(toSubmit));
  }, [allPairs, defaultValues, dispatch]);

  const onToggleHideOthers = () => {
    dispatch(toggleHideOthersHistory());
  };

  const openFiltersModal = () => {
    dispatch(setOpenModal("orderhistoryfilter"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  return (
    <div className="openorders-history">
      <Form className="siteformui" autoComplete="off" noValidate>
        <Row className="tabcont tabcont-filterbar">
          <Col xs="auto">
            <Button variant="secondary" size="sm" onClick={openFiltersModal}>
              {t("openorder:tradePairs")}
            </Button>
          </Col>
          <Col sm="2">
            <CustomSelect
              size="sm"
              list={orderSides}
              title={t("openorder:tradeType")}
              index={ordersideIdx}
              setIndex={setOrdersideIdx}
            />
          </Col>
          <Col>
            <ButtonGroupRadio
              list={periodBy}
              index={periodbyIndex}
              setIndex={setPeriodbyIndex}
            />
          </Col>
          <Col>
            <CustomSelect
              size="sm"
              list={orderStatuses}
              namespace="app"
              title={t("openorder:tradeStatus")}
              index={orderStatusIdx}
              setIndex={setOrderStatusIdx}
            />
          </Col>
          <Col xs="auto" style={{ marginLeft: "auto" }}>
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
        </Row>
      </Form>
      <div className="ootransactionhistorytable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="brws" />
              <Table.Th sizeauto className="nmbr">
                {t("openorder:tradeNo")}
              </Table.Th>
              <Table.Th sizeauto className="date">
                {t("common:date")}
              </Table.Th>
              <Table.Th sizeauto className="symb">
                {t("common:pair")}
              </Table.Th>
              <Table.Th sizeauto className="type">
                {t("openorder:tradeType")}
              </Table.Th>
              <Table.Th sizefixed className="avrg">
                {t("common:average")}
              </Table.Th>
              <Table.Th sizefixed className="pric">
                {t("common:price")}
              </Table.Th>
              <Table.Th sizefixed className="hppn">
                {t("finance:realized")}
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                {t("common:amount")}
              </Table.Th>
              <Table.Th sizefixed className="totl">
                {t("common:total")}
              </Table.Th>
              <Table.Th sizeauto className="comm">
                {t("common:commission")}
              </Table.Th>
              <Table.Th sizeauto className="stts">
                {t("common:status")}
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
                const isBuyOrder = order_side_id === 1;
                const cls1 = classnames({
                  sitecolorgreen: isBuyOrder,
                  sitecolorred: !isBuyOrder,
                });
                const cls2 = classnames({
                  sitecolorgreen: order_status_id === 1,
                  sitecolorred: order_status_id !== 1,
                });
                const buyCurrency = findCurrencyBySymbol(buyingcurrency);
                const sellCurrency = findCurrencyBySymbol(sellingcurrency);
                const buyDigit = buyCurrency?.digit_show || buyCurrency?.digit;
                const sellDigit =
                  sellCurrency?.digit_show || sellCurrency?.digit;

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
                            { locale: lang }
                          )}
                        </span>
                      </Table.Td>
                      <Table.Td sizeauto className="symb">
                        {pairname}
                      </Table.Td>
                      <Table.Td sizeauto className="type">
                        {ordertype} -{" "}
                        <span className={cls1}>
                          {t(`openorder:orderSide${order_side_id}`)}
                        </span>
                      </Table.Td>
                      <Table.Td sizefixed className="avrg">
                        ----
                      </Table.Td>
                      <Table.Td sizefixed className="pric" title={price}>
                        <NumberFormat
                          value={price}
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={isBuyOrder ? sellDigit : buyDigit}
                          fixedDecimalScale
                          suffix={` ${
                            isBuyOrder ? sellingcurrency : buyingcurrency
                          }`}
                        />
                      </Table.Td>
                      <Table.Td
                        sizefixed
                        className="hppn"
                        title={isBuyOrder ? selling_amount : buying_amount}
                      >
                        <NumberFormat
                          value={isBuyOrder ? selling_amount : buying_amount}
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={isBuyOrder ? sellDigit : buyDigit}
                          fixedDecimalScale
                          suffix={` ${
                            isBuyOrder ? sellingcurrency : buyingcurrency
                          }`}
                        />
                      </Table.Td>
                      <Table.Td
                        sizefixed
                        className="amnt"
                        title={isBuyOrder ? buying_amount : selling_amount}
                      >
                        <NumberFormat
                          value={isBuyOrder ? buying_amount : selling_amount}
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={isBuyOrder ? buyDigit : sellDigit}
                          fixedDecimalScale
                          suffix={` ${
                            isBuyOrder ? buyingcurrency : sellingcurrency
                          }`}
                        />
                      </Table.Td>
                      <Table.Td sizefixed className="totl">
                        ---
                      </Table.Td>
                      <Table.Td sizeauto className="comm" title={commission}>
                        <NumberFormat
                          value={commission}
                          displayType={"text"}
                          thousandSeparator={true}
                          decimalScale={isBuyOrder ? sellDigit : buyDigit}
                          fixedDecimalScale
                          suffix={` ${
                            isBuyOrder ? sellingcurrency : buyingcurrency
                          }`}
                        />
                      </Table.Td>
                      <Table.Td sizeauto className="stts">
                        <span className={cls2}>
                          {t(`openorder:orderStatus${order_status_id}`)}
                        </span>
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
      <OrderHistoryFilter
        isOpen={openModal === "orderhistoryfilter"}
        clearModals={clearOpenModals}
        defaultValues={defaultValues}
        isFetching={isFetching}
      />
    </div>
  );
};

export default memo(OpenOrderTransactionHistory);
