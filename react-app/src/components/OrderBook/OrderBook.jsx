import ChartistGraph from "react-chartist";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Table from "../Table.jsx";

const orderbookbuydata = {
  series: [[1, 2, 3, 4, 5, 7, 9, 11, 12, 13, 15, 18]],
};

const orderbookselldata = {
  series: [[18, 15, 13, 12, 11, 9, 7, 5, 4, 3, 2, 1]],
};

const orderbookchartoptions = {
  reverseData: false,
  horizontalBars: true,
  fullWidth: true,
  axisX: {
    offset: 0,
  },
  axisY: {
    offset: 0,
  },
  chartPadding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

const orderbookcharttype = "Bar";

const OrderBook = props => {
  const { t } = useTranslation(["finance", "orderbook", "common"]);
  const { selected, fiatCurrency, cryptoCurrency } = useSelector(
    state => state.pair
  );
  const symbol = selected?.symbol?.toLowerCase?.();
  const eventKey = `${symbol}orderbook`;
  const { [eventKey]: bookData = {} } = useSelector(state => state.socket);
  const {
    buytotal = "",
    buyhighestprice = "",
    // difference = "",
    selltotal = "",
    selllowestprice = "",
    buyorders = [],
    sellorders = [],
  } = bookData;

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
              <p>{((buyhighestprice + selllowestprice) / 2)}</p>
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
                  data={orderbookbuydata}
                  options={orderbookchartoptions}
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
                            {amount}
                          </Table.Td>
                          <Table.Td sizefixed className="pric">
                            {price}
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
                  data={orderbookselldata}
                  options={orderbookchartoptions}
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
                            {amount}
                          </Table.Td>
                          <Table.Td sizefixed className="totl">
                            {total}
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
