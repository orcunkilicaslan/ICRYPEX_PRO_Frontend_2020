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
import { useState, Fragment, useEffect, useMemo } from "react";
import ms from "ms";
import { useTimer } from "react-timer-hook";
import { addMilliseconds, differenceInSeconds } from "date-fns";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { useLocaleUpperCase } from "~/state/hooks/";
import { verifyCaptcha } from "~/util/";
import { ProgressRing } from "../ProgressRing.jsx";

const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY;
const VERIFICATION_EXPIRY = ms("3m");
const EXPIRY_IN_SECONDS = VERIFICATION_EXPIRY / 1000;

export default function SigninModal(props) {
  const {
    isOpen,
    clearModals,
    user = {},
    errorMessage,
    handleSignin,
    handleVerify,
    isSigningin,
    isVerifying,
    openForgotPassConfirmModal,
    hasSentCode,
    setEmail,
    setHasSentCode,
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
    watch: watchSignin,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      emailornationalid: user.info.email || user.email,
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

  const {
    seconds,
    minutes,
    isRunning: isTimerRunning,
    restart: restartTimer,
  } = useTimer({
    expiryTimestamp: Date.now(),
  });

  const [passShow, setPassShow] = useState(false);
  const [password, setPassword] = useState(null);
  const [expiryTimestamp, setExpiryTimestamp] = useState(null);

  const progress = useMemo(() => {
    if (isTimerRunning && expiryTimestamp) {
      const remaining = differenceInSeconds(expiryTimestamp, Date.now());
      const percent = (100 * remaining) / EXPIRY_IN_SECONDS;

      return percent.toFixed();
    }

    return 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiryTimestamp, isTimerRunning, seconds]);

  useEffect(() => {
    if (hasSentCode) {
      if (!expiryTimestamp) {
        const expiryTimestamp = addMilliseconds(
          Date.now(),
          VERIFICATION_EXPIRY
        );

        setExpiryTimestamp(expiryTimestamp);
        restartTimer(expiryTimestamp);
      }
    } else {
      setExpiryTimestamp(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiryTimestamp, hasSentCode, isTimerRunning]);

  const toggleTypePass = () => {
    setPassShow(passShow ? false : true);
  };

  const onSubmitSignin = data => {
    const { recaptcha, ...rest } = data;
    clearErrorsSignin();

    if (recaptcha) {
      handleSignin(rest);
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

  const resendCode = async () => {
    const data = watchSignin();

    if (isTimerRunning) return;

    const toSend = {
      emailornationalid: data.emailornationalid,
      password: data.password || password,
    };
    const payload = await handleSignin(toSend);

    if (payload?.status) {
      const expiryTimestamp = addMilliseconds(Date.now(), VERIFICATION_EXPIRY);

      setExpiryTimestamp(expiryTimestamp);
      restartTimer(expiryTimestamp);
    }
  };

  const resetCode = () => {
    setHasSentCode(false);
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
        {errorMessage && <AlertResult error>{errorMessage}</AlertResult>}
        <div className="modalcomp-sign-form">
          <Form
            className="siteformui"
            autoComplete="off"
            noValidate
            onSubmit={submitSignin(onSubmitSignin)}
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
                  readOnly={hasSentCode}
                  innerRef={registerSignin({
                    required: t("form:isRequired"),
                  })}
                  onChange={evt => setEmail(evt?.target?.value)}
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
                  readOnly={hasSentCode}
                  onChange={evt => setPassword(evt?.target?.value)}
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
                  <IconSet sprite="sprtsmclrd" size="14" name={passShow ? "eyehide" : "eyeshow"} />
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
                <Button
                  variant="link"
                  onClick={hasSentCode ? () => {} : openForgotPassConfirmModal}
                >
                  {t("forgotPassword")}
                </Button>
              </div>
            </div>
            <Button
              variant={hasSentCode ? "secondary" : "success"}
              className="w-100 active"
              type="submit"
              disabled={isSigningin || hasSentCode}
            >
              {t("sendCode").toUpperCase()}
            </Button>
          </Form>
        </div>

        {hasSentCode && (
            <div className="modalcomp-sign-form verifcode">
              <Button
                  className="close"
                  onClick={resetCode}
                  style={{ marginLeft: "auto" }}
              >
                <span aria-hidden="true">&times;</span>
              </Button>
              <div className="progressring">
                <div className="progressring-circle">
                  <ProgressRing
                      radius={35}
                      strokeWidth={4}
                      stroke="#e84a55"
                      trackStroke="#2a3553"
                      progress={progress}
                  />
                  <span>{`${minutes}:${seconds}`}</span>
                </div>
                <div className="progressring-bttn">
                  <Button
                      className="btn btn-sm btn-link text-muted"
                      style={{
                        opacity: isTimerRunning ? "0" : "1",
                        transition: "opacity .15s ease-out",
                      }}
                      onClick={resendCode}
                  >
                    Tekrar Gönder
                  </Button>
                </div>
              </div>
              <Form
                  className="siteformui"
                  autoComplete="off"
                  noValidate
                  onSubmit={submitVerify(onSubmitVerify)}
              >
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
            </div>
        )}

      </ModalBody>
    </Modal>
  );
}
