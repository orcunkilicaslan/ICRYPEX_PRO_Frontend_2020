import { useState, useCallback, useMemo, useEffect, memo } from "react";
import { Row, Col, Label, Input, Form } from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { groupBy } from "lodash";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { useClientRect, usePrices } from "~/state/hooks/";
import {
  fetchOpenOrders,
  toggleHideOthersOpen,
  deleteOpenOrder,
} from "~/state/slices/order.slice";
import { formatDateDistance, isBitOn } from "~/util/";
import { setOpenModal } from "~/state/slices/ui.slice";
import { OrderOpenOrdersFilter } from "~/components/modals/";
import ButtonGroupCheckbox from "~/components/ButtonGroupCheckbox";

const OpenOrderOrders = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "coinbar"]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { lang, openModal } = useSelector(state => state.ui);
  const orderSides = useSelector(state => state.api.settings?.orderSides);
  const orderSlice = useSelector(state => state.order);
  const { allPairs, selectedPair } = usePrices();
  const [ordersideMask, setOrdersideMask] = useState(null);

  const isFetching = orderSlice?.isFetchingOpen;
  const hideOthers = orderSlice?.hideOthersOpen;
  const openOrders = useMemo(() => orderSlice?.open || [], [orderSlice]);

  const defaultValues = useMemo(() => {
    return {
      pairids: allPairs.map(({ id }) => Number(id)),
      orderby: 1,
      isbuyorders: true,
      issellorders: true,
      // startfrom: 0,
      // takecount: 20
    };
  }, [allPairs]);

  const visibleOrders = useMemo(() => {
    let orders = openOrders;

    if (ordersideMask) {
      // 0th index is buyorders - 1st index is sellorders
      const isBuyOn = isBitOn(ordersideMask, 0);
      const isSellOn = isBitOn(ordersideMask, 1);

      orders = openOrders.filter(({ order_side_id }) => {
        switch (order_side_id) {
          case 1:
            return isBuyOn;
          case 2:
            return isSellOn;
          default:
            return true;
        }
      });
    }

    if (!hideOthers) {
      return orders;
    } else {
      const byPair = groupBy(orders, ({ pairname }) => pairname);

      return byPair[selectedPair?.name] || [];
    }
  }, [hideOthers, openOrders, selectedPair, ordersideMask]);

  useEffect(() => {
    const toSubmit = {
      ...defaultValues,
      pairids: JSON.stringify(defaultValues?.pairids?.map?.(Number)),
    };

    dispatch(fetchOpenOrders(toSubmit));
  }, [defaultValues, dispatch]);

  const onToggleHideOthers = useCallback(() => {
    dispatch(toggleHideOthersOpen());
  }, [dispatch]);

  const onDelete = useCallback(id => dispatch(deleteOpenOrder(id)), [dispatch]);

  const openFiltersModal = useCallback(() => {
    dispatch(setOpenModal("orderopenordersfilter"));
  }, [dispatch]);

  const clearOpenModals = useCallback(() => {
    dispatch(setOpenModal("none"));
  }, [dispatch]);

  return (
    <div className="openorders-orders">
      <Form className="siteformui" autoComplete="off" noValidate>
        <Row className="tabcont tabcont-filterbar">
          <Col xs="auto">
            <Button variant="secondary" size="sm" onClick={openFiltersModal}>
              İşlem Çiftleri
            </Button>
          </Col>
          <Col sm="2">
            <ButtonGroupCheckbox
              list={orderSides}
              mask={ordersideMask}
              setMask={setOrdersideMask}
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
                Çift
              </Table.Th>
              <Table.Th sizeauto className="date">
                Tarih
              </Table.Th>
              <Table.Th sizefixed className="type">
                İşlem Tipi
              </Table.Th>
              <Table.Th sizefixed className="pric">
                Fiyat
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                Miktar
              </Table.Th>
              <Table.Th sizefixed className="hppn">
                Gerçekleşen
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
                const cls = classnames({
                  sitecolorgreen: order_side_id === 1,
                  sitecolorred: order_side_id !== 1,
                });

                return (
                  <Table.Tr key={id}>
                    <Table.Td sizeauto className="symb">
                      {pairname}
                    </Table.Td>
                    <Table.Td sizeauto className="date">
                      <span title={updated_at}>
                        {formatDateDistance(new Date(updated_at), Date.now(), {
                          locale: lang,
                        })}
                      </span>
                    </Table.Td>
                    <Table.Td sizefixed className="type">
                      {ordertype} - <span className={cls}>{orderside}</span>
                    </Table.Td>
                    <Table.Td sizefixed className="pric">
                      {price} {buyingcurrency}
                    </Table.Td>
                    <Table.Td sizefixed className="amnt">
                      {buying_amount} {buyingcurrency}
                    </Table.Td>
                    <Table.Td sizefixed className="hppn">
                      {selling_amount} {sellingcurrency}
                    </Table.Td>
                    <Table.Td sizeauto className="bttn">
                      <Button>
                        <IconSet sprite="sprtsmclrd" size="14" name="edit" />
                      </Button>
                      <Button onClick={() => onDelete(id)}>
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
    </div>
  );
};

export default memo(OpenOrderOrders);
