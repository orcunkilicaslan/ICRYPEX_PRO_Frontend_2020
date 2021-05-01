import {Fragment} from "react";
import {Col, Form, FormGroup, Input, Label, CustomInput, Modal, ModalBody, ModalFooter} from "reactstrap";
import { Button } from "../Button.jsx";

export default function AddBankAccountModal(props) {
  const {
    isOpen,
    isSuccess,
    clearModals,
    ...rest
  } = props;

  return (
      <Modal
          wrapClassName=""
          modalClassName=""
          isOpen={isOpen}
          toggle={clearModals}
          keyboard={false}
          fade={false}
          autoFocus={false}
          backdrop="static"
          centered
          {...rest}
      >
        <div className="modal-close">
          <Button className="close" onClick={clearModals}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>

        { 0 === 0 ? (
            <Fragment>
              <ModalBody>
                <Form
                    className="siteformui"
                    autoComplete="off"
                    noValidate
                >
                  <h4 className="text-center">Yeni Banka Hesabı Ekle</h4>
                  <div className="labelfocustop mt-3">
                    <FormGroup>
                      <Input
                          type="text"
                          required
                      />
                      <Label>Hesap İsmi</Label>
                    </FormGroup>
                    <FormGroup>
                      <Input
                          type="text"
                          required
                      />
                      <Label>IBAN</Label>
                    </FormGroup>
                  </div>
                  <FormGroup className="mt-3 text-center">
                    <FormGroup check inline>
                      <CustomInput id="AddBankCurrTRY" type="radio" name="customRadio" label="Türk Lirası - TRY" />
                    </FormGroup>
                    <FormGroup check inline>
                      <CustomInput id="AddBankCurrUSD" type="radio" name="customRadio" label="ABD Doları - USD" />
                    </FormGroup>
                  </FormGroup>
                  <Button
                      variant="primary"
                      className="w-100 mt-2"
                      type="submit"
                  >
                    HESAP EKLE
                  </Button>
                </Form>
              </ModalBody>
            </Fragment>
        ) : (
            <Fragment>
              <ModalBody className="modal-confirm text-center">
                <div className="animation-alert-icons">
                  <div className="alert-icons alert-icons-success">
                    <div className="alert-icons-success-tip" />
                    <div className="alert-icons-success-long" />
                  </div>
                </div>
                <h4>Başarılı</h4>
                <p>Yeni Banka Başarıyla Eklendi.</p>
              </ModalBody>
              <ModalFooter className="row">
                <Button
                    variant="secondary"
                    className="active col"
                    onClick={clearModals}
                >
                  KAPAT
                </Button>
              </ModalFooter>
            </Fragment>
        )}

      </Modal>
  );
}
