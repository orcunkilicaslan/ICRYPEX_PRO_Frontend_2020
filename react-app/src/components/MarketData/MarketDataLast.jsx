import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Table from "../Table.jsx";
import { formatDateDistance, getPairPrefix } from "~/util/";
import { useClientRect, usePrices } from "~/state/hooks/";
import { fetchInitialOrderHistory } from "~/state/slices/pair.slice";

const MarketDataLast = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common"]);
  const { selectedPair, fiatCurrency: selectedFiatCurrency } = usePrices();
  const { lang } = useSelector(state => state.ui);

  const prefix = getPairPrefix(selectedPair?.name);
  const key = `${prefix}orderhistory`;
  const orderhistories = useSelector(state => state.socket.orderhistories);
  const historyData = orderhistories?.[key] || [];
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();

  useEffect(() => {
    const { name } = selectedPair;

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
                {t("amount")}
              </Table.Th>
              <Table.Th sizefixed className="pric">
                {`${t("price")} ${selectedFiatCurrency}`}
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
                order_side_id,
                updated_at = Date.now(),
                amount,
                market_price,
              } = transaction;

              return (
                <Table.Tr key={`${updated_at}_${idx}`}>
                  <Table.Td sizefixed className="time">
                    <span title={updated_at}>
                      {formatDateDistance(new Date(updated_at), Date.now(), {
                        locale: lang,
                      })}
                    </span>
                  </Table.Td>
                  <Table.Td sizefixed className="amnt">
                    {amount}
                  </Table.Td>
                  <Table.Td sizefixed className="pric">
                    {market_price}
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

export default MarketDataLast;
