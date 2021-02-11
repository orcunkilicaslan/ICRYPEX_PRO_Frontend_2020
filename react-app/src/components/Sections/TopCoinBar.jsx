import { useState, useEffect, useMemo } from "react";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Progress,
} from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { inRange } from "lodash";

import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";
import { IconSet } from "../IconSet.jsx";
import { Button } from "../Button.jsx";
import Table from "../Table.jsx";
import {
  createPairPriceAlarm,
  fetchPriceAlarms,
  deletePairPriceAlarm,
  deletePairPriceAlarms,
  toggleHideOthers,
} from "~/state/slices/alarm.slice";
import { setOpenModal } from "~/state/slices/ui.slice";
import { AlertResult } from "~/components/AlertResult";

const rangeAlarmPercent = [-100, -75, -50, -25, 0, 25, 50, 75, 100];
const spinnerStep = 10;
const spinnerMin = 0;
const spinnerMax = 999999999;

const TopCoinBar = props => {
  const { t } = useTranslation(["coinbar", "common"]);
  const dispatch = useDispatch();
  const {
    all: allAlarms,
    isCreating,
    hideOthers,
    byPair: byPairAlarms,
    isDeleting,
  } = useSelector(state => state.alarm);
  const {
    selected: currentPair,
    fiatCurrency: selectedFiatCurrency,
    cryptoCurrency: selectedCryptoCurrency,
  } = useSelector(state => state.pair);
  const { prices: pricesData = [] } = useSelector(state => state.socket);
  const { accesstoken } = useSelector(state => state.api);
  const { openModal } = useSelector(state => state.ui);

  const [rangeAlarmPortfolio, setRangeAlarmPortfolio] = useState(
    rangeAlarmPercent[4]
  );

  const rangeAlarmPortfolioValPositive = rangeAlarmPortfolio;
  const rangeAlarmPortfolioValNegative = rangeAlarmPortfolio * -1;

  const rangeAlarmCircleCls = classnames({
    percstepa00: inRange(rangeAlarmPortfolio, 1, 25),
    percstepa25: inRange(rangeAlarmPortfolio, 25, 50),
    percstepa50: inRange(rangeAlarmPortfolio, 50, 75),
    percstepa75: inRange(rangeAlarmPortfolio, 75, 100),
    percstepa100: rangeAlarmPortfolio === 100,
    percstepp00: inRange(rangeAlarmPortfolio, -1, -25),
    percstepp25: inRange(rangeAlarmPortfolio, -25, -50),
    percstepp50: inRange(rangeAlarmPortfolio, -50, -75),
    percstepp75: inRange(rangeAlarmPortfolio, -75, -100),
    percstepp100: rangeAlarmPortfolio === -100,
  });

  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const visibleAlarms = useMemo(() => {
    if (!hideOthers) return allAlarms;
    else return byPairAlarms[currentPair?.name] || [];
  }, [allAlarms, byPairAlarms, currentPair, hideOthers]);

  let visiblePriceData = {
    bestBuy: "",
    bestSell: "",
    change24h: "",
    high24h: "",
    low24h: "",
    average24h: "",
    volume: "",
  };
  let selectedPriceData = pricesData.find(
    ({ symbol }) => symbol === currentPair?.symbol
  );
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

  useEffect(() => {
    if (accesstoken) dispatch(fetchPriceAlarms());
  }, [dispatch, accesstoken]);

  const onAmount = arg => {
    let newAmount;
    if (Number.isInteger(arg)) {
      newAmount = amount + arg;
    } else {
      const event = arg;
      event.preventDefault();
      event.stopPropagation();
      newAmount = parseInt(event.target.value, 10);
    }

    if (newAmount >= spinnerMin && newAmount <= spinnerMax) {
      setAmount(newAmount);
    }
  };

  const createAlarm = async () => {
    setErrorMessage("");
    const data = {
      pairname: currentPair?.name,
      pricealarmtypeid: rangeAlarmPortfolio > 0 ? 1 : 2,
      price: amount,
    };

    const { payload } = await dispatch(createPairPriceAlarm(data));

    if (payload?.status === 0) setErrorMessage(payload.errormessage);
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
              {currentPair.name.replace(/\s/g, "")}
            </InputGroupText>
          </InputGroupAddon>
          <div className="cryptostatsbar">
            {selectedPriceData ? (
              <div className="cryptostatsbar-biger">
                <PerLineIcon className={`mdper mdper-${upOrDown}`} />
                <span className={siteColorClass}>
                  {selectedPriceData.price}
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
                    <IconSet
                      sprite="sprtsmclrd"
                      size="16"
                      name="bell"
                    ></IconSet>
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

      <Modal
        wrapClassName=""
        modalClassName="modal-rightside"
        size="sm"
        isOpen={openModal === "alarm"}
        toggle={clearOpenModals}
        keyboard={false}
        fade={false}
        autoFocus={false}
        backdrop="static"
      >
        <ModalHeader toggle={clearOpenModals}>{t("setAlarm")}</ModalHeader>
        <ModalBody className="modalcomp modalcomp-setalarm">
          {selectedPriceData ? (
            <div className="modalcomp-setalarm-data">
              <div className="databigger">
                <PerLineIcon className="mdper mdper-up" />
                <span className="sitecolorgreen">
                  {selectedPriceData.price}
                </span>
              </div>
              <div className="datasmall">
                <span>{selectedPriceData.pricechange}</span>
                <span className={siteColorClass}>
                  {upOrDown === "up" ? "+" : "-"}
                  {selectedPriceData.changepercent}
                </span>
              </div>
            </div>
          ) : null}

          <div className="modalcomp-setalarm-form">
            {errorMessage ? (
              <AlertResult error>{errorMessage}</AlertResult>
            ) : null}
            <Form className="siteformui" autoComplete="off" noValidate>
              <div className="setalarmspinner">
                <FormGroup className="input-group">
                  <InputGroupAddon addonType="prepend">
                    <Button
                      variant="secondary"
                      className="active"
                      onClick={() => onAmount(-spinnerStep)}
                    >
                      -
                    </Button>
                  </InputGroupAddon>
                  <Input
                    type="number"
                    className="text-right"
                    value={amount}
                    onChange={onAmount}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>{selectedFiatCurrency}</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupAddon addonType="append">
                    <Button
                      variant="secondary"
                      className="active"
                      onClick={() => onAmount(spinnerStep)}
                    >
                      +
                    </Button>
                  </InputGroupAddon>
                </FormGroup>
              </div>
              <div className="setalarmrange">
                <div className="setalarmrange-progress">
                  <Progress
                    className="barnegative"
                    barClassName={
                      rangeAlarmPortfolio >= 0 ? "opacity-0" : "opacity-1"
                    }
                    value={rangeAlarmPortfolioValNegative}
                  />
                  <Progress
                    className="barpositive"
                    barClassName={
                      rangeAlarmPortfolio <= 0 ? "opacity-0" : "opacity-1"
                    }
                    value={rangeAlarmPortfolioValPositive}
                  />
                </div>
                <div
                  className={`setalarmrange-circle ${rangeAlarmCircleCls}`}
                  data-val={rangeAlarmPortfolio}
                >
                  {rangeAlarmPercent.map((el, idx) => {
                    return (
                      <span key={`${el}_${idx}`} className={`val-${el}`}></span>
                    );
                  })}
                </div>
                <div className="setalarmrange-perc">
                  <span className="sitecolorred">-100%</span>
                  <span className="sitecolorgreen">+100%</span>
                </div>
                <output
                  className={`setalarmrange-bubble ${
                    rangeAlarmPortfolio > 0 ? "valpositive" : "valnegative"
                  }`}
                >
                  {rangeAlarmPortfolio}%
                </output>
                <Input
                  className={`setalarmrange-range custom-range ${
                    rangeAlarmPortfolio > 0 ? "valpositive" : "valnegative"
                  }`}
                  type="range"
                  min={-100}
                  max={100}
                  step={1}
                  value={rangeAlarmPortfolio}
                  onChange={({ target }) => {
                    const int = parseInt(target.value, 10);
                    setRangeAlarmPortfolio(int);
                  }}
                />
              </div>
              <div className="setalarmbtn">
                <Button
                  variant="warning"
                  className="w-100"
                  onClick={createAlarm}
                  disabled={isCreating}
                >
                  {t("createAlarm")}
                </Button>
              </div>
            </Form>
          </div>
          <div className={`modalcomp-setalarm-table ${!allAlarms?.length ? "d-none" : ""}`}>
            <div className="headsmtitle">
              <div className="headsmtitle-col">
                <h6>{hideOthers ? currentPair?.name : t("common:all")}</h6>
              </div>
              <div className="headsmtitle-col">
                <div className="custom-control custom-checkbox">
                  <Input
                    className="custom-control-input"
                    type="checkbox"
                    id="setalarmsHideOtherPairs"
                    checked={hideOthers}
                    onChange={onToggleHideOthers}
                  />
                  <Label
                    className="custom-control-label"
                    htmlFor="setalarmsHideOtherPairs"
                    check
                  >
                    {t("hidePairs")}
                  </Label>
                </div>
              </div>
            </div>
            <div className="setalarmtable scrollbar">
              <Table>
                <Table.Thead scrollbar>
                  <Table.Tr>
                    <Table.Th sizeauto className="symb">
                      {t("common:pair")}
                    </Table.Th>
                    <Table.Th sizefixed className="amnt">
                      {t("common:amount")}
                    </Table.Th>
                    <Table.Th sizeauto className="adlt"></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody striped hovered scrollbar>
                  {visibleAlarms.map(({ id, pairname, price, mdper }) => {
                    return (
                      <Table.Tr key={id}>
                        <Table.Td sizeauto className="symb">
                          {pairname}
                        </Table.Td>
                        <Table.Td sizefixed className="amnt">
                          <span>{price}</span>
                          <PerLineIcon className={`mdper mdper-${mdper}`} />
                        </Table.Td>
                        <Table.Td sizeauto className="adlt">
                          <Button type="button" onClick={() => deleteAlarm(id)}>
                            <IconSet
                              sprite="sprtsmclrd"
                              size="14"
                              name="delete"
                            />
                          </Button>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
            </div>
            <div className="deletealarmbtn">
              <Button
                variant="danger"
                className="w-100"
                onClick={deleteAlarms}
                disabled={!allAlarms?.length || isDeleting}
              >
                {t("deleteAllAlarms")}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </section>
  );
};

export default TopCoinBar;
