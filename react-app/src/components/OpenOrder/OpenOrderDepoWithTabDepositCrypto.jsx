import { useState } from "react";
import { Row, Form, FormGroup, InputGroup, InputGroupAddon, Input } from "reactstrap";
import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";

const cryptoCurrencies = ["BTC", "ETH", "LTC"];

const OpenOrderDepoWithTabDepositCrypto = props => {

    const [cryptoCurrency, setCryptoCurrency] = useState(cryptoCurrencies[0]);

    return (
        <div className="dandwtab-crypto">
            <div className="dandwtab-form">
                <Form className="depositcryptoform siteformui" autoComplete="off" noValidate>
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
                                <div className="form-control textoverflowellipsis text-right">0x4A356640831fF69F10fCd55Be27588c51d34384c</div>
                                <InputGroupAddon addonType="append">
                                    <Button variant="secondary" className="active">
                                        <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
                                    </Button>
                                    <Button variant="secondary" className="active">
                                        <IconSet sprite="sprtsmclrd" size="16" name="qrcode" />
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Row>
                        <p className="sitecolorred">Bu adrese sadece BTC gönderin. Farklı bir coin göndermek yatırdıklarınızın kaybolmasına neden olur.</p>
                    </div>
                </Form>
                <div className="bttminfolist">
                    <ul>
                        <li>Kopyaladığınız adresin yapıştırdığınız alanda doğruluğunu mutlaka kontrol ediniz.</li>
                        <li>Yatırılabilen en az tutar 0.0001 BTC’dir. 0.0001 BTC altındaki yatırma işlemleri iade edilmeyecektir.</li>
                        <li>Gönderdiğiniz tutar otomatik olarak hesabınıza geçecektir.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OpenOrderDepoWithTabDepositCrypto;