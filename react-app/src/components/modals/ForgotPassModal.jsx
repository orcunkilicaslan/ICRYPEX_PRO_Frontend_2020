import { Fragment, useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { AlertResult } from "../AlertResult.jsx";

export default function ForgotPassModal(props) {
  const {
    isOpen,
    clearModals,
    errorMessage,
    submit,
    isResetingPassword,
    openSigninModal,
    ...rest
  } = props;
  const { t } = useTranslation(["login", "form"]);
  const [isResetSent, setIsResetSent] = useState(false);

  const onClick = async () => {
    try {
      await submit();
      setIsResetSent(true);
    } catch {}
  };

  useEffect(() => {
    if (isResetSent) setIsResetSent(false);
  }, [isOpen, isResetSent]);

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
      backdrop="static"
      centered
      {...rest}
    >
      <div className="modal-close">
        <Button className="close" onClick={clearModals}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </div>
      {errorMessage ? <AlertResult error>{errorMessage}</AlertResult> : null}
      {!isResetSent ? (
        <Fragment>
          <ModalBody className="modal-confirm">
            <div className="animation-alert-icons">
              <div className="alert-icons alert-icons-warning">
                <div className="alert-icons-warning-body" />
                <div className="alert-icons-warning-dot" />
              </div>
            </div>
            <h4>Parola Sıfırlama</h4>
            <p>Parolanızı sıfırlamak istediğinizden emin misiniz?</p>
          </ModalBody>
          <ModalFooter className="row">
            <Button
              variant="secondary"
              className="active col"
              onClick={clearModals}
            >
              İPTAL ET
            </Button>
            <Button
              variant="success"
              className="active col"
              onClick={onClick}
              disabled={isResetingPassword}
            >
              ONAYLA
            </Button>
          </ModalFooter>
        </Fragment>
      ) : (
        <Fragment>
          <ModalBody className="modal-confirm">
            <div className="animation-alert-icons">
              <div className="alert-icons alert-icons-success">
                <div className="alert-icons-success-tip" />
                <div className="alert-icons-success-long" />
              </div>
            </div>
            <h4>Parolanız Sıfırlanmıştır</h4>
            <p>Parolanız kayıtlı telefonunuza SMS olarak gönderilmiştir.</p>
          </ModalBody>
          <ModalFooter className="row">
            <Button variant="success" className="col" onClick={openSigninModal}>
              {t("signin")}
            </Button>
          </ModalFooter>
        </Fragment>
      )}
    </Modal>
  );
}
