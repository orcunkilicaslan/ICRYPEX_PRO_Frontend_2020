import { Form, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { Button } from "~/components/Button.jsx";

const OpenOrderDepoWithTabWithdrawPapara = props => {

    return (
        <div className="dandwtab-papara">
            <div className="dandwtab-form">
                <Form className="withdrawpaparaform siteformui" autoComplete="off" noValidate>
                    <div className="formfieldset">
                        <InputGroup className="form-group">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Papara No</InputGroupText>
                            </InputGroupAddon>
                            <div className="form-control">1773547589</div>
                        </InputGroup>
                        <InputGroup className="form-group">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Çekmek İstediğiniz Miktar</InputGroupText>
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
                        <Button variant="secondary" className="active">PAPARA İLE ÇEK</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default OpenOrderDepoWithTabWithdrawPapara;