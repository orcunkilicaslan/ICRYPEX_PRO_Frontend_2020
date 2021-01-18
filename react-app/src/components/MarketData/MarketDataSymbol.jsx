import { ButtonGroup, Input } from "reactstrap";

import { ReactComponent as MdTableFavIcon } from "~/assets/images/icons/path_icon_mdtable_fav.svg";
import { ReactComponent as MdTableSearchIcon } from "~/assets/images/icons/path_icon_mdtable_search.svg";
import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";

import { Button } from "../Button";
import Table from "../Table.jsx";

const mdsymboltable = [
  {
    pair: "BTC/TRY",
    data: {
      buy: "3.63500",
      sell: "2.45300",
      volume: "10.23M",
      change: "-2.22%",
      mdper: "up",
    },
  },
  {
    pair: "BTC/USD",
    data: {
      buy: "5.88721",
      sell: "1.095200",
      volume: "14.02M",
      change: "+1.38%",
      mdper: "down",
    },
  },
  {
    pair: "BTC/USDT",
    data: {
      buy: "4.99102",
      sell: "4.05740",
      volume: "24.80M",
      change: "+2.24%",
      mdper: "down",
    },
  },
  {
    pair: "ETH/TRY",
    data: {
      buy: "1.88932",
      sell: "3.94618",
      volume: "12.39M",
      change: "+3.57%",
      mdper: "up",
    },
  },
];

const MarketDataSymbol = props => {
  return (
    <div className="marketdata-symbol">
      <div className="tabcont tabcont-filterbar siteformui row">
        <ButtonGroup size="sm" className="col">
          <Button type="button" size="sm" variant="secondary active">
            <MdTableFavIcon className="filterfavico" />
          </Button>
          {["TRY", "USD", "USDT", "Tümü"].map(elem => {
            return (
              <Button key={elem} type="button" size="sm" variant="secondary">
                {elem}
              </Button>
            );
          })}
        </ButtonGroup>
        <ButtonGroup size="sm" className="col-auto">
          <Input className="mdsearchinput" bsSize="sm" placeholder="Arama" />
          <div className="mdsearchicon">
            <MdTableSearchIcon />
          </div>
        </ButtonGroup>
      </div>
      <div className="mdsymboltable scrollbar">
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="fav"></Table.Th>
              <Table.Th sizefixed className="sym">
                Sembol
              </Table.Th>
              <Table.Th sizefixed className="buy">
                Alış
              </Table.Th>
              <Table.Th sizefixed className="sll">
                Satış
              </Table.Th>
              <Table.Th sizefixed className="vol">
                Hacim
              </Table.Th>
              <Table.Th sizefixed className="chg">
                Değişim
              </Table.Th>
              <Table.Th sizeauto className="per"></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody scrollbar striped hovered>
            {mdsymboltable.map(
              ({ pair, data: { buy, sell, volume, change, mdper } }) => {
                return (
                  <Table.Tr key={pair}>
                    <Table.Td sizeauto className="fav">
                      <Button className="tablefavico">
                        <MdTableFavIcon />
                      </Button>
                    </Table.Td>
                    <Table.Td sizefixed className="sym">
                      {pair}
                    </Table.Td>
                    <Table.Td sizefixed className="buy">
                      {buy}
                    </Table.Td>
                    <Table.Td sizefixed className="sll">
                      {sell}
                    </Table.Td>
                    <Table.Td sizefixed className="vol">
                      {volume}
                    </Table.Td>
                    <Table.Td sizefixed className="chg">
                      {change}
                    </Table.Td>
                    <Table.Td sizeauto className="per">
                      <PerLineIcon className={`mdper mdper-${mdper}`} />
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

export default MarketDataSymbol;
