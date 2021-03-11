import { useState, Fragment } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { LoginButtons } from "../LoginButtons";
import { setOpenModal } from "~/state/slices/ui.slice";
import { SigninModal, VerifyModal } from "../modals/";

const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY;

const HeaderRightSignedInNot = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["login", "common"]);
  const {
    user,
    countryCodes,
    onSignup,
    onSignin,
    onSigninSMS,
    onForgotPassword,
    onSignin2FA,
  } = props;
  const { openModal, isSigningin, isSigningup, isVerifying } = useSelector(
    state => state.ui
  );
  const [signUpForm, setSignUpForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    countrycode: "90",
    email: "",
    password: "",
    confirm: "",
    termsofuse: false,
    ecommerce: false,
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [signinError, setSigninError] = useState(null);
  const [verifyError, setVerifyError] = useState(null);

  const countryPhoneCode = countryCodes?.map(
    ({ country_code }) => country_code
  );

  const openSignupModal = () => {
    dispatch(setOpenModal("signup"));
    setErrorMessage(null);
  };

  const openSigninModal = () => {
    setSigninError(null);
    dispatch(setOpenModal("signin"));
  };

  const openForgotPassConfirmModal = () => {
    dispatch(setOpenModal("forgotpassconfirm"));
  };

  const openVerifyModal = () => {
    setVerifyError(null);
    dispatch(setOpenModal("verify"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  const onSignUpFormChange = ({ target }) => {
    if (target.type === "checkbox") {
      setSignUpForm(prev => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setSignUpForm(prev => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const submitSignup = async event => {
    event.preventDefault();
    event.stopPropagation();
    setErrorMessage(null);

    const { phone, countrycode } = signUpForm;
    const { status, errormessage } = await onSignup({
      ...signUpForm,
      phone: `${countrycode}${phone}`,
    });

    if (status) {
      // setIsEnteringCode(true);
      openSigninModal();
    } else {
      setErrorMessage(errormessage);
    }
  };

  const submitVerify = async data => {
    let result;
    const { code } = data;
    setVerifyError(null);

    if (user?.logintype === 2) {
      result = await onSignin2FA(code);
    } else {
      result = await onSigninSMS(code);
    }

    const { status, errormessage } = result;

    if (!status) {
      setVerifyError(errormessage);
    }
  };

  const submitSignin = async data => {
    setSigninError(null);

    const { status, errormessage } = await onSignin(data);

    if (status) {
      setSigninError(null);
      openVerifyModal();
    } else {
      setSigninError(errormessage);
    }
  };

  const submitForgotPassword = async event => {
    event.preventDefault();
    event.stopPropagation();
    setErrorMessage(null);

    const { status, errormessage } = await onForgotPassword({
      email: user?.email,
    });

    if (status) {
      setErrorMessage(null);
    } else {
      setErrorMessage(errormessage);
    }
  };

  return (
    <div className="header-right-notsignedin">
      <LoginButtons
        openSigninModal={openSigninModal}
        openSignupModal={openSignupModal}
      />
      <SigninModal
        isOpen={openModal === "signin"}
        submit={submitSignin}
        userEmail={user?.email}
        clearModals={clearOpenModals}
        errorMessage={signinError}
        isSigningin={isSigningin}
        openForgotPassConfirmModal={openForgotPassConfirmModal}
      />
      <VerifyModal
        isOpen={openModal === "verify"}
        submit={submitVerify}
        clearModals={clearOpenModals}
        errorMessage={verifyError}
        isVerifying={isVerifying}
      />
      <Modal
        wrapClassName=""
        modalClassName=""
        className="text-center"
        size="sm"
        isOpen={openModal === "forgotpassconfirm"}
        toggle={clearOpenModals}
        keyboard={false}
        fade={false}
        autoFocus={false}
        backdrop="static"
        centered
      >
        <div className="modal-close">
          <Button className="close" onClick={clearOpenModals}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>

        {openModal === "forgotpassconfirm" ? (
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
                onClick={clearOpenModals}
              >
                İPTAL ET
              </Button>
              <Button
                variant="success"
                className="active col"
                onClick={submitForgotPassword}
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
              <Button
                variant="success"
                className="col"
                onClick={openSigninModal}
              >
                ÜYE GİRİŞİ
              </Button>
            </ModalFooter>
          </Fragment>
        )}
      </Modal>
      <Modal
        wrapClassName=""
        modalClassName="modal-rightside"
        size="sm"
        isOpen={openModal === "signup"}
        toggle={clearOpenModals}
        keyboard={false}
        fade={false}
        autoFocus={false}
        backdrop="static"
      >
        <ModalHeader toggle={clearOpenModals}>
          {t("signup").toUpperCase()}
        </ModalHeader>
        <ModalBody className="modalcomp modalcomp-sign">
          <div className="modalcomp-sign-icon">
            <IconSet sprite="sprtlgclrd" size="50gray" name="newuser" />
          </div>
          {errorMessage ? (
            <AlertResult error>{errorMessage}</AlertResult>
          ) : null}
          <div className="modalcomp-sign-form">
            <Form className="siteformui" autoComplete="off" noValidate>
              <div className="labelfocustop">
                <FormGroup>
                  <Input
                    type="text"
                    pattern=".{0}|.{1,}"
                    required
                    name="firstname"
                    value={signUpForm.firstname}
                    onChange={onSignUpFormChange}
                  />
                  <Label>{t("name")}</Label>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    pattern=".{0}|.{1,}"
                    required
                    name="lastname"
                    value={signUpForm.lastname}
                    onChange={onSignUpFormChange}
                  />
                  <Label>{t("surname")}</Label>
                </FormGroup>
                <FormGroup className="input-group phonelabelgroup">
                  <InputGroupAddon addonType="prepend">
                    <Input
                      className="custom-select"
                      type="select"
                      name="countrycode"
                      value={signUpForm.countrycode}
                      onChange={onSignUpFormChange}
                    >
                      {countryPhoneCode?.map((code, idx) => {
                        return (
                          <option value={code} key={`${code}_${idx}`}>
                            {code}
                          </option>
                        );
                      })}
                    </Input>
                  </InputGroupAddon>
                  <Input
                    className="text-left"
                    type="text"
                    pattern=".{0}|.{1,}"
                    required
                    name="phone"
                    value={signUpForm.phone}
                    onChange={onSignUpFormChange}
                  />
                  <Label>{t("phone")}</Label>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    pattern=".{0}|.{1,}"
                    required
                    name="email"
                    value={signUpForm.email}
                    onChange={onSignUpFormChange}
                  />
                  <Label>{t("email")}</Label>
                </FormGroup>
                <FormGroup>
                  <Input
                    className="signuppassword"
                    type="password"
                    pattern=".{0}|.{1,}"
                    required
                    name="password"
                    value={signUpForm.password}
                    onChange={onSignUpFormChange}
                  />
                  <Label>{t("password")}</Label>
                  <Button
                    className="showhidepass"
                    data-toggle="showhidepassword"
                    data-target=".signuppassword"
                  >
                    <IconSet sprite="sprtsmclrd" size="14" name="showhide" />
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Input
                    className="signuprepassword"
                    type="password"
                    pattern=".{0}|.{1,}"
                    required
                    name="confirm"
                    value={signUpForm.confirm}
                    onChange={onSignUpFormChange}
                  />
                  <Label>{t("verifyPassword")}</Label>
                  <Button
                    className="showhidepass"
                    data-toggle="showhidepassword"
                    data-target=".signuprepassword"
                  >
                    <IconSet sprite="sprtsmclrd" size="14" name="showhide" />
                  </Button>
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
              <div className="checkboxarea">
                <div className="custom-control custom-checkbox">
                  <Input
                    className="custom-control-input"
                    id="termsOfUseCheck"
                    type="checkbox"
                    name="termsofuse"
                    value={signUpForm.termsofuse}
                    onClick={onSignUpFormChange}
                  />
                  <Label
                    className="custom-control-label"
                    htmlFor="termsOfUseCheck"
                    check
                  >
                    {t("oldEnough")}{" "}
                    <a href="#" title="" rel="bookmark" target="_blank">
                      <u>{t("preliminary")}</u>
                    </a>{" "}
                    {t("common:and")}{" "}
                    <a href="#" title="" rel="bookmark" target="_blank">
                      <u>{t("termsOfService")}</u>
                    </a>{" "}
                    {t("readAndAgree")}
                  </Label>
                </div>
                <div className="custom-control custom-checkbox">
                  <Input
                    className="custom-control-input"
                    id="announcementsCheck"
                    type="checkbox"
                    name="ecommerce"
                    value={signUpForm.ecommerce}
                    onChange={onSignUpFormChange}
                  />
                  <Label
                    className="custom-control-label"
                    htmlFor="announcementsCheck"
                    check
                  >
                    {t("commercialConsent")}
                  </Label>
                </div>
              </div>
              <Button
                variant="success"
                className="w-100"
                onClick={submitSignup}
                disabled={isSigningup}
              >
                {t("signup").toUpperCase()}
              </Button>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default HeaderRightSignedInNot;
