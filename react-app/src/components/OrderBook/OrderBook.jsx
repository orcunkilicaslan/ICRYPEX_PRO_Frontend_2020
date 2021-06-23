import { useMemo, useEffect, memo } from "react";
import ChartistGraph from "react-chartist";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { merge, take } from "lodash";
import { nanoid } from "nanoid";
import NumberFormat from "react-number-format";

import Table from "../Table.jsx";
import { fetchInitialOrderBook } from "~/state/slices/pair.slice";
import { setSelectedOrder } from "~/state/slices/order.slice";
import { usePrices, useCurrencies } from "~/state/hooks/";
import { getPairPrefix } from "~/util/";

const orderbookcharttype = "Bar";
const chartOptions = {
  horizontalBars: true,
  fullWidth: true,
  axisY: {
    showGrid: false,
    offset: 0,
    showLabel: false,
  },
  axisX: {
    showGrid: false,
    offset: 0,
    showLabel: false,
  },
  chartPadding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

const OrderBook = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["finance", "orderbook", "common"]);
  const { selectedPair } = usePrices();
  const { selectedFiatCurrency, selectedCryptoCurrency } = useCurrencies();
  const orderbooks = useSelector(state => state.socket.orderbooks);
  const fiatDigit =
    selectedFiatCurrency?.digit_show || selectedFiatCurrency?.digit;
  const cryptoDigit =
    selectedCryptoCurrency?.digit_show || selectedCryptoCurrency?.digit;

  const prefix = getPairPrefix(selectedPair?.name);
  const eventKey = `${prefix}orderbook`;
  const bookData = orderbooks?.[eventKey] || {};
  const {
    buytotal = "",
    buyhighestprice = "",
    // difference = "",
    selltotal = "",
    selllowestprice = "",
    buyorders = [],
    sellorders = [],
  } = bookData;

  const visibleSellOrders = take(sellorders, 12);
  const visibleBuyOrders = take(buyorders, 12);

  const { data: buyChartData, options: buyChartOptions } = useMemo(() => {
    const getTotal = arr => {
      return arr.reduce((acc, current) => {
        return acc + current?.amount || 0;
      }, 0);
    };
    const total = getTotal(visibleBuyOrders);
    const series = visibleBuyOrders.map((order, idx, array) => {
      const arr = array.slice(0, idx + 1);
      const cumulative = getTotal(arr);

      return (cumulative / total) * 100;
    });
    const options = merge(
      { reverseData: false },
      visibleBuyOrders.length
        ? { height: `${visibleBuyOrders.length * 16}px` }
        : {},
      chartOptions
    );

    return { data: { series: [series] }, options };
  }, [visibleBuyOrders]);

  const { data: sellChartData, options: sellChartOptions } = useMemo(() => {
    const getTotal = arr => {
      return arr.reduce((acc, current) => {
        return acc + current?.total || 0;
      }, 0);
    };
    const total = getTotal(visibleSellOrders);
    const series = visibleSellOrders.map((order, idx, array) => {
      const arr = array.slice(0, idx + 1);
      const cumulative = getTotal(arr);

      return (cumulative / total) * 100;
    });
    const options = merge(
      { reverseData: true },
      visibleSellOrders.length
        ? { height: `${visibleSellOrders.length * 16}px` }
        : {},
      chartOptions
    );

    return { data: { series: [series] }, options };
  }, [visibleSellOrders]);

  useEffect(() => {
    const name = selectedPair?.name;

    if (name) {
      dispatch(fetchInitialOrderBook(name));
    }
  }, [selectedPair, dispatch]);

  const onSelectOrder = (data) => {
    dispatch(setSelectedOrder(data))
  };

  return (
    <div className="mainbox mainbox-orderbook">
      <div className="orderbook">
        <div className="orderbook-head">
          <div className="orderbook-head-col buyside">
            <h4>{t("buyOrders")}</h4>
            <p>
              {t("common:total")}:{" "}
              <span className="sitecolorgreen" title={buytotal}>
                <NumberFormat
                  value={buytotal}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={cryptoDigit}
                  fixedDecimalScale
                  suffix={` ${selectedCryptoCurrency?.symbol}`}
                />
              </span>
            </p>
          </div>
          <div className="orderbook-head-col spreadside">
            <div className="spreadside-lr text-right">
              <p className="sitecolorgreen">
                <NumberFormat
                  value={buyhighestprice}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={fiatDigit}
                  fixedDecimalScale
                />
              </p>
              <p>{t("common:high")}</p>
            </div>
            <div className="spreadside-df text-center">
              <p>
                <NumberFormat
                  value={(buyhighestprice + selllowestprice) / 2}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={fiatDigit}
                  fixedDecimalScale
                />
              </p>
            </div>
            <div className="spreadside-lr text-left">
              <p className="sitecolorred">
                <NumberFormat
                  value={selllowestprice}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={fiatDigit}
                  fixedDecimalScale
                />
              </p>
              <p>{t("common:low")}</p>
            </div>
          </div>
          <div className="orderbook-head-col sellside">
            <h4>{t("sellOrders")}</h4>
            <p>
              {t("common:total")}:{" "}
              <span className="sitecolorred" title={selltotal}>
                <NumberFormat
                  value={selltotal}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={fiatDigit}
                  fixedDecimalScale
                  suffix={` ${selectedFiatCurrency?.symbol}`}
                />
              </span>
            </p>
          </div>
        </div>
        <div className="orderbook-chartbox row">
          <div className="col chartbuy">
            <div className="orderbook-chartarea">
              <div className="orderbook-chartarea-rectangle">
                <ChartistGraph
                  className="orderbookchart orderbookchartbuy"
                  data={buyChartData}
                  options={buyChartOptions}
                  type={orderbookcharttype}
                />
              </div>
              <div className="orderbook-chartarea-ordertable">
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th sizefixed className="totl">
                        {t("common:total")}
                      </Table.Th>
                      <Table.Th sizefixed className="amnt">
                        {t("common:amount")}
                      </Table.Th>
                      <Table.Th sizefixed className="pric">
                        {t("common:price")}
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {visibleBuyOrders.map(({ total, amount, price }, idx) => {
                      return (
                        <Table.Tr key={nanoid()} onClick={() => onSelectOrder({type: 'buy', data: visibleBuyOrders.slice(0, idx + 1)})}>
                          <Table.Td sizefixed className="totl" title={total}>
                            <NumberFormat
                              value={total}
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={fiatDigit}
                              fixedDecimalScale
                            />
                          </Table.Td>
                          <Table.Td sizefixed className="amnt" title={amount}>
                            <NumberFormat
                              value={amount}
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={cryptoDigit}
                              fixedDecimalScale
                            />
                          </Table.Td>
                          <Table.Td sizefixed className="pric" title={price}>
                            <NumberFormat
                              value={price}
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={fiatDigit}
                              fixedDecimalScale
                            />
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="col chartsell">
            <div className="orderbook-chartarea">
              <div className="orderbook-chartarea-rectangle">
                <ChartistGraph
                  className="orderbookchart orderbookchartsell"
                  data={sellChartData}
                  options={sellChartOptions}
                  type={orderbookcharttype}
                />
              </div>
              <div className="orderbook-chartarea-ordertable">
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th sizefixed className="pric">
                        {t("common:price")}
                      </Table.Th>
                      <Table.Th sizefixed className="amnt">
                        {t("common:amount")}
                      </Table.Th>
                      <Table.Th sizefixed className="totl">
                        {t("common:total")}
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {visibleSellOrders.map(({ total, amount, price }, idx) => {
                      return (
                        <Table.Tr key={nanoid()} onClick={() => onSelectOrder({type: 'sell', data: visibleSellOrders.slice(0, idx + 1)})}>
                          <Table.Td sizefixed className="pric" title={price}>
                            <NumberFormat
                              value={price}
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={fiatDigit}
                              fixedDecimalScale
                            />
                          </Table.Td>
                          <Table.Td sizefixed className="amnt" title={amount}>
                            <NumberFormat
                              value={amount}
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={cryptoDigit}
                              fixedDecimalScale
                            />
                          </Table.Td>
                          <Table.Td sizefixed className="totl" title={total}>
                            <NumberFormat
                              value={total}
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={fiatDigit}
                              fixedDecimalScale
                            />
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OrderBook);
