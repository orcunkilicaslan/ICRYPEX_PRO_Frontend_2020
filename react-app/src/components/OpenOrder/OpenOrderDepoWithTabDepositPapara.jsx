import { Form, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { Button } from "~/components/Button.jsx";

const OpenOrderDepoWithTabDepositPapara = props => {

    return (
        <div className="dandwtab-papara">
            <div className="dandwtab-form">
                <Form className="depositpaparaform siteformui" autoComplete="off" noValidate>
                    <div className="formfieldset">
                        <InputGroup className="form-group">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Fiyat</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>TRY</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        <Row form className="form-group">
                            <Col>Papara komisyonu  (%2 + KDV)</Col>
                            <Col xs="auto">15.00 TRY</Col>
                        </Row>
                        <Row form className="form-group">
                            <Col>Hesaba Geçecek Miktar</Col>
                            <Col xs="auto">999,999.00 TRY</Col>
                        </Row>
                    </div>
                    <div className="formbttm">
                        <Button variant="secondary" className="active">PAPARA İLE YATIR</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default OpenOrderDepoWithTabDepositPapara;