import { useMemo, useEffect } from "react";
import ChartistGraph from "react-chartist";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { merge } from "lodash";

import Table from "../Table.jsx";
import { fetchInitialOrderBook } from "~/state/slices/pair.slice";

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
  const {
    selected,
    fiatCurrency,
    cryptoCurrency,
    initialOrderBooks,
  } = useSelector(state => state.pair);
  const { accesstoken } = useSelector(state => state.api);
  const symbol = selected?.symbol?.toLowerCase?.();
  const eventKey = `${symbol}orderbook`;
  const { [eventKey]: bookData = {} } = useSelector(
    state => state.socket.orderbooks
  );
  const {
    buytotal = "",
    buyhighestprice = "",
    // difference = "",
    selltotal = "",
    selllowestprice = "",
    buyorders = [],
    sellorders = [],
  } = bookData;

  const { data: buyChartData, options: buyChartOptions } = useMemo(() => {
    const getTotal = arr => {
      return arr.reduce((acc, current) => {
        return acc + current?.amount || 0;
      }, 0);
    };
    const total = getTotal(buyorders);
    const series = buyorders.map((order, idx, array) => {
      const arr = array.slice(0, idx + 1);
      const cumulative = getTotal(arr);

      return (cumulative / total) * 100;
    });
    const options = merge(
      { reverseData: false },
      buyorders.length ? { height: `${buyorders.length * 16}px` } : {},
      chartOptions
    );

    return { data: { series: [series] }, options };
  }, [buyorders]);

  const { data: sellChartData, options: sellChartOptions } = useMemo(() => {
    const getTotal = arr => {
      return arr.reduce((acc, current) => {
        return acc + current?.total || 0;
      }, 0);
    };
    const total = getTotal(sellorders);
    const series = sellorders.map((order, idx, array) => {
      const arr = array.slice(0, idx + 1);
      const cumulative = getTotal(arr);

      return (cumulative / total) * 100;
    });
    const options = merge(
      { reverseData: true },
      sellorders.length ? { height: `${sellorders.length * 16}px` } : {},
      chartOptions
    );

    return { data: { series: [series] }, options };
  }, [sellorders]);

  useEffect(() => {
    const { name, symbol } = selected;

    if (accesstoken) {
      if (!initialOrderBooks.includes(symbol?.toLowerCase())) {
        dispatch(fetchInitialOrderBook(name));
      }
    }
  }, [accesstoken, selected, initialOrderBooks, dispatch]);

  return (
    <div className="mainbox mainbox-orderbook">
      <div className="orderbook">
        <div className="orderbook-head">
          <div className="orderbook-head-col buyside">
            <h4>{t("buyOrders")}</h4>
            <p>
              {t("common:total")}:{" "}
              <span className="sitecolorgreen">{`${buytotal} ${cryptoCurrency}`}</span>
            </p>
          </div>
          <div className="orderbook-head-col spreadside">
            <div className="spreadside-lr text-right">
              <p className="sitecolorgreen">{buyhighestprice}</p>
              <p>{t("common:high")}</p>
            </div>
            <div className="spreadside-df text-center">
              <p>{(buyhighestprice + selllowestprice) / 2}</p>
            </div>
            <div className="spreadside-lr text-left">
              <p className="sitecolorred">{selllowestprice}</p>
              <p>{t("common:low")}</p>
            </div>
          </div>
          <div className="orderbook-head-col sellside">
            <h4>{t("sellOrders")}</h4>
            <p>
              {t("common:total")}:{" "}
              <span className="sitecolorred">{`${selltotal} ${fiatCurrency}`}</span>
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
                    {buyorders.map(({ total, amount, price }, idx) => {
                      return (
                        <Table.Tr key={`${amount}_${idx}`}>
                          <Table.Td sizefixed className="totl">
                            {total}
                          </Table.Td>
                          <Table.Td sizefixed className="amnt">
                            {amount?.toFixed?.(8)}
                          </Table.Td>
                          <Table.Td sizefixed className="pric">
                            {price?.toFixed?.(2)}
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
                    {sellorders.map(({ total, amount, price }, idx) => {
                      return (
                        <Table.Tr key={`${amount}_${idx}`}>
                          <Table.Td sizefixed className="pric">
                            {price}
                          </Table.Td>
                          <Table.Td sizefixed className="amnt">
                            {amount?.toFixed?.(8)}
                          </Table.Td>
                          <Table.Td sizefixed className="totl">
                            {total?.toFixed?.(2)}
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

export default OrderBook;
