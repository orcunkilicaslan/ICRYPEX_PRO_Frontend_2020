import { useState, useEffect } from "react";
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
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";
import { IconSet } from "../IconSet.jsx";
import { Button } from "../Button.jsx";
import Table from "../Table.jsx";
import {
  createPairPriceAlarm,
  fetchPriceAlarms,
  deletePairPriceAlarm,
  deletePairPriceAlarms,
} from "~/state/slices/alarm.slice";
import { AlertResult } from "~/components/AlertResult";

const STEP = 10;
const MINIMUM = 0;
const MAXIMUM = 999999999;
const pricelist = {
  coinid: 1,
  data: {
    lastPrice: "43,199",
    bestBuy: "21,149",
    bestSell: "12,345",
    change24h: "10,539",
    high24h: "24,247",
    low24h: "7,357",
    average24h: "32,643",
    volume: "32,643",
    excavating: "1,474,00",
  },
};

const TopCoinBar = props => {
  const { t } = useTranslation(["coinbar", "common"]);
  const dispatch = useDispatch();
  const { all: allAlarms, isCreating } = useSelector(state => state.alarm);
  const {
    selected: currentPair,
    fiatCurrency: selectedFiatCurrency,
  } = useSelector(state => state.pair);
  const { prices: pricesData = [] } = useSelector(state => state.socket);
  const { accesstoken } = useSelector(state => state.api);
  const [alarmModal, setAlarmModal] = useState(false);
  const [rangeAlarmPortfolio, setRangeAlarmPortfolio] = useState(0);
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  let selectedPriceData = pricesData.find(
    ({ symbol }) => symbol === currentPair?.symbol
  );
  if (selectedPriceData) {
    const { high24hour, low24hour, avarage24hour, volume } = selectedPriceData;

    selectedPriceData = {
      lastPrice: 9999,
      bestBuy: 111,
      bestSell: 222,
      change24h: "3%",
      high24h: high24hour,
      low24h: low24hour,
      average24h: avarage24hour,
      volume,
      excavating: 55555,
    };
  } else selectedPriceData = {};
  console.log({ selectedPriceData });

  useEffect(() => {
    if (accesstoken) dispatch(fetchPriceAlarms());
  }, [dispatch, accesstoken]);

  const alarmModalToggle = () => {
    setAlarmModal(!alarmModal);
  };

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

    if (newAmount >= MINIMUM && newAmount <= MAXIMUM) setAmount(newAmount);
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

  return (
    <section className="mainbox mainbox-cryptocoinbar">
      <div className="cryptocoinbar siteformui">
        <InputGroup size="lg">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="selectedcur">
              {currentPair.name}
            </InputGroupText>
          </InputGroupAddon>
          <div className="cryptostatsbar">
            <div className="cryptostatsbar-biger">
              <PerLineIcon className="mdper mdper-up" />
              <span className="sitecolorgreen">9198.00</span>
            </div>
            <div className="cryptostatsbar-stats">
              <ul className="bigstatslist">
                {Object.entries(selectedPriceData).map(([key, value]) => {
                  return (
                    <li key={key}>
                      <h6>{t(key)}</h6>
                      <p>
                        {value} {selectedFiatCurrency}
                      </p>
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
                  onClick={alarmModalToggle}
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
        isOpen={alarmModal}
        toggle={alarmModalToggle}
        keyboard={false}
        fade={false}
        autoFocus={false}
        backdrop="static"
      >
        <ModalHeader toggle={alarmModalToggle}>{t("setAlarm")}</ModalHeader>
        <ModalBody className="modalcomp modalcomp-setalarm">
          <div className="modalcomp-setalarm-data">
            <div className="databigger">
              <PerLineIcon className="mdper mdper-up" />
              <span className="sitecolorgreen">999,999.99</span>
            </div>
            <div className="datasmall">
              <span>633.59</span>
              <span className="sitecolorgreen">+%5.76</span>
            </div>
          </div>
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
                      onClick={() => onAmount(-STEP)}
                    >
                      -
                    </Button>
                  </InputGroupAddon>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("common:amount")}</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="number"
                    className="text-right"
                    value={amount}
                    onChange={onAmount}
                    // min={0}
                    // max={999999999}
                    // step={10}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>TRY</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupAddon addonType="append">
                    <Button
                      variant="secondary"
                      className="active"
                      onClick={() => onAmount(STEP)}
                    >
                      +
                    </Button>
                  </InputGroupAddon>
                </FormGroup>
              </div>
              <div className="setalarmrange">
                <div className="rangeprogress">
                  <Progress
                    className="rangeprogress-progress"
                    value={rangeAlarmPortfolio}
                  />
                  <div
                    className="rangeprogress-circle d-none"
                    data-val={rangeAlarmPortfolio}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="rangeprogress-perc">
                    <span className="sitecolorred">-%100</span>
                    <span className="sitecolorgreen">+%100</span>
                  </div>
                  <output className="rangeprogress-bubble">
                    {rangeAlarmPortfolio}
                  </output>
                  <Input
                    className="rangeprogress-range custom-range"
                    type="range"
                    min={-100}
                    max={100}
                    step={25}
                    value={rangeAlarmPortfolio}
                    onChange={({ target }) => {
                      const int = parseInt(target.value, 10);
                      setRangeAlarmPortfolio(int);
                    }}
                  />
                </div>
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
          <div className="modalcomp-setalarm-table">
            <div className="headsmtitle">
              <div className="headsmtitle-col">
                <h6>BTC / TRY ALARMLARI</h6>
              </div>
              <div className="headsmtitle-col">
                <div className="custom-control custom-checkbox">
                  <Input
                    className="custom-control-input"
                    type="checkbox"
                    id="setalarmsHideOtherPairs"
                    defaultChecked
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
                    <Table.Th sizeauto className="adlt">
                      {t("common:deleteAll")}
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody striped hovered scrollbar>
                  {allAlarms.map(({ id, pairname, price, mdper }) => {
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
          </div>
        </ModalBody>
      </Modal>
    </section>
  );
};

export default TopCoinBar;
