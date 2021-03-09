import { useEffect, useMemo, useState, useContext } from "react";
import ChartistGraph from "react-chartist";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { fetchAssets } from "~/state/slices/assets.slice";
import { IconSet } from "~/components/IconSet";
import { Button } from "~/components/Button";
import { openOrderContext } from "./OpenOrder";
import { useCurrencies } from "~/state/hooks/";

const assetchartlisttype = "Pie";
const assetchartlistoptions = {
  donut: true,
  donutWidth: 8,
  donutSolid: true,
  startAngle: 0,
  showLabel: false,
  labelPosition: "outside",
};

const OpenOrderAssetsChartList = props => {
  const dispatch = useDispatch();
  const { dispatch: _dispatch } = useContext(openOrderContext);
  const { t } = useTranslation("common");
  const { allAssets } = useSelector(state => state.assets);
  const { fiatCurrencies: currencies } = useCurrencies();

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const chartData = useMemo(() => {
    const labels = allAssets?.balances?.map?.(({ symbol }) => symbol);
    const series = allAssets?.balances?.map?.(
      ({ [`currency_percent_${selectedCurrency?.symbol}`]: percent = 0 }) =>
        Number(percent).toFixed()
    );

    return { labels, series };
  }, [allAssets, selectedCurrency]);

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  const toggle = () => setDropdownOpen(bool => !bool);

  const onClick = method => {
    _dispatch({
      type: "depo_or_with",
      payload: { tabIndex: 3, method, mode: "deposit" },
    });
  };

  return (
    <div className="assets-chartlist">
      <Dropdown
        isOpen={isDropdownOpen}
        toggle={toggle}
        direction="down"
        style={{ position: "absolute", right: "10px" }}
      >
        <DropdownToggle caret>{selectedCurrency?.symbol}</DropdownToggle>
        <DropdownMenu right>
          {currencies.map(currency => {
            const { symbol } = currency;

            return (
              <DropdownItem
                key={symbol}
                onClick={() => setSelectedCurrency(currency)}
              >
                {symbol}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
      {!allAssets?.[`total_${selectedCurrency?.symbol}`] ? (
        <div className="noassetbalance">
          <div className="noassetbalance-content">
            <IconSet sprite="sprtlgclrd" size="50gray" name="close" />
            <h4>Bakiyeniz Bulunmamaktadır.</h4>
            <p>
              Görüntüleyebilmeniz için aşağıdaki para yatırma seçeneklerden
              birisini tercih edebilirsiniz.
            </p>
            <div className="contbtn">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  onClick("bank");
                }}
              >
                Banka
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  onClick("papara");
                }}
              >
                Papara
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  onClick("crypto");
                }}
              >
                Kripto
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="assetchartarea">
          <div className="assetchartarea-donut">
            <ChartistGraph
              className="asssetdonutchrt"
              data={chartData}
              options={assetchartlistoptions}
              type={assetchartlisttype}
            />
            <div className="asssetdonutinfo">
              <div className="asssetdonutinfo-box">
                <h6>{t("total")}</h6>
                <p>
                  {allAssets?.[`total_${selectedCurrency?.symbol}`]?.toFixed?.(
                    2
                  )}{" "}
                  {selectedCurrency?.symbol}
                </p>
                <p>0.0028200 BTC</p>
              </div>
            </div>
          </div>
          <div className="assetchartarea-list">
            <ul className="asssetalllist">
              {allAssets?.balances?.map?.(({ symbol, balance }) => {
                return (
                  <li
                    className={`asssetcurr-${symbol?.toLowerCase?.()}`}
                    key={symbol}
                  >
                    <div className="circle">
                      <i />
                    </div>
                    <div className="info">
                      <h6>{symbol}</h6>
                      <p>
                        {currencies.includes(symbol)
                          ? balance.toFixed?.(2)
                          : balance}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenOrderAssetsChartList;
