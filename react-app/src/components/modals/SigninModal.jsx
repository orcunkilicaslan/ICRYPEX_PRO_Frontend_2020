import {
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { AlertResult } from "../AlertResult.jsx";

const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY;

export default function SigninModal(props) {
  const {
    isOpen,
    clearModals,
    userEmail = "",
    errorMessage,
    submit,
    isSigningin,
    openForgotPassConfirmModal,
    ...rest
  } = props;
  const { t } = useTranslation(["login", "form"]);
  const { register, handleSubmit, errors, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      emailornationalid: userEmail,
      password: "",
    },
  });

  const [passShow, setPassShow] = useState(false);
  const toggleTypePass = () => {
    setPassShow(passShow ? false : true);
  };

  const onSubmit = data => {
    clearErrors();
    submit(data);
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
      <ModalHeader toggle={clearModals}>{t("signin")}</ModalHeader>
      <ModalBody className="modalcomp modalcomp-sign">
        <div className="modalcomp-sign-icon">
          <IconSet sprite="sprtlgclrd" size="50gray" name="user" />
        </div>
        {errorMessage ? <AlertResult error>{errorMessage}</AlertResult> : null}
        <div className="modalcomp-sign-form">
          <Form
            className="siteformui"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="labelfocustop">
              <FormGroup
                  className={errors.emailornationalid && ("inputresult resulterror")}
              >
                <Input
                  type="email"
                  required
                  name="emailornationalid"
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label>{t("email")}</Label>
                {errors.emailornationalid && (
                    <FormText className="inputresult resulterror inputintext">
                      {errors.emailornationalid?.message}
                    </FormText>
                )}
              </FormGroup>
              <FormGroup
                  className={errors.password && ("inputresult resulterror")}
              >
                <Input
                  className="signuppassword"
                  type={passShow ? "text" : "password"}
                  required
                  name="password"
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label>{t("password")}</Label>
                <Button
                  className="showhidepass"
                  onClick={toggleTypePass}
                >
                  <IconSet sprite="sprtsmclrd" size="14" name="showhide" />
                </Button>
                {errors.password && (
                    <FormText className="inputresult resulterror inputintext">
                      {errors.password?.message}
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
              <div>
                <Button variant="link" onClick={openForgotPassConfirmModal}>
                  {t("forgotPassword")}
                </Button>
              </div>
            </div>
            <Button
              variant="secondary"
              className="w-100 active"
              type="submit"
              disabled={isSigningin}
            >
              {t("sendCode").toUpperCase()}
            </Button>
          </Form>
        </div>
      </ModalBody>
    </Modal>
  );
}
