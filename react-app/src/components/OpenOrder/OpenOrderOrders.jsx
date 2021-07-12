import { useState, useCallback, useMemo, useEffect, memo } from "react";
import { Row, Col, Label, Input, Form } from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { groupBy } from "lodash";
import NumberFormat from "react-number-format";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { useClientRect, usePrices, useCurrencies } from "~/state/hooks/";
import {
  fetchOpenOrders,
  toggleHideOthersOpen,
  deleteOpenOrder,
} from "~/state/slices/order.slice";
import { formatDateDistance } from "~/util/";
import { setOpenModal } from "~/state/slices/ui.slice";
import { OrderOpenOrdersFilter, ConfirmModal } from "~/components/modals/";
import CustomSelect from "~/components/CustomSelect";

const defaultValues = {
  pairids: [],
  orderby: 0,
  isbuyorders: true,
  issellorders: true,
  // startfrom: 0,
  // takecount: 20
};

const OpenOrderOrders = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation([
    "form",
    "coinbar",
    "openorder",
    "common",
    "finance",
  ]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { lang, openModal } = useSelector(state => state.ui);
  const orderSides = useSelector(state => state.api.settings?.orderSides);
  const orderSlice = useSelector(state => state.order);
  const { allPairs, selectedPair } = usePrices();
  const { findCurrencyBySymbol } = useCurrencies();
  const [ordersideIdx, setOrdersideIdx] = useState(-1);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const isFetching = orderSlice?.isFetchingOpen;
  const hideOthers = orderSlice?.hideOthersOpen;
  const openOrders = useMemo(() => orderSlice?.open || [], [orderSlice]);

  const visibleOrders = useMemo(() => {
    let orders = openOrders;
    const sideIdx = parseInt(ordersideIdx, 10);

    if (sideIdx !== -1) {
      orders = orders?.filter?.(
        ({ order_side_id }) => order_side_id === sideIdx
      );
    }

    if (!hideOthers) {
      return orders;
    } else {
      const byPair = groupBy(orders, ({ pairname }) => pairname);

      return byPair[selectedPair?.name] || [];
    }
  }, [openOrders, ordersideIdx, hideOthers, selectedPair?.name]);

  useEffect(() => {
    const pairids = allPairs.map(({ id }) => Number(id));
    const toSubmit = {
      ...defaultValues,
      pairids: JSON.stringify(pairids),
      orderby: 1,
    };

    dispatch(fetchOpenOrders(toSubmit));
  }, [allPairs, dispatch]);

  const onToggleHideOthers = useCallback(() => {
    dispatch(toggleHideOthersOpen());
  }, [dispatch]);

  const onDelete = useCallback(async () => {
    if (!deleteOrderId && typeof deleteOrderId === "number") return;

    const { payload } = await dispatch(deleteOpenOrder(deleteOrderId));

    if (payload.status) {
      setDeleteSuccess(payload.description);
    } else {
      setDeleteError(payload.errormessage);
    }
  }, [deleteOrderId, dispatch]);

  const openDeleteOrderConfirmModal = useCallback(() => {
    dispatch(setOpenModal("deleteorderconfirm"));
  }, [dispatch]);

  const openFiltersModal = useCallback(() => {
    dispatch(setOpenModal("orderopenordersfilter"));
  }, [dispatch]);

  const clearOpenModals = useCallback(() => {
    dispatch(setOpenModal("none"));
    setDeleteOrderId(null);
    setDeleteError(false);
    setDeleteSuccess(false);
  }, [dispatch]);

  return (
    <div className="openorders-orders">
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
              namespace="openorder"
              useID
              prefix="orderSide"
            />
          </Col>
          <Col xs="auto" style={{ marginLeft: "auto" }}>
            <div className="custom-control custom-checkbox mb-0">
              <Input
                className="custom-control-input"
                type="checkbox"
                id="ordersOpenHideOtherPairs"
                checked={hideOthers}
                onChange={onToggleHideOthers}
              />
              <Label
                className="custom-control-label"
                htmlFor="ordersOpenHideOtherPairs"
                check
              >
                {t("coinbar:hidePairs")}
              </Label>
            </div>
          </Col>
        </Row>
      </Form>
      <div className="ooopenorderstable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="symb">
                {t("common:pair")}
              </Table.Th>
              <Table.Th sizeauto className="date">
                {t("common:date")}
              </Table.Th>
              <Table.Th sizefixed className="type">
                {t("openorder:tradeType")}
              </Table.Th>
              <Table.Th sizefixed className="pric">
                {t("common:price")}
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                {t("common:amount")}
              </Table.Th>
              <Table.Th sizefixed className="hppn">
                {t("finance:realized")}
              </Table.Th>
              <Table.Th sizeauto className="bttn" />
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
                order_type_id,
                orderside,
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
                const cls = classnames({
                  sitecolorgreen: isBuyOrder,
                  sitecolorred: !isBuyOrder,
                });
                const buyCurrency = findCurrencyBySymbol(buyingcurrency);
                const sellCurrency = findCurrencyBySymbol(sellingcurrency);
                const buyDigit = buyCurrency?.digit_show || buyCurrency?.digit;
                const sellDigit =
                  sellCurrency?.digit_show || sellCurrency?.digit;

                return (
                  <Table.Tr key={id}>
                    <Table.Td sizeauto className="symb">
                      {pairname.replace(/\s/g, "")}
                    </Table.Td>
                    <Table.Td sizeauto className="date">
                      <span title={updated_at}>
                        {formatDateDistance(new Date(updated_at), Date.now(), {
                          locale: lang,
                        })}
                      </span>
                    </Table.Td>
                    <Table.Td sizefixed className="type">
                      {ordertype} -{" "}
                      <span className={cls}>
                        {t(`openorder:orderSide${order_side_id}`)}
                      </span>
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
                    <Table.Td sizeauto className="bttn">
                      <Button className="d-none">
                        <IconSet sprite="sprtsmclrd" size="14" name="edit" />
                      </Button>
                      <Button
                        onClick={() => {
                          setDeleteOrderId(id);
                          openDeleteOrderConfirmModal();
                        }}
                      >
                        <IconSet
                          sprite="sprtsmclrd"
                          size="14"
                          name="delete"
                          data-toggle="modal"
                          data-target="#ooModalDeleteOrder"
                        />
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                );
              }
            )}
          </Table.Tbody>
        </Table>
      </div>
      <OrderOpenOrdersFilter
        isOpen={openModal === "orderopenordersfilter"}
        clearModals={clearOpenModals}
        defaultValues={defaultValues}
        isFetching={isFetching}
      />
      <ConfirmModal
        isOpen={openModal === "deleteorderconfirm"}
        clearModals={clearOpenModals}
        onConfirm={onDelete}
        confirmMessage={t("finance:orderDeleteConfirm")}
        successMessage={deleteSuccess}
        errorMessage={deleteError}
      />
    </div>
  );
};

export default memo(OpenOrderOrders);
