import { useEffect, useMemo, useState } from "react";
import ChartistGraph from "react-chartist";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { fetchAssets } from "~/state/slices/assets.slice";
import { IconSet } from "~/components/IconSet";
import { Button } from "~/components/Button";

const assetchartlistoptions = {
  donut: true,
  donutWidth: 8,
  donutSolid: true,
  startAngle: 0,
  showLabel: false,
  labelPosition: "outside",
};

const assetchartlisttype = "Pie";
const currencies = ["TRY", "USD", "EUR"];

const OpenOrderAssetsChartList = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const { allAssets } = useSelector(state => state.assets);
  const chartData = useMemo(() => {
    const labels = allAssets?.balances?.map?.(({ symbol }) => symbol);
    const series = allAssets?.balances?.map?.(
      ({ [`currency_percent_${selectedCurrency}`]: percent = 0 }) =>
        Number(percent).toFixed()
    );

    return { labels, series };
  }, [allAssets, selectedCurrency]);

  useEffect(() => {
    dispatch(fetchAssets());
  }, []);

  return (

    <div className="assets-chartlist">
      {!allAssets?.[`total_${selectedCurrency}`] ? (
          <div className="noassetbalance">
            <div className="noassetbalance-content">
              <IconSet sprite="sprtlgclrd" size="50gray" name="close" />
              <h4>Bakiyeniz Bulunmamaktadır.</h4>
              <p>Görüntüleyebilmeniz için aşağıdaki para yatırma seçeneklerden birisini tercih edebilirsiniz.</p>
              <div className="contbtn">
                <Button
                    size="sm"
                    variant="secondary"
                >
                  Banka
                </Button>
                <Button
                    size="sm"
                    variant="secondary"
                >
                  Papara
                </Button>
                <Button
                    size="sm"
                    variant="secondary"
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
                    {allAssets?.[`total_${selectedCurrency}`]?.toFixed?.(2)}{" "}
                    {selectedCurrency}
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
                            {
                              currencies.includes(symbol)
                                  ? balance.toFixed?.(2)
                                  : balance
                            }
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