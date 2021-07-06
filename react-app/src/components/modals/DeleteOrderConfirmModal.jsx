import { Fragment } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { useLocaleUpperCase } from "~/state/hooks/";

export default function DeleteOrderConfirmModal(props) {
  const {
    isOpen,
    errorMessage,
    successMessage,
    clearModals,
    onConfirm,
    ...rest
  } = props;
  const { t } = useTranslation(["common", "finance"]);
  const toUpperCase = useLocaleUpperCase();

  const renderInit = () => {
    return (
      <Fragment>
        <ModalBody className="modal-confirm">
          <h4>{t("finance:transactionConfirmation")}</h4>
          <p>{t("finance:orderDeleteConfirm")}</p>
        </ModalBody>
        <ModalFooter className="row">
          <Button
            variant="secondary"
            className="active col"
            onClick={clearModals}
          >
            {toUpperCase(t("cancel"))}
          </Button>
          <Button variant="success" className="active col" onClick={onConfirm}>
            {toUpperCase(t("confirm"))}
          </Button>
        </ModalFooter>
      </Fragment>
    );
  };

  const renderSuccess = () => {
    return (
      <Fragment>
        <ModalBody className="modal-confirm">
          <div className="animation-alert-icons">
            <div className="alert-icons alert-icons-success">
              <div className="alert-icons-success-tip" />
              <div className="alert-icons-success-long" />
            </div>
          </div>
          <h4>{t("success")}</h4>
          <p>{successMessage}</p>
        </ModalBody>
        <ModalFooter className="row">
          <Button
            variant="secondary"
            className="active col"
            onClick={clearModals}
          >
            {toUpperCase(t("close"))}
          </Button>
        </ModalFooter>
      </Fragment>
    );
  };

  const renderError = () => {
    return (
      <Fragment>
        <ModalBody className="modal-confirm text-center">
          <div className="animation-alert-icons">
            <div className="alert-icons alert-icons-error">
              <div className="alert-icons-error-x">
                <div className="alert-icons-error-x-left"></div>
                <div className="alert-icons-error-x-right"></div>
              </div>
            </div>
          </div>
          <h4>{t("failed")}</h4>
          <p>{errorMessage}</p>
        </ModalBody>
        <ModalFooter className="row">
          <Button
            variant="secondary"
            className="active col"
            onClick={clearModals}
          >
            {toUpperCase(t("close"))}
          </Button>
        </ModalFooter>
      </Fragment>
    );
  };

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
      {errorMessage ? renderError() : null}
      {!errorMessage && (!successMessage ? renderInit() : renderSuccess())}
    </Modal>
  );
}
