import { useState } from "react";
import { Row, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { IconSet } from "~/components/IconSet.jsx";
import { Button } from "~/components/Button.jsx";

const bankCurrencies = ["TRY", "USD", "EUR"];

const OpenOrderDepoWithTabDepositBankAkbank = props => {

    const [bankCurrency, setBankCurrency] = useState(bankCurrencies[0]);

    return (
        <div className="dandwtab-form">
            <Form className="depositbankform siteformui" autoComplete="off" noValidate>
                <Row form>
                    <FormGroup className="col-auto">
                        <Input
                            className="custom-select"
                            type="select"
                            value={bankCurrency}
                            onChange={({ target }) => {
                                setBankCurrency(target.value);
                            }}
                        >
                            {bankCurrencies.map((el, idx) => {
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
                            <InputGroupText>IBAN</InputGroupText>
                        </InputGroupAddon>
                        <div className="form-control textoverflowellipsis">TR140004600420888000174052</div>
                        <InputGroupAddon addonType="append">
                            <Button variant="secondary" className="active">
                                <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Row>
                <InputGroup className="form-group">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Hesap Sahibi</InputGroupText>
                    </InputGroupAddon>
                    <div className="form-control textoverflowellipsis">Icrpex Bilişim A.Ş.</div>
                    <InputGroupAddon addonType="append">
                        <Button variant="secondary" className="active">
                            <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        </div>
    );
};

export default OpenOrderDepoWithTabDepositBankAkbank;