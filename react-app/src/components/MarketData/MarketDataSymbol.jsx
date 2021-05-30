import { useMemo, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFuzzy } from "react-use-fuzzy";
import { useTranslation } from "react-i18next";
import { ButtonGroup, Input } from "reactstrap";
import classnames from "classnames";

import { ReactComponent as MdTableFavIcon } from "~/assets/images/icons/path_icon_mdtable_fav.svg";
import { ReactComponent as MdTableSearchIcon } from "~/assets/images/icons/path_icon_mdtable_symbolfilter_search.svg";
import { ReactComponent as MdTableCloseIcon } from "~/assets/images/icons/path_icon_mdtable_symbolfilter_close.svg";
import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";
import { useClientRect } from "~/state/hooks/";

import { Button } from "../Button";
import Table from "../Table.jsx";
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
  const { result, keyword, search, resetSearch } = useFuzzy(pricesData, {
    keys: ["symbol"],
    findAllMatches: true,
  });
  const visiblePrices = useMemo(() => {
    if (keyword) return result.map(({ item }) => item);

    return pricesData.filter(({ id }) => visiblePairIDs.includes(id));
  }, [visiblePairIDs, pricesData, keyword, result]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();

  useEffect(() => {
    dispatch(fetchFavoritePairs());
  }, [dispatch]);

  const onPairFilter = filter => {
    resetSearch();
    dispatch(setPairFilter(filter));
  };

  const onAddFavorite = pairname => {
    dispatch(addFavoritePair(pairname));
  };

  const onRemoveFavorite = pairname => {
    dispatch(removeFavoritePair(pairname));
  };

  const onSelectPair = (symbol, target) => {
    if (target?.nodeName === "DIV") {
      dispatch(setSelectedPair(symbol));
    }
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
            value={keyword}
            onChange={e => search(e.target.value)}
            pattern=".{0}|.{1,}"
            required
          />
          <div className="mdsearchicon">
            <MdTableSearchIcon className="svgsearch" />
            <MdTableCloseIcon
              className="svgclose"
              onClick={() => resetSearch()}
            />
          </div>
        </ButtonGroup>
      </div>
      <div className="mdsymboltable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              {accesstoken ? <Table.Th sizeauto className="fav" /> : null}
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
              <Table.Th sizeauto className="per" />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
            striped
            hovered
            scrollbar
            scrollbarstyles={{ height: `${tableHeight - 25}px` }}
          >
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
                <Table.Tr
                  key={symbol}
                  onClick={evt => onSelectPair(symbol, evt?.target)}
                >
                  {accesstoken ? (
                    <Table.Td sizeauto className="fav">
                      <Button
                        className={`tablefavico ${isFavorite ? "faved" : null}`}
                        onClick={onClick}
                      >
                        <MdTableFavIcon />
                      </Button>
                    </Table.Td>
                  ) : null}
                  <Table.Td sizefixed className="sym">
                    {name.replace(/\s/g, "")}
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

export default memo(MarketDataSymbol);
