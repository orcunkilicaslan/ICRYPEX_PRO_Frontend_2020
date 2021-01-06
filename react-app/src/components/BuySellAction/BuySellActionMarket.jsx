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

const BuySellActionMarket = props => {
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
                    <Input className="custom-select" type="select" name="curr">
                      <option>TRY</option>
                      <option>USD</option>
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
                    <Input className="custom-select" type="select" name="coin">
                      <option>BTC</option>
                      <option>ETH</option>
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </div>
            <div className="formrange">
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>Portföy</Label>
                </Col>
                <Col>
                  <div className="rangeprogress">
                    <Progress
                      className="rangeprogress-progress"
                      value={100 / 4}
                    />
                  </div>
                  <div className="rangeprogress-circle d-none" data-val="">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <output className="rangeprogress-bubble"></output>
                  <Input
                    className="rangeprogress-range custom-range"
                    type="range"
                    min="25"
                    max="100"
                    step="25"
                  />
                </Col>
              </Row>
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>Toplam</Label>
                </Col>
                <Col className="text-right">
                  <span>12,000,00.00 TRY</span>
                </Col>
              </Row>
            </div>
            <div className="formbttm">
              <Button
                type="button"
                size=""
                variant="success"
                data-toggle="modal"
                data-target="#buysellModalConfirm"
              >
                BTC AL
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
                    <Input className="custom-select" type="select" name="curr">
                      <option>TRY</option>
                      <option>USD</option>
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
                    <Input className="custom-select" type="select" name="coin">
                      <option>BTC</option>
                      <option>ETH</option>
                    </Input>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </div>
            <div className="formrange">
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>Portföy</Label>
                </Col>
                <Col>
                  <div className="rangeprogress">
                    <Progress
                      className="rangeprogress-progress"
                      value={100 / 4}
                    />
                  </div>
                  <div className="rangeprogress-circle d-none" data-val="">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <output className="rangeprogress-bubble"></output>
                  <Input
                    className="rangeprogress-range custom-range"
                    type="range"
                    min="25"
                    max="100"
                    step="25"
                  />
                </Col>
              </Row>
              <Row className="aligncenter">
                <Col xs="auto">
                  <Label>Toplam</Label>
                </Col>
                <Col className="text-right">
                  <span>12,000,00.00 TRY</span>
                </Col>
              </Row>
            </div>
            <div className="formbttm">
              <Button
                type="button"
                size=""
                variant="danger"
                data-toggle="modal"
                data-target="#buysellModalConfirm"
              >
                BTC SAT
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default BuySellActionMarket;
