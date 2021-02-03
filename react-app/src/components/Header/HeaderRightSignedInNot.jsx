import { useState, useRef } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { LoginButtons } from "../LoginButtons";
import { setOpenModal } from "~/state/slices/ui.slice";

const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY;

const HeaderRightSignedInNot = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { user, countryCodes, onSignup, onSignin, onSigninSMS } = props;
  const { openModal } = useSelector(state => state.ui);
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

  const passwordField = useRef();
  const [userEmail, setUserEmail] = useState(user.email || "");

  const [isEnteringCode, setIsEnteringCode] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const countryPhoneCode = countryCodes?.map(
    ({ country_code }) => country_code
  );

  const openSignupModal = () => {
    dispatch(setOpenModal("signup"));
    setErrorMessage(null);
  };

  const openSigninModal = () => {
    dispatch(setOpenModal("signin"));
    setErrorMessage(null);
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
      setIsEnteringCode(true);
      openSigninModal();
    } else {
      setErrorMessage(errormessage);
    }
  };

  const submitSecret = async event => {
    event.preventDefault();
    event.stopPropagation();
    setErrorMessage(null);

    const { status, errormessage } = await onSigninSMS(verifyCode);

    if (!status) {
      setErrorMessage(errormessage);
    }
  };

  const submitSignin = async event => {
    event.preventDefault();
    event.stopPropagation();
    setErrorMessage(null);

    const { status, errormessage } = await onSignin({
      email: userEmail,
      password: passwordField.current.value,
    });

    if (status) {
      setIsEnteringCode(true);
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

      <Modal
        wrapClassName=""
        modalClassName="modal-rightside"
        size="sm"
        isOpen={openModal === "signin"}
        toggle={clearOpenModals}
        keyboard={false}
        fade={false}
        autoFocus={false}
        backdrop="static"
      >
        <ModalHeader toggle={clearOpenModals}>
          {t("signin").toUpperCase()}
        </ModalHeader>
        <ModalBody className="modalcomp modalcomp-sign">
          <div className="modalcomp-sign-icon">
            <IconSet sprite="sprtlgclrd" size="50gray" name="user" />
          </div>
          {errorMessage ? (
            <AlertResult error>{errorMessage}</AlertResult>
          ) : null}
          {isEnteringCode ? (
            <div className="modalcomp-sign-form">
              <div className="headsmtitle mb-1">
                <h6 className="text-center w-100">Doğrulama Kodunu Giriniz</h6>
              </div>
              <Form className="siteformui" autoComplete="off" noValidate>
                <div className="labelfocustop">
                  <FormGroup>
                    <Input
                      className="text-center"
                      type="text"
                      pattern=".{0}|.{1,}"
                      required
                      value={verifyCode}
                      onChange={({ target }) => setVerifyCode(target.value)}
                    />
                    <Label className="text-center">Doğrulama Kodu</Label>
                  </FormGroup>
                </div>
                <Button
                  variant="success"
                  className="w-100 mt-2"
                  onClick={submitSecret}
                >
                  GİRİŞ YAP
                </Button>
              </Form>
            </div>
          ) : (
            <div className="modalcomp-sign-form">
              <Form className="siteformui" autoComplete="off" noValidate>
                <div className="labelfocustop">
                  <FormGroup>
                    <Input
                      type="email"
                      pattern=".{0}|.{1,}"
                      required
                      name="email"
                      value={userEmail}
                      onChange={({ target }) => setUserEmail(target.value)}
                    />
                    <Label>E-Posta</Label>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      className="signuppassword"
                      type="password"
                      pattern=".{0}|.{1,}"
                      required
                      name="password"
                      innerRef={passwordField}
                    />
                    <Label>Şifre</Label>
                    <Button
                      className="showhidepass"
                      data-toggle="showhidepassword"
                      data-target=".signuppassword"
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
                    <Label>Ben robot değilim</Label>
                  </div>
                  <div>
                    <a className="text-muted" href="#">
                      Şifremi Unuttum
                    </a>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="w-100 active"
                  onClick={submitSignin}
                >
                  DOĞRULAMA KODU GÖNDER
                </Button>
              </Form>
            </div>
          )}
        </ModalBody>
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
                  <Label>Adınız</Label>
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
                  <Label>Soyadınız</Label>
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
                  <Label>Telefon</Label>
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
                  <Label>E-Posta</Label>
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
                  <Label>Şifre</Label>
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
                  <Label>Şifre Doğrulama</Label>
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
                  <Label>Ben robot değilim</Label>
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
                    18 Yaşında olduğumu beyan ederim,{" "}
                    <a href="#" title="" rel="bookmark" target="_blank">
                      <u>Ön Bilgilendirme Metni</u>
                    </a>{" "}
                    ve{" "}
                    <a href="#" title="" rel="bookmark" target="_blank">
                      <u>Kullanım Sözleşmesini</u>
                    </a>{" "}
                    okudum ve onaylıyorum.
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
                    Ticari reklam ve duyurulardan haber almak istiyorum.
                  </Label>
                </div>
              </div>
              <Button
                variant="success"
                className="w-100"
                onClick={submitSignup}
              >
                KAYIT OL
              </Button>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default HeaderRightSignedInNot;
