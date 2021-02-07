import { useMemo, useEffect } from "react";
import { ButtonGroup, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import classnames from "classnames";

import { ReactComponent as MdTableFavIcon } from "~/assets/images/icons/path_icon_mdtable_fav.svg";
import { ReactComponent as MdTableSearchIcon } from "~/assets/images/icons/path_icon_mdtable_search.svg";
import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";

import { Button } from "../Button";
import Table from "../Table.jsx";
import { useSocket } from "~/state/hooks/";
import {
  fetchFavoritePairs,
  addFavoritePair,
  removeFavoritePair,
  setSelectedPair,
  setPairFilter,
} from "~/state/slices/pair.slice";

const MarketDataSymbol = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["finance", "common"]);
  const filters = [
    { label: "TRY", filter: "TRY" },
    { label: "USD", filter: "USD" },
    { label: "USDT", filter: "USDT" },
    { label: t("common:all"), filter: "all" },
  ];
  const {
    favorites: favoritePairIDs,
    pairFilter,
    visiblePairIDs,
  } = useSelector(state => state.pair);
  const { accesstoken } = useSelector(state => state.api);
  const { prices: pricesData = [] } = useSelector(state => state.socket);
  const visiblePrices = useMemo(() => {
    return pricesData.filter(({ id }) => {
      return visiblePairIDs.includes(id);
    });
  }, [visiblePairIDs, pricesData]);
  useSocket("prices");

  useEffect(() => {
    if (accesstoken) dispatch(fetchFavoritePairs());
  }, [dispatch, accesstoken]);

  const onPairFilter = filter => {
    dispatch(setPairFilter(filter));
  };

  const onAddFavorite = pairname => {
    dispatch(addFavoritePair(pairname));
  };

  const onRemoveFavorite = pairname => {
    dispatch(removeFavoritePair(pairname));
  };

  const onSelectPair = symbol => {
    dispatch(setSelectedPair(symbol));
  };

  return (
    <div className="marketdata-symbol">
      <div className="tabcont tabcont-filterbar siteformui row">
        <ButtonGroup size="sm" className="col">
          {accesstoken ? (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className={classnames({ active: "starred" === pairFilter })}
              onClick={() => onPairFilter("starred")}
            >
              <MdTableFavIcon className="filterfavico" />
            </Button>
          ) : null}
          {filters.map(({ label, filter }) => {
            const cls = classnames({ active: filter === pairFilter });

            return (
              <Button
                key={filter}
                type="button"
                size="sm"
                variant="secondary"
                className={cls}
                onClick={() => onPairFilter(filter)}
              >
                {label}
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
            {visiblePrices.map((data = {}) => {
              const {
                id,
                name,
                ask: buy,
                bid: sell,
                volume,
                changepercent,
                symbol,
              } = data;
              const mdper = changepercent > 0 ? "up" : "down";
              const isFavorite = favoritePairIDs.includes(id);

              const onClick = () => {
                if (isFavorite) onRemoveFavorite(name);
                else onAddFavorite(name);
              };

              return (
                <Table.Tr key={symbol} onClick={() => onSelectPair(symbol)}>
                  {accesstoken ? (
                    <Table.Td sizeauto className="fav">
                      <Button className="tablefavico" onClick={onClick}>
                        <MdTableFavIcon stroke={isFavorite ? "gold" : "none"} />
                      </Button>
                    </Table.Td>
                  ) : null}
                  <Table.Td sizefixed className="sym">
                    {name.replace(/\s/g,'')}
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
