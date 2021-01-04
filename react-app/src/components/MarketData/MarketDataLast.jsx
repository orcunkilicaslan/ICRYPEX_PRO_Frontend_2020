import Table from "../Table.jsx";

const mdlasttable = [
  {
    id: "01",
    time: "09:04:24",
    amount: "0.20493654",
    price: "48,698",
  },
  {
    id: "02",
    time: "10:02:36",
    amount: "0.00020498",
    price: "48,698",
  },
  {
    id: "03",
    time: "10:01:50",
    amount: "0.10252914",
    price: "48,697",
  },
  {
    id: "04",
    time: "10:01:49",
    amount: "0.02775202",
    price: "48,679",
  },
  {
    id: "05",
    time: "10:01:49",
    amount: "0.02062184",
    price: "48,679",
  },
  {
    id: "06",
    time: "09:04:24",
    amount: "0.20493654",
    price: "48,698",
  },
];

const MarketDataLast = props => {
  return (
    <div className="marketdata-last">
      <div className="mdlasttable scrollbar">
        <Table>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizefixed className="time">
                Zaman
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                Miktar
              </Table.Th>
              <Table.Th sizefixed className="pric">
                Fiyat (TRY)
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody striped hovered scrollbar>
            {mdlasttable.map(({ id, time, amount, price }) => {
              return (
                <Table.Tr key={id}>
                  <Table.Td sizefixed className="time">
                    {time}
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
  );
};

export default MarketDataLast;
