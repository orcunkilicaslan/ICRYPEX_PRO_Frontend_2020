import { useState } from "react";
import { Form, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup } from "reactstrap";
import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet";

const cryptoCurrencies = ["BTC", "ETH", "LTC"];
const cryptoAddresses = ["Adres Seçiniz", "0x4A356640831fF69F10fCd55Be27588c51d34384c"];

const OpenOrderDepoWithTabWithdrawCrypto = props => {

    const [cryptoCurrency, setCryptoCurrency] = useState(cryptoCurrencies[0]);
    const [cryptoAddress, setCryptoAddress] = useState(cryptoAddresses[0]);

    return (
        <div className="dandwtab-crypto">
            <div className="dandwtab-form">
                <Form className="withdrawcryptoform siteformui" autoComplete="off" noValidate>
                    <div className="formfieldset">
                        <Row form>
                            <FormGroup className="col-auto">
                                <Input
                                    className="custom-select"
                                    type="select"
                                    value={cryptoCurrency}
                                    onChange={({ target }) => {
                                        setCryptoCurrency(target.value);
                                    }}
                                >
                                    {cryptoCurrencies.map((el, idx) => {
                                        return (
                                            <option key={`${el}_${idx}`}>
                                                {el}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                            <InputGroup className="form-group col">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Miktar</InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>{cryptoCurrency}</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Row>
                        <InputGroup className="form-group">
                            <Input
                                className="custom-select"
                                type="select"
                                value={cryptoAddress}
                                onChange={({ target }) => {
                                    setCryptoAddress(target.value);
                                }}
                            >
                                {cryptoAddresses.map((el, idx) => {
                                    return (
                                        <option disabled={idx === 0} key={`${el}_${idx}`}>
                                            {el}
                                        </option>
                                    );
                                })}
                            </Input>
                            <InputGroupAddon addonType="append">
                                <Button variant="secondary" className="active">
                                    <IconSet sprite="sprtsmclrd" size="16" name="addbtn" />
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <Row form className="form-group">
                            <Col>Transfer Ücreti</Col>
                            <Col xs="auto">15.00 TRY</Col>
                        </Row>
                        <Row form className="form-group">
                            <Col>Hesaba Geçecek Miktar</Col>
                            <Col xs="auto">999,999.00 TRY</Col>
                        </Row>
                    </div>
                    <div className="formbttm">
                        <Button variant="secondary" className="active">ONAY E-POSTA GÖNDER</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default OpenOrderDepoWithTabWithdrawCrypto;