import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import { Button } from "../Button.jsx";

export default function OrderOpenOrdersFilter(props) {
  const {
    isOpen,
    clearModals,
    ...rest
  } = props;

  return (
    <Modal
        wrapClassName=""
        modalClassName="modal-rightside"
        size="sm"
        isOpen={isOpen}
        toggle={clearModals}
        keyboard={false}
        fade={false}
        autoFocus={false}
        backdrop="static"
        {...rest}
    >
      <ModalHeader toggle={clearModals}>AÇIK EMİRLER FİLTRE</ModalHeader>
      <ModalBody className="modalcomp modalcomp-filters">
        <Form
            className="modalfiltersform siteformui"
            autoComplete="off"
            noValidate
        >
          <FormGroup tag="fieldset">
            <legend>İşlem Çiftleri</legend>
            <FormGroup className="checkradioboxed">
              <div className="custom-control custom-checkbox custom-control-inline">
                <Input
                    className="custom-control-input"
                    type="checkbox"
                    id="filterPairBTCUSD"
                />
                <Label
                    className="custom-control-label btn btn-sm btn-secondary"
                    htmlFor="filterPairBTCUSD"
                    defaultChecked
                >
                  BTC/USD
                </Label>
              </div>
              <div className="custom-control custom-checkbox custom-control-inline">
                <Input
                    className="custom-control-input"
                    type="checkbox"
                    id="filterPairETHUSD"
                />
                <Label
                    className="custom-control-label btn btn-sm btn-secondary"
                    htmlFor="filterPairETHUSD"
                    defaultChecked
                >
                  ETH/USD
                </Label>
              </div>
              <div className="custom-control custom-checkbox custom-control-inline">
                <Input
                    className="custom-control-input"
                    type="checkbox"
                    id="filterPairLTCUSD"
                />
                <Label
                    className="custom-control-label btn btn-sm btn-secondary"
                    htmlFor="filterPairLTCUSD"
                    defaultChecked
                >
                  LTC/USD
                </Label>
              </div>
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>İşlem Tipi</legend>
            <FormGroup>
              <Input
                  className="custom-select"
                  type="select"
              >
                {["İşlem Tipi", "Alış", "Satış"].map((el, idx) => {
                  return (
                      <option value={idx + 1} key={`${el}_${idx}`}>
                        {el}
                      </option>
                  );
                })}
              </Input>
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>İşlem Durumu</legend>
            <FormGroup>
              <Input
                  className="custom-select"
                  type="select"
              >
                {["Durumu", "Tamamlandı", "İptal"].map((el, idx) => {
                  return (
                      <option value={idx + 1} key={`${el}_${idx}`}>
                        {el}
                      </option>
                  );
                })}
              </Input>
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <Button variant="primary" className="w-100">
              İŞLEMLERİ FİLTRELE
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
}
