import { useState, useEffect, memo } from "react";
import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";

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
import { usePrices, useCurrencies } from "~/state/hooks/";

const TopCoinBar = props => {
  const { t } = useTranslation(["coinbar", "common"]);
  const dispatch = useDispatch();
  const {
    selectedPair: currentPair = {},
    selectedPrice: selectedPriceData = {},
  } = usePrices();
  const { selectedFiatCurrency, selectedCryptoCurrency } = useCurrencies();
  const { accesstoken } = useSelector(state => state.api);
  const { openModal } = useSelector(state => state.ui);
  const [alarmError, setAlarmError] = useState(null);
  const {
    high24hour,
    low24hour,
    avarage24hour,
    volume,
    bid,
    ask,
    changepercent,
  } = selectedPriceData;
  const fiatSymbol = selectedFiatCurrency?.symbol || "";
  const cryptoSymbol = selectedCryptoCurrency?.symbol || "";

  useEffect(() => {
    if (accesstoken) dispatch(fetchPriceAlarms());
  }, [dispatch, accesstoken]);

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
  const fiatDigit =
    selectedFiatCurrency?.digit_show || selectedFiatCurrency?.digit;

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
            <div className="cryptostatsbar-biger">
              <PerLineIcon className={`mdper mdper-${upOrDown}`} />
              <span className={siteColorClass}>
                <NumberFormat
                  value={selectedPriceData?.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={fiatDigit}
                  fixedDecimalScale
                />
              </span>
            </div>
            <div className="cryptostatsbar-stats">
              <ul className="bigstatslist">
                <li className="d-none">
                  <h6>{t("bestBuy")}</h6>
                  <p>
                    <NumberFormat
                      value={bid}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={fiatDigit}
                      fixedDecimalScale
                      suffix={` ${fiatSymbol}`}
                    />
                  </p>
                </li>
                <li className="d-none">
                  <h6>{t("bestSell")}</h6>
                  <p>
                    <NumberFormat
                      value={ask}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={fiatDigit}
                      fixedDecimalScale
                      suffix={` ${fiatSymbol}`}
                    />
                  </p>
                </li>
                <li>
                  <h6>{t("change24h")}</h6>
                  <p>
                    <NumberFormat
                      value={changepercent}
                      displayType={"text"}
                      thousandSeparator={false}
                      decimalScale={2}
                      suffix="%"
                    />
                  </p>
                </li>
                <li>
                  <h6>{t("high24h")}</h6>
                  <p>
                    <NumberFormat
                      value={high24hour}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={fiatDigit}
                      fixedDecimalScale
                      suffix={` ${fiatSymbol}`}
                    />
                  </p>
                </li>
                <li>
                  <h6>{t("low24h")}</h6>
                  <p>
                    <NumberFormat
                      value={low24hour}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={fiatDigit}
                      fixedDecimalScale
                      suffix={` ${fiatSymbol}`}
                    />
                  </p>
                </li>
                <li>
                  <h6>{t("average24h")}</h6>
                  <p>
                    <NumberFormat
                      value={avarage24hour}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={fiatDigit}
                      fixedDecimalScale
                      suffix={` ${fiatSymbol}`}
                    />
                  </p>
                </li>
                <li>
                  <h6>{t("volume")}</h6>
                  <p>
                    <NumberFormat
                      value={volume}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={` ${cryptoSymbol}`}
                    />
                  </p>
                </li>
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
        setErrorMessage={setAlarmError}
        selectedPriceData={selectedPriceData}
        selectedFiatCurrency={selectedFiatCurrency}
        currentPair={currentPair}
      />
    </section>
  );
};

export default memo(TopCoinBar);
