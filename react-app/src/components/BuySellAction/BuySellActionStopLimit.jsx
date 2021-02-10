import { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Progress,
} from "reactstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { IconSet } from "../IconSet.jsx";
import { Button } from "../Button.jsx";
import classnames from "classnames";

const buySellCurrencies = ["TRY", "USD"];
const buySellCryptoCurrencies  = ["BTC", "ETH"];
const buySellRangePercent = [0, 25, 50, 75, 100];

const BuySellActionStopLimit = props => {
  const { t } = useTranslation(["common", "finance"]);
  const { fiatCurrency, cryptoCurrency } = useSelector(state => state.pair);
  const [selectedBuyPrice, setSelectedBuyPrice] = useState("");
  const [selectedBuyLimit, setSelectedBuyLimit] = useState("");
  const [selectedBuyAmount, setSelectedBuyAmount] = useState("");
  const [rangeBuyPortfolio, setRangeBuyPortfolio] = useState(buySellRangePercent[0]);
  const [selectedSellPrice, setSelectedSellPrice] = useState("");
  const [selectedSellLimit, setSelectedSellLimit] = useState("");
  const [selectedSellAmount, setSelectedSellAmount] = useState("");
  const [rangeSellPortfolio, setRangeSellPortfolio] = useState(buySellRangePercent[0]);

  const buyRangeCircleCls = classnames({

  });

  const sellRangeCircleCls = classnames({

  });

  return (
    <div className="buysellaction-stoplimit">
      <Row className="buysellaction-formarea">
        <Col className="buycol">
          <Form
            className="buysellaction-form siteformui"
            autoComplete="off"
            noValidate
          >
            <div className="formhead">
              <h4 className="formhead-title">
                {t("finance:buywhat", { item: cryptoCurrency })}
              </h4>
              <div className="formhead-curr">
                <IconSet sprite="sprtsmclrd" size="16" name="wallet" />
                <p>49,950,000.00 {fiatCurrency}</p>
              </div>
            </div>
            <div className="formfieldset">
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("price")}</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" />
                  <InputGroupAddon addonType="append">
                    <Input
                      className="custom-select"
                      type="select"
                      value={selectedBuyPrice}
                      onChange={({ target }) => {
                        setSelectedBuyPrice(target.value);
                      }}
                    >
                      {buySellCurrencies.map((el, idx) => {
                        return <option key={`${el}_${idx}`}>{el}</option>;
                      })}
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Limit</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" />
                  <InputGroupAddon addonType="append">
                    <Input
                      className="custom-select"
                      type="select"
                      value={selectedBuyLimit}
                      onChange={({ target }) => {
                        setSelectedBuyLimit(target.value);
                      }}
                    >
                      {buySellCurrencies.map((el, idx) => {
                        return <option key={`${el}_${idx}`}>{el}</option>;
                      })}
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("amount")}</InputGroupText>
                  </InputGroupAddon>
                  <Input />
                  <InputGroupAddon addonType="append">
                    <Input
                      className="custom-select"
                      type="select"
                      value={selectedBuyAmount}
                      onChange={({ target }) => {
                        setSelectedBuyAmount(target.value);
                      }}
                    >
                      {buySellCryptoCurrencies.map((el, idx) => {
                        return <option key={`${el}_${idx}`}>{el}</option>;
                      })}
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </div>
            <div className="formrange">
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>{t("finance:portfolio")}</Label>
                </Col>
                <Col>
                  <div className="rangeprogress">
                    <Progress
                      className="rangeprogress-progress"
                      value={rangeBuyPortfolio}
                    />
                    <div
                        className={`rangeprogress-circle ${buyRangeCircleCls}`}
                        data-val={rangeBuyPortfolio}
                    >
                      {buySellRangePercent.map((el, idx) => {
                        return <span key={`${el}_${idx}`} className={`val-${el}`}></span>;
                      })}
                    </div>
                    <output
                        className="rangeprogress-bubble"
                        style={{left: `calc(${rangeBuyPortfolio}% + (${8 - rangeBuyPortfolio * 0.15}px))`}}
                    >
                      {rangeBuyPortfolio}
                    </output>
                    <Input
                        className="rangeprogress-range custom-range"
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={rangeBuyPortfolio}
                        onChange={({ target }) => {
                          setRangeBuyPortfolio(target.value);
                        }}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>{t("total")}</Label>
                </Col>
                <Col className="text-right">
                  <span>12,000,00.00 {fiatCurrency}</span>
                </Col>
              </Row>
            </div>
            <div className="formbttm">
              <Button variant="success">
                {t("finance:buywhat", { item: cryptoCurrency })}
              </Button>
            </div>
          </Form>
        </Col>
        <Col className="sellcol">
          <Form
            className="buysellaction-form siteformui"
            autoComplete="off"
            noValidate
          >
            <div className="formhead">
              <h4 className="formhead-title">
                {t("finance:sellwhat", { item: cryptoCurrency })}
              </h4>
              <div className="formhead-curr">
                <IconSet sprite="sprtsmclrd" size="16" name="wallet" />
                <p>49,950,000.00 {fiatCurrency}</p>
              </div>
            </div>
            <div className="formfieldset">
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("price")}</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" />
                  <InputGroupAddon addonType="append">
                    <Input
                      className="custom-select"
                      type="select"
                      value={selectedSellPrice}
                      onChange={({ target }) => {
                        setSelectedSellPrice(target.value);
                      }}
                    >
                      {buySellCurrencies.map((el, idx) => {
                        return <option key={`${el}_${idx}`}>{el}</option>;
                      })}
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Limit</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" />
                  <InputGroupAddon addonType="append">
                    <Input
                      className="custom-select"
                      type="select"
                      value={selectedSellLimit}
                      onChange={({ target }) => {
                        setSelectedSellLimit(target.value);
                      }}
                    >
                      {buySellCurrencies.map((el, idx) => {
                        return <option key={`${el}_${idx}`}>{el}</option>;
                      })}
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("amount")}</InputGroupText>
                  </InputGroupAddon>
                  <Input />
                  <InputGroupAddon addonType="append">
                    <Input
                      className="custom-select"
                      type="select"
                      value={selectedSellAmount}
                      onChange={({ target }) => {
                        setSelectedSellAmount(target.value);
                      }}
                    >
                      {buySellCryptoCurrencies.map((el, idx) => {
                        return <option key={`${el}_${idx}`}>{el}</option>;
                      })}
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </div>
            <div className="formrange">
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>{t("finance:portfolio")}</Label>
                </Col>
                <Col>
                  <div className="rangeprogress">
                    <Progress
                      className="rangeprogress-progress"
                      value={rangeSellPortfolio}
                    />
                    <div
                        className={`rangeprogress-circle ${sellRangeCircleCls}`}
                        data-val={rangeSellPortfolio}
                    >
                      {buySellRangePercent.map((el, idx) => {
                        return <span key={`${el}_${idx}`} className={`val-${el}`}></span>;
                      })}
                    </div>
                    <output
                        className="rangeprogress-bubble"
                        style={{left: `calc(${rangeSellPortfolio}% + (${8 - rangeSellPortfolio * 0.15}px))`}}
                    >
                      {rangeSellPortfolio}
                    </output>
                    <Input
                        className="rangeprogress-range custom-range"
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={rangeSellPortfolio}
                        onChange={({ target }) => {
                          setRangeSellPortfolio(target.value);
                        }}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>{t("total")}</Label>
                </Col>
                <Col className="text-right">
                  <span>12,000,00.00 {fiatCurrency}</span>
                </Col>
              </Row>
            </div>
            <div className="formbttm">
              <Button variant="danger">
                {t("finance:sellwhat", { item: cryptoCurrency })}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default BuySellActionStopLimit;
