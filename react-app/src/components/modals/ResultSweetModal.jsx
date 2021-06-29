import { Fragment } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { useLocaleUpperCase } from "~/state/hooks";

export default function ResultSweetModal(props) {
  const { isOpen, clearModals, isSuccess, ...rest } = props;
  const { t } = useTranslation(["finance", "common"]);
  const toUpperCase = useLocaleUpperCase();

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

      {isSuccess ? (
        <Fragment>
          <ModalBody className="modal-confirm">
            <div className="animation-alert-icons">
              <div className="alert-icons alert-icons-success">
                <div className="alert-icons-success-tip" />
                <div className="alert-icons-success-long" />
              </div>
            </div>
            <h4>{t("finance:transactionConfirmation")}</h4>
            <p>{t("common:success")}</p>
          </ModalBody>
          <ModalFooter className="row">
            <Button
              variant="secondary"
              className="active col"
              onClick={clearModals}
            >
              {toUpperCase(t("common:close"))}
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
            <h4>{t("finance:transactionConfirmation")}</h4>
            <p>{t("common:failed")}</p>
          </ModalBody>
          <ModalFooter className="row">
            <Button
              variant="secondary"
              className="active col"
              onClick={clearModals}
            >
              {toUpperCase(t("common:close"))}
            </Button>
          </ModalFooter>
        </Fragment>
      )}
    </Modal>
  );
}
