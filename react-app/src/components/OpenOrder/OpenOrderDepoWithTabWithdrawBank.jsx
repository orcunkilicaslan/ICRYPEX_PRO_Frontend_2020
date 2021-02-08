import { useState} from "react";
import { Form, Row, Col, InputGroup, InputGroupAddon, Input } from "reactstrap";
import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";

const banksSelect = ["Hesap Seçiniz", "Akbank", "Garanti", "Finansbank"];

const OpenOrderDepoWithTabWithdrawBank = props => {

    const [bankSelect, setBankSelect] = useState(banksSelect[0]);

    return (
        <div className="dandwtab-bank">
            <div className="dandwtab-form">
                <Form className="withdrawbankform siteformui" autoComplete="off" noValidate>
                    <div className="formfieldset">
                        <InputGroup className="form-group">
                            <Input
                                className="custom-select"
                                type="select"
                                value={bankSelect}
                                onChange={({ target }) => {
                                    setBankSelect(target.value);
                                }}
                            >
                                {banksSelect.map((el, idx) => {
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
                        <InputGroup className="form-group col">
                            <Input type="text" placeholder="Çekmek İstenilen Miktar" />
                            <div className="form-control totalbalance text-right">
                                <small>Bakiye</small>
                                999,999.00 TRY
                            </div>
                            <InputGroupAddon addonType="append">
                                <Button variant="secondary" className="active">
                                    <IconSet sprite="sprtsmclrd" size="16" name="transfer" />
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <Row form className="form-group">
                            <Col>İşlem Ücreti</Col>
                            <Col xs="auto">15.00 TRY</Col>
                        </Row>
                        <Row form className="form-group">
                            <Col>Hesaba Geçecek Miktar</Col>
                            <Col xs="auto">999,999.00 TRY</Col>
                        </Row>
                    </div>
                    <div className="formbttm">
                        <Button variant="secondary" className="active">ÇEKME İSTEĞİ GÖNDER</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default OpenOrderDepoWithTabWithdrawBank;