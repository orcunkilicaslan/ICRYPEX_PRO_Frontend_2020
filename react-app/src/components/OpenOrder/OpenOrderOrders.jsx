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
import { groupBy } from "lodash";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { useClientRect, usePrices } from "~/state/hooks";
import {
  fetchOpenOrders,
  toggleHideOthersOpen,
} from "~/state/slices/order.slice";
import { formatDateDistance } from "~/util/";

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
];

const OpenOrderOrders = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "coinbar"]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const [apiError, setApiError] = useState("");
  const { lang } = useSelector(state => state.ui);
  const { allPairs, selectedPair } = usePrices();
  const orderSlice = useSelector(state => state.order);
  const openOrders = orderSlice?.open || [];
  const isFetching = orderSlice?.isFetchingOpen;
  const hideOthers = orderSlice?.hideOthersOpen;

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
    if (!hideOthers) {
      return openOrders;
    } else {
      const byPair = groupBy(openOrders, ({ pairname }) => pairname);

      return byPair[selectedPair?.name] || [];
    }
  }, [hideOthers, openOrders, selectedPair]);

  const { register, handleSubmit, errors, reset, clearErrors } = useForm({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    const toSubmit = {
      ...defaultValues,
      pairids: JSON.stringify(defaultValues?.pairids?.map?.(Number)),
    };

    dispatch(fetchOpenOrders(toSubmit));
  }, [defaultValues, dispatch]);

  const onSubmit = async data => {
    setApiError("");
    const toSubmit = {
      ...data,
      pairids: JSON.stringify(data?.pairids?.map?.(Number)),
    };

    const { payload } = await dispatch(fetchOpenOrders(toSubmit));

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
    dispatch(toggleHideOthersOpen());
  };

  return (
    <div className="openorders-orders">
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
          <Col xs="auto">
            <div className="custom-control custom-checkbox">
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
        <ButtonGroup>
          <Button
            variant="secondary"
            className="w-100 active"
            type="submit"
            disabled={isFetching}
          >
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
                      <Button type="button">
                        <IconSet sprite="sprtsmclrd" size="14" name="edit" />
                      </Button>
                      <Button type="button">
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
    </div>
  );
};

export default OpenOrderOrders;
