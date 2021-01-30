import { useState } from "react";
import { Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalHeader, Progress } from "reactstrap";
import { useTranslation } from "react-i18next";

import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";
import { IconSet } from "../IconSet.jsx";
import { Button } from "../Button.jsx";
import Table from "../Table.jsx";
import classnames from "classnames";

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

const alarmsettable = [
  {
    id: "01",
    pair: "BTC/LINK",
    amount: "0.20493654",
    mdper: "up",
  },
  {
    id: "02",
    pair: "ETH/EOS",
    amount: "0.00020498",
    mdper: "down",
  },
];

const CompCryptocoinbar = props => {

  const { t } = useTranslation("coinbar");

  const [alarmModal, setAlarmModal] = useState(false);

  const alarmModalToggle = () => {
    setAlarmModal(!alarmModal);
  };

  const [rangeAlarmPortfolio, setRangeAlarmPortfolio] = useState("");

  return (
    <div className="mainbox mainbox-cryptocoinbar">
      <div className="cryptocoinbar siteformui">
        <InputGroup size="lg">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="selectedcur">BTC/USDT</InputGroupText>
          </InputGroupAddon>
          <div className="cryptostatsbar">
            <div className="cryptostatsbar-biger">
              <PerLineIcon className="mdper mdper-up" />
              <span className="sitecolorgreen">9198.00</span>
            </div>
            <div className="cryptostatsbar-stats">
              <ul className="bigstatslist">
                {Object.entries(pricelist.data).map(([key, value]) => {
                  return (
                    <li key={key}>
                      <h6>{t(key)}</h6>
                      <p>{value} TRY</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <InputGroupAddon addonType="append">
            <InputGroupText className="alarmbtn">
              <Button size="sm" className="iconbtn iconbtn-warning" onClick={alarmModalToggle}>
                <div className="iconbtn-svg">
                  <IconSet sprite="sprtsmclrd" size="16" name="bell"></IconSet>
                </div>
                <div className="iconbtn-txt">
                  <span>Alarm Kur</span>
                </div>
              </Button>
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
        <ModalHeader toggle={alarmModalToggle}>ALARM KUR</ModalHeader>
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
            <Form className="siteformui" autoComplete="off" noValidate>
              <div className="setalarmspinner">
                <FormGroup className="input-group">
                  <InputGroupAddon addonType="prepend">
                    <Button variant="secondary" className="active">-</Button>
                  </InputGroupAddon>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Miktar</InputGroupText>
                  </InputGroupAddon>
                  <Input type="number" className="text-right" value="0" min="0" max="999999999" step="10" />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>TRY</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupAddon addonType="append">
                    <Button variant="secondary" className="active">+</Button>
                  </InputGroupAddon>
                </FormGroup>
              </div>
              <div className="setalarmrange">
                <div className="rangeprogress">
                  <Progress
                      className="rangeprogress-progress"
                      value={rangeAlarmPortfolio}
                  />
                  <div className="rangeprogress-circle d-none" data-val={rangeAlarmPortfolio}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="rangeprogress-perc">
                    <span className="sitecolorred">-%100</span>
                    <span className="sitecolorgreen">+%100</span>
                  </div>
                  <output className="rangeprogress-bubble">{rangeAlarmPortfolio}</output>
                  <Input
                      className="rangeprogress-range custom-range"
                      type="range"
                      min={100 / 4}
                      max={100}
                      step={100 / 4}
                      value={rangeAlarmPortfolio}
                      onChange={({ target }) => {
                        setRangeAlarmPortfolio(target.value);
                      }}
                  />
                </div>
              </div>
              <div className="setalarmbtn">
                <Button variant="warning" className="w-100">ALARM OLUŞTUR</Button>
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
                    Diğer Çiftleri Gizle
                  </Label>
                </div>
              </div>
            </div>
            <div className="setalarmtable scrollbar">
              <Table>
                <Table.Thead scrollbar>
                  <Table.Tr>
                    <Table.Th sizeauto className="symb">
                      Çift
                    </Table.Th>
                    <Table.Th sizefixed className="amnt">
                      Miktar
                    </Table.Th>
                    <Table.Th sizeauto className="adlt">
                      Tümünü Sil
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody striped hovered scrollbar>

                  {alarmsettable.map(
                      ({ id, pair, amount, mdper }) => {

                        const cls = classnames({
                          sitecolorgreen: mdper === "up",
                          sitecolorred: mdper !== "up",
                        });

                        return (
                            <Table.Tr key={id}>
                              <Table.Td sizeauto className="symb">
                                {pair}
                              </Table.Td>
                              <Table.Td sizefixed className="amnt">
                                <span>{amount}</span>
                                <PerLineIcon className={`mdper mdper-${mdper}`} />
                              </Table.Td>
                              <Table.Td sizeauto className="adlt">
                                <Button type="button">
                                  <IconSet sprite="sprtsmclrd" size="14" name="delete" />
                                </Button>
                              </Table.Td>
                            </Table.Tr>
                        );
                      }
                  )}

                </Table.Tbody>
              </Table>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CompCryptocoinbar;