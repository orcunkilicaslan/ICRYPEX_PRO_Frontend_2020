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
import { useState, Fragment, useEffect } from "react";
import ms from "ms";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { useLocaleUpperCase } from "~/state/hooks/";
import { setUserEmail } from "~/state/slices/user.slice";
import { verifyCaptcha } from "~/util/";
import { ProgressRing } from "../ProgressRing.jsx";

const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY;

export default function SigninModal(props) {
  const {
    isOpen,
    clearModals,
    userEmail = "",
    signinError,
    verifyError,
    handleSignin,
    handleVerify,
    isSigningin,
    isVerifying,
    openForgotPassConfirmModal,
    ...rest
  } = props;
  const { t } = useTranslation(["login", "form"]);
  const toUpperCase = useLocaleUpperCase();
  const {
    register: registerSignin,
    handleSubmit: submitSignin,
    errors: errorsSignin,
    clearErrors: clearErrorsSignin,
    setValue: setValueSignin,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      emailornationalid: userEmail,
      password: "",
      recaptcha: "",
    },
  });
  const {
    register: registerVerify,
    handleSubmit: submitVerify,
    errors: errorsVerify,
    clearErrors: clearErrorsVerify,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });
  const [passShow, setPassShow] = useState(false);
  const [onSigninStep, setOnSigninStep] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const expiresIn = ms("3m");
    let id;

    if (!onSigninStep) {
      id = setInterval(() => {
        setProgress(progress => progress - 100 / expiresIn);
      }, ms("1s"));
    }

    return () => clearInterval(id);
  }, [onSigninStep]);

  const toggleTypePass = () => {
    setPassShow(passShow ? false : true);
  };

  const onSubmitSignin = data => {
    const { recaptcha, ...rest } = data;

    clearErrorsSignin();
    if (recaptcha) {
      handleSignin(rest);
      setOnSigninStep(false);
    }
  };

  const onSubmitVerify = data => {
    clearErrorsVerify();
    handleVerify(data);
  };

  const onCaptcha = async value => {
    if (value === null) {
      setValueSignin("recaptcha", ""); // captcha expired
    } else {
      if (await verifyCaptcha(value)) {
        clearErrorsSignin("recaptcha");
        setValueSignin("recaptcha", "valid");
      }
    }
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
      returnFocusAfterClose={false}
      {...rest}
    >
      <ModalHeader toggle={clearModals}>{toUpperCase(t("signin"))}</ModalHeader>
      <ModalBody className="modalcomp modalcomp-sign">
        <div className="modalcomp-sign-icon">
          <IconSet sprite="sprtlgclrd" size="50gray" name="user" />
        </div>
        {onSigninStep ? (
          signinError ? (
            <AlertResult error>{signinError}</AlertResult>
          ) : null
        ) : verifyError ? (
          <AlertResult error>{verifyError}</AlertResult>
        ) : null}
        <div className="modalcomp-sign-form">
          <Form
            className="siteformui"
            autoComplete="off"
            noValidate
            onSubmit={submitSignin(onSubmitSignin)}
            // TODO: setUserEmail
          >
            <div className="labelfocustop">
              <FormGroup
                className={
                  errorsSignin.emailornationalid && "inputresult resulterror"
                }
              >
                <Input
                  type="email"
                  required
                  name="emailornationalid"
                  innerRef={registerSignin({
                    required: t("form:isRequired"),
                  })}
                />
                <Label>{t("email")}</Label>
                {errorsSignin.emailornationalid && (
                  <FormText className="inputresult resulterror inputintext">
                    {errorsSignin.emailornationalid?.message}
                  </FormText>
                )}
              </FormGroup>
              <FormGroup
                className={errorsSignin.password && "inputresult resulterror"}
              >
                <Input
                  className="signuppassword"
                  type={passShow ? "text" : "password"}
                  required
                  name="password"
                  innerRef={registerSignin({
                    required: t("form:isRequired"),
                    minLength: {
                      value: 8,
                      message: t("form:shouldBeMinLength", { value: 8 }),
                    },
                    maxLength: {
                      value: 30,
                      message: t("form:shouldBeMaxLength", { value: 30 }),
                    },
                  })}
                />
                <Label>{t("password")}</Label>
                <Button className="showhidepass" onClick={toggleTypePass}>
                  <IconSet sprite="sprtsmclrd" size="14" name="showhide" />
                </Button>
                {errorsSignin.password && (
                  <FormText className="inputresult resulterror inputintext">
                    {errorsSignin.password?.message}
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
                    onChange={onCaptcha}
                  />
                </div>
                <Input
                  className="d-none"
                  name="recaptcha"
                  innerRef={registerSignin({
                    required: t("form:isRequired"),
                  })}
                />
                <Label>{t("notARobot")}</Label>
                {errorsSignin.recaptcha && (
                  <FormText className="inputresult resulterror inputintext">
                    {errorsSignin.recaptcha?.message}
                  </FormText>
                )}
              </div>
              <div>
                <Button variant="link" onClick={openForgotPassConfirmModal}>
                  {t("forgotPassword")}
                </Button>
              </div>
            </div>
            <Button
              variant={onSigninStep ? "success" : "secondary"}
              className="w-100 active"
              type="submit"
              disabled={isSigningin || !onSigninStep}
            >
              {t("sendCode").toUpperCase()}
            </Button>
          </Form>

          {!onSigninStep && (
            <Fragment>
              <hr />
              <ProgressRing
                radius={35}
                strokeWidth={4}
                stroke="#e84a55"
                progress={progress}
              />
              <Form
                className="siteformui"
                autoComplete="off"
                noValidate
                onSubmit={submitVerify(onSubmitVerify)}
              >
                <span>Tekrar gönder</span>
                <div className="labelfocustop">
                  <FormGroup>
                    <Input
                      className="text-center"
                      type="text"
                      name="code"
                      required
                      innerRef={registerVerify({
                        required: t("form:isRequired"),
                        maxLength: {
                          value: 6,
                          message: t("form:shouldBeMaxLength", { value: 6 }),
                        },
                      })}
                    />
                    <Label className="text-center">
                      {t("verificationCode")}
                    </Label>
                    {errorsVerify.code && (
                      <FormText className="inputresult resulterror">
                        {errorsVerify.code?.message}
                      </FormText>
                    )}
                  </FormGroup>
                </div>
                <Button
                  type="submit"
                  variant="success"
                  className="w-100 mt-2"
                  disabled={isVerifying}
                >
                  {t("signin")}
                </Button>
              </Form>
            </Fragment>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
}
