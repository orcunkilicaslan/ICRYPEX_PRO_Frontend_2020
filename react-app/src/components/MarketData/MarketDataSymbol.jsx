import { useState } from "react";
import { ButtonGroup, Input } from "reactstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import classnames from "classnames";

import { ReactComponent as MdTableFavIcon } from "~/assets/images/icons/path_icon_mdtable_fav.svg";
import { ReactComponent as MdTableSearchIcon } from "~/assets/images/icons/path_icon_mdtable_search.svg";
import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";

import { Button } from "../Button";
import Table from "../Table.jsx";
import { useSocket } from "~/state/hooks/";

const MarketDataSymbol = props => {
  const { prices: pricesData = [] } = useSelector(state => state.socket);
  const { t } = useTranslation(["finance", "common"]);
  const tabs = ["TRY", "USD", "USDT", t("common:all")];
  const [activeTab, setActiveTab] = useState(tabs[tabs.length - 1]);
  useSocket("prices");

  return (
    <div className="marketdata-symbol">
      <div className="tabcont tabcont-filterbar siteformui row">
        <ButtonGroup size="sm" className="col">
          <Button type="button" size="sm" variant="secondary">
            <MdTableFavIcon className="filterfavico" />
          </Button>
          {tabs.map(elem => {
            const cls = classnames({ active: elem === activeTab });

            return (
              <Button
                key={elem}
                type="button"
                size="sm"
                variant="secondary"
                className={cls}
              >
                {elem}
              </Button>
            );
          })}
        </ButtonGroup>
        <ButtonGroup size="sm" className="col-auto">
          <Input
            className="mdsearchinput"
            bsSize="sm"
            placeholder={t("common:search")}
          />
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
                {t("common:symbol")}
              </Table.Th>
              <Table.Th sizefixed className="buy">
                {t("ask")}
              </Table.Th>
              <Table.Th sizefixed className="sll">
                {t("bid")}
              </Table.Th>
              <Table.Th sizefixed className="vol">
                {t("common:volume")}
              </Table.Th>
              <Table.Th sizefixed className="chg">
                {t("common:change")}
              </Table.Th>
              <Table.Th sizeauto className="per"></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody scrollbar striped hovered>
            {pricesData.map((data = {}) => {
              const {
                name,
                ask: buy,
                bid: sell,
                volume,
                changepercent,
                symbol,
                isfavorite,
              } = data;
              const mdper = changepercent > 0 ? "up" : "down";

              return (
                <Table.Tr key={symbol}>
                  <Table.Td sizeauto className="fav">
                    <Button className="tablefavico">
                      <MdTableFavIcon stroke={isfavorite ? "gold" : "none"} />
                    </Button>
                  </Table.Td>
                  <Table.Td sizefixed className="sym">
                    {name}
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
                    {changepercent}
                  </Table.Td>
                  <Table.Td sizeauto className="per">
                    <PerLineIcon className={`mdper mdper-${mdper}`} />
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

export default MarketDataSymbol;
