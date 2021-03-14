import { useState, useEffect } from "react";
import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";
import { IconSet } from "../IconSet.jsx";
import { Button } from "../Button.jsx";
import {
  createPairPriceAlarm,
  fetchPriceAlarms,
  deletePairPriceAlarm,
  deletePairPriceAlarms,
  toggleHideOthers,
} from "~/state/slices/alarm.slice";
import { setOpenModal } from "~/state/slices/ui.slice";
import { AlarmModal } from "~/components/modals/";
import { usePrices } from "~/state/hooks/";

const TopCoinBar = props => {
  const { t } = useTranslation(["coinbar", "common"]);
  const dispatch = useDispatch();
  const {
    selectedPair: currentPair,
    selectedPrice: selectedPriceData,
    fiatCurrency: selectedFiatCurrency,
    cryptoCurrency: selectedCryptoCurrency,
  } = usePrices();
  const { accesstoken } = useSelector(state => state.api);
  const { openModal } = useSelector(state => state.ui);
  const [alarmError, setAlarmError] = useState(null);

  useEffect(() => {
    if (accesstoken) dispatch(fetchPriceAlarms());
  }, [dispatch, accesstoken]);

  let visiblePriceData = {
    bestBuy: "",
    bestSell: "",
    change24h: "",
    high24h: "",
    low24h: "",
    average24h: "",
    volume: "",
  };

  if (selectedPriceData) {
    const {
      high24hour,
      low24hour,
      avarage24hour,
      volume,
      bid,
      ask,
      changepercent,
    } = selectedPriceData;

    visiblePriceData = {
      bestBuy: `${bid} ${selectedFiatCurrency}`,
      bestSell: `${ask} ${selectedFiatCurrency}`,
      change24h: `${changepercent}%`,
      high24h: `${high24hour} ${selectedFiatCurrency}`,
      low24h: `${low24hour} ${selectedFiatCurrency}`,
      average24h: `${avarage24hour} ${selectedFiatCurrency}`,
      volume: `${volume} ${selectedCryptoCurrency}`,
      // lastPrice: 9999,
      // excavating: 55555,
    };
  }

  const createAlarm = async data => {
    setAlarmError(null);
    const { payload } = await dispatch(createPairPriceAlarm(data));

    if (payload?.status === 0) setAlarmError(payload.errormessage);
  };

  const deleteAlarm = id => {
    if (id) dispatch(deletePairPriceAlarm(id));
  };

  const deleteAlarms = () => {
    dispatch(deletePairPriceAlarms());
  };

  const openAlarmModal = () => {
    dispatch(setOpenModal("alarm"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  const onToggleHideOthers = () => {
    dispatch(toggleHideOthers());
  };

  const upOrDown = selectedPriceData?.changepercent > 0 ? "up" : "down";
  const siteColorClass = `sitecolor${upOrDown === "up" ? "green" : "red"}`;

  return (
    <section className="mainbox mainbox-cryptocoinbar">
      <div className="cryptocoinbar siteformui">
        <InputGroup size="lg">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="selectedcur">
              {currentPair?.name?.replace(/\s/g, "")}
            </InputGroupText>
          </InputGroupAddon>
          <div className="cryptostatsbar">
            {selectedPriceData ? (
              <div className="cryptostatsbar-biger">
                <PerLineIcon className={`mdper mdper-${upOrDown}`} />
                <span className={siteColorClass}>
                  {selectedPriceData?.price}
                </span>
              </div>
            ) : null}
            <div className="cryptostatsbar-stats">
              <ul className="bigstatslist">
                {Object.entries(visiblePriceData).map(([key, value]) => {
                  return (
                    <li key={key}>
                      <h6>{t(key)}</h6>
                      <p>{value}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <InputGroupAddon addonType="append">
            <InputGroupText className="alarmbtn">
              {accesstoken ? (
                <Button
                  size="sm"
                  className="iconbtn iconbtn-warning"
                  onClick={openAlarmModal}
                >
                  <div className="iconbtn-svg">
                    <IconSet sprite="sprtsmclrd" size="16" name="bell" />
                  </div>
                  <div className="iconbtn-txt">
                    <span>{t("setAlarm")}</span>
                  </div>
                </Button>
              ) : null}
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <AlarmModal
        isOpen={openModal === "alarm"}
        createAlarm={createAlarm}
        deleteAlarm={deleteAlarm}
        deleteAlarms={deleteAlarms}
        clearModals={clearOpenModals}
        onToggleHideOthers={onToggleHideOthers}
        errorMessage={alarmError}
        selectedPriceData={selectedPriceData}
        currentPair={currentPair}
      />
    </section>
  );
};

export default TopCoinBar;
