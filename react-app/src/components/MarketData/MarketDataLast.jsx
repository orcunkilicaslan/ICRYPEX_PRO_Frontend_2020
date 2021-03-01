import { useSelector } from "react-redux";
import { useClientRect } from "~/state/hooks";
import { useTranslation } from "react-i18next";
import { formatDateDistance } from "~/util/";

import Table from "../Table.jsx";

const MarketDataLast = props => {
  const { t } = useTranslation(["common"]);
  const {
    selected: currentPair,
    fiatCurrency: selectedFiatCurrency,
  } = useSelector(state => state.pair);
  const { lang } = useSelector(state => state.ui);
  const pairKey = `${currentPair?.symbol?.toLowerCase()}orderhistory`;
  const { orderhistories = {} } = useSelector(state => state.socket);
  const { [pairKey]: historyData = [] } = orderhistories;
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();

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
                created_at,
                amount,
                market_price,
              } = transaction;

              return (
                <Table.Tr key={`${created_at}_${idx}`}>
                  <Table.Td sizefixed className="time">
                    <span title={created_at}>
                      {formatDateDistance(new Date(created_at), Date.now(), {
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
