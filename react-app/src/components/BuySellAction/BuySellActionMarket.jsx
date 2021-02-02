import { useSelector } from "react-redux";
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

import { IconSet } from "../IconSet.jsx";
import { Button } from "../Button.jsx";
import { LoginButtons } from "../LoginButtons";

const BuySellActionMarket = props => {
  const { openSigninModal, openSignupModal } = props;
  const { accesstoken } = useSelector(state => state.api);

  const [selectedBuyPrice, setSelectedBuyPrice] = useState("");
  const [selectedBuyAmount, setSelectedBuyAmount] = useState("");
  const [rangeBuyPortfolio, setRangeBuyPortfolio] = useState("");
  const [selectedSellPrice, setSelectedSellPrice] = useState("");
  const [selectedSellAmount, setSelectedSellAmount] = useState("");
  const [rangeSellPortfolio, setRangeSellPortfolio] = useState("");

  return (
    <div className="buysellaction-market">
      <Row className="buysellaction-formarea">
        <Col className="buycol">
          <Form
            className="buysellaction-form siteformui"
            autoComplete="off"
            noValidate
          >
            <div className="formhead">
              <h4 className="formhead-title">BTC AL</h4>
              <div className="formhead-curr">
                <IconSet sprite="sprtsmclrd" size="16" name="wallet" />
                <p>{accesstoken ? "49,950,000.00" : "-"} TRY</p>
              </div>
            </div>
            <div className="formfieldset">
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Fiyat</InputGroupText>
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
                      {["TRY", "USD"].map((el, idx) => {
                        return <option key={`${el}_${idx}`}>{el}</option>;
                      })}
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Miktar</InputGroupText>
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
                      {["BTC", "ETH"].map((el, idx) => {
                        return <option key={`${el}_${idx}`}>{el}</option>;
                      })}
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </div>
            <div className="formrange">
              {accesstoken ? (
                <Row className="aligncenter">
                  <Col xs="auto">
                    <Label>Portföy</Label>
                  </Col>
                  <Col>
                    <div className="rangeprogress">
                      <Progress
                        className="rangeprogress-progress"
                        value={rangeBuyPortfolio}
                      />
                    </div>
                    <div
                      className="rangeprogress-circle d-none"
                      data-val={rangeBuyPortfolio}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <output className="rangeprogress-bubble"></output>
                    <Input
                      className="rangeprogress-range custom-range"
                      type="range"
                      min={100 / 4}
                      max={100}
                      step={100 / 4}
                      value={rangeBuyPortfolio}
                      onChange={({ target }) => {
                        setRangeBuyPortfolio(target.value);
                      }}
                    />
                  </Col>
                </Row>
              ) : null}
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>Toplam</Label>
                </Col>
                <Col className="text-right">
                  <span>{accesstoken ? "12,000,00.00" : "-"} TRY</span>
                </Col>
              </Row>
            </div>
            <div className="formbttm">
              <div className="formbttm">
                {accesstoken ? (
                  <Button variant="success">BTC AL</Button>
                ) : (
                  <LoginButtons
                    openSigninModal={openSigninModal}
                    openSignupModal={openSignupModal}
                  />
                )}
              </div>
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
              <h4 className="formhead-title">BTC SAT</h4>
              <div className="formhead-curr">
                <IconSet sprite="sprtsmclrd" size="16" name="wallet" />
                <p>49,950,000.00 TRY</p>
              </div>
            </div>
            <div className="formfieldset">
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Fiyat</InputGroupText>
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
                      {["TRY", "USD"].map((el, idx) => {
                        return <option key={`${el}_${idx}`}>{el}</option>;
                      })}
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Miktar</InputGroupText>
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
                      {["BTC", "ETH"].map((el, idx) => {
                        return <option key={`${el}_${idx}`}>{el}</option>;
                      })}
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </div>
            <div className="formrange">
              {accesstoken ? (
                <Row className="aligncenter">
                  <Col xs="auto">
                    <Label>Portföy</Label>
                  </Col>
                  <Col>
                    <div className="rangeprogress">
                      <Progress
                        className="rangeprogress-progress"
                        value={rangeSellPortfolio}
                      />
                    </div>
                    <div
                      className="rangeprogress-circle d-none"
                      data-val={rangeSellPortfolio}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <output className="rangeprogress-bubble"></output>
                    <Input
                      className="rangeprogress-range custom-range"
                      type="range"
                      min={100 / 4}
                      max={100}
                      step={100 / 4}
                      value={rangeSellPortfolio}
                      onChange={({ target }) => {
                        setRangeSellPortfolio(target.value);
                      }}
                    />
                  </Col>
                </Row>
              ) : null}
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>Toplam</Label>
                </Col>
                <Col className="text-right">
                  <span>{accesstoken ? "12,000,00.00" : "-"} TRY</span>
                </Col>
              </Row>
            </div>
            <div className="formbttm">
              {accesstoken ? (
                <Button variant="danger">BTC SAT</Button>
              ) : (
                <LoginButtons
                  openSigninModal={openSigninModal}
                  openSignupModal={openSignupModal}
                />
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default BuySellActionMarket;
