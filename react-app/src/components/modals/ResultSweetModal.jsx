import {Fragment} from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "../Button.jsx";

export default function ResultSweetModal(props) {
  const {
    isOpen,
    clearModals,
    ...rest
  } = props;

  return (
      <Modal
          wrapClassName=""
          modalClassName=""
          className="text-center"
          size="sm"
          isOpen={isOpen}
          toggle={clearModals}
          keyboard={false}
          fade={false}
          autoFocus={false}
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
              <ModalBody className="modal-confirm">
                <div className="animation-alert-icons">
                  <div className="alert-icons alert-icons-success">
                    <div className="alert-icons-success-tip" />
                    <div className="alert-icons-success-long" />
                  </div>
                </div>
                <h4>İşlem Onayı</h4>
                <p>İşleminiz Başarıyla Gerçekleştirildi.</p>
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
        ) : (
            <Fragment>
              <ModalBody className="modal-confirm">
                <div className="animation-alert-icons">
                  <div className="alert-icons alert-icons-error">
                    <div className="alert-icons-error-x">
                      <div className="alert-icons-error-x-left"></div>
                      <div className="alert-icons-error-x-right"></div>
                    </div>
                  </div>
                </div>
                <h4>İşlem Başarısız</h4>
                <p>İşleminiz Başarısızlıkla Sonuçlandı.</p>
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
