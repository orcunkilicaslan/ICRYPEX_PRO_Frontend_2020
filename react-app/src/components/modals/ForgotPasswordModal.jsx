import { Fragment, useState } from "react";
import {
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { AlertResult } from "../AlertResult.jsx";

const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY;

export default function ForgotPasswordModal(props) {
  const {
    isOpen,
    clearModals,
    openSigninModal,
    userEmail = "",
    errorMessage,
    submit,
    isResetingPassword,
    ...rest
  } = props;
  const { t } = useTranslation(["login", "form"]);
  const [isResetSent, setIsResetSent] = useState(false);
  const { register, handleSubmit, errors, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      email: userEmail,
    },
  });

  const onSubmit = data => {
    clearErrors();
    try {
      submit(data);
      setIsResetSent(true);
    } catch {}
  };

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
      <ModalHeader toggle={clearModals}>{t("forgotPassword")}</ModalHeader>
      {!isResetSent ? (
        <ModalBody className="modalcomp modalcomp-sign">
          <div className="modalcomp-sign-icon">
            <IconSet sprite="sprtlgclrd" size="50gray" name="user" />
          </div>
          {errorMessage ? (
            <AlertResult error>{errorMessage}</AlertResult>
          ) : null}
          <div className="modalcomp-sign-form">
            <Form
              className="siteformui"
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="labelfocustop">
                <FormGroup
                  className={errors.email ? "inputresult resulterror" : ""}
                >
                  <Input
                    type="email"
                    required
                    name="email"
                    innerRef={register({ required: t("form:isRequired") })}
                  />
                  <Label>{t("email")}</Label>
                  {errors.email && (
                    <FormText className="inputresult resulterror inputintext">
                      {errors.email?.message}
                    </FormText>
                  )}
                </FormGroup>
              </div>
              <div className="recaptcha">
                <div className="recaptcha-area">
                  <div className="recaptcha-check">
                    <ReCAPTCHA
                      className="g-recaptcha"
                      theme="dark"
                      sitekey={RECAPTCHA_KEY}
                    />
                  </div>
                  <Label>{t("notARobot")}</Label>
                </div>
              </div>
              <Button
                variant="success"
                className="w-100 active"
                type="submit"
                disabled={isResetingPassword}
              >
                ŞİFREMİ SIFIRLA
              </Button>
            </Form>
          </div>
        </ModalBody>
      ) : (
        <Fragment>
          <ModalBody className="modalcomp-sign modal-confirm text-center">
            <div className="animation-alert-icons">
              <div className="alert-icons alert-icons-success">
                <div className="alert-icons-success-tip" />
                <div className="alert-icons-success-long" />
              </div>
            </div>
            <h4>Parolanız Sıfırlanmıştır</h4>
            <p>Parola sıfırlama isteğiniz e-posta adresinize gönderilmiştir.</p>
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
