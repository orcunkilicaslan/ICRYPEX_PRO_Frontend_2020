import { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";

import Table from "../Table.jsx";
import { formatDateDistance, getPairPrefix } from "~/util/";
import { useClientRect, usePrices, useCurrencies } from "~/state/hooks/";
import { fetchInitialOrderHistory } from "~/state/slices/pair.slice";

const MarketDataLast = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common"]);
  const { selectedPair } = usePrices();
  const { selectedFiatCurrency, selectedCryptoCurrency } = useCurrencies();
  const { lang } = useSelector(state => state.ui);

  const prefix = getPairPrefix(selectedPair?.name);
  const key = `${prefix}orderhistory`;
  const orderhistories = useSelector(state => state.socket.orderhistories);
  const historyData = orderhistories?.[key] || [];
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();

  useEffect(() => {
    const name = selectedPair?.name;

    if (name) {
      dispatch(fetchInitialOrderHistory(name));
    }
  }, [selectedPair, dispatch]);

  return (
    <div className="marketdata-last">
      <div className="mdlasttable scrollbar" ref={tableCanvasRef}>
        <Table>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizefixed className="time">
                {t("time")}
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                {`${t("amount")} ${selectedCryptoCurrency?.symbol}`}
              </Table.Th>
              <Table.Th sizefixed className="pric">
                {`${t("price")} ${selectedFiatCurrency?.symbol}`}
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
            striped
            hovered
            scrollbar
            scrollbarstyles={{ height: `${tableHeight - 25}px` }}
          >
            {historyData.map((transaction, idx) => {
              const {
                // order_side_id,
                created_at,
                amount,
                market_price,
              } = transaction;
              const { digit, digit_show } = selectedCryptoCurrency;

              return (
                <Table.Tr key={`${created_at}_${idx}`}>
                  <Table.Td sizefixed className="time">
                    <span title={created_at}>
                      {formatDateDistance(new Date(created_at), Date.now(), {
                        locale: lang,
                      })}
                    </span>
                  </Table.Td>
                  <Table.Td sizefixed className="amnt" title={amount}>
                    <NumberFormat
                      value={amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={digit_show || digit}
                      fixedDecimalScale
                    />
                  </Table.Td>
                  <Table.Td sizefixed className="pric" title={market_price}>
                    <NumberFormat
                      value={market_price}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={digit_show || digit}
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
  );
};

export default memo(MarketDataLast);
