import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";

import { ReactComponent as SideLight } from "~/assets/images/header/header_theme_sidelight.svg";
import { ReactComponent as SideDark } from "~/assets/images/header/header_theme_sidedark.svg";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import {
  signupUser,
  signinUser,
  signinWithSms,
} from "~/state/slices/user.slice";

const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY;

const HeaderRight = props => {
  const { setLanguage } = props;
  const dispatch = useDispatch();
  const { countryCodes } = useSelector(state => state.api.settings);
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
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(false);
  const [isEnteringCode, setIsEnteringCode] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  const countryPhoneCode = countryCodes.map(({ country_code }) => country_code);

  const signUpModalToggle = () => {
    setSignInModal(false);
    setSignUpModal(!signUpModal);
  };

  const signInModalToggle = () => {
    setSignUpModal(false);
    setSignInModal(!signInModal);
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

  const submitSignup = async () => {
    const { phone, countrycode } = signUpForm;
    const { payload } = await dispatch(
      signupUser({ ...signUpForm, phone: `${countrycode}${phone}` })
    );

    if (payload.status) {
      signInModalToggle();
      setIsEnteringCode(true);
    }
  };

  const submitSecret = () => {
    dispatch(signinWithSms(verifyCode));
  };

  return (
    <div className="header-right col-auto">
      <div className="header-right-theme siteformui">
        <div className="custom-control custom-switch">
          <span className="switchthemebg">
            <SideLight className="sidelightsvg" />
            <SideDark className="sidedarksvg" />
          </span>
          <input
            id="headThemeColor"
            className="custom-control-input"
            type="checkbox"
            defaultChecked
          />
          <label htmlFor="headThemeColor" className="custom-control-label" />
        </div>
      </div>
      <div className="header-right-icons">
        <a
          className="headsignedinicon fullscreen"
          href="#"
          title="Tam Sayfa Görünümü"
          data-toggle="fullscreenbtn"
        >
          <IconSet sprite="sprtsmclrd" size="20" name="pagefullscreen" />
        </a>
        <a
          className="headsignedinicon support"
          href="#"
          title="Destek"
          rel="bookmark"
        >
          <IconSet sprite="sprtsmclrd" size="20" name="support" />
        </a>
        <a
          className="headsignedinicon notif"
          href="#"
          data-toggle="modal"
          data-target="#modalHeadNotifications"
        >
          <span id="headTooltipNotif">
            <IconSet sprite="sprtsmclrd" size="20" name="notif">
              <span className="badge badge-pill badge-danger">4</span>
            </IconSet>
          </span>
          <UncontrolledTooltip placement="bottom" target="headTooltipNotif">
            4 Yeni Bildiriminiz Var
          </UncontrolledTooltip>
        </a>
      </div>
      <div className="header-right-notsignedin pr-2">
        <Button size="sm" variant="secondary" onClick={signInModalToggle}>
          Üye Girişi
        </Button>
        <Modal
          wrapClassName=""
          modalClassName="modal-rightside"
          size="sm"
          isOpen={signInModal}
          toggle={signInModalToggle}
          keyboard={false}
          fade={false}
          autoFocus={false}
          backdrop="static"
        >
          <ModalHeader toggle={signInModalToggle}>ÜYE GİRİŞİ</ModalHeader>
          <ModalBody className="modalcomp modalcomp-sign">
            <div className="modalcomp-sign-icon">
              <IconSet sprite="sprtlgclrd" size="50gray" name="user" />
            </div>
            {!isEnteringCode ? (
              <div className="modalcomp-sign-form">
                <Form className="siteformui" autoComplete="off" noValidate>
                  <div className="labelfocustop">
                    <FormGroup>
                      <Input type="email" pattern=".{0}|.{1,}" required />
                      <Label>E-Posta</Label>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        className="signuppassword"
                        type="password"
                        pattern=".{0}|.{1,}"
                        required
                      />
                      <Label>Şifre</Label>
                      <Button
                        className="showhidepass"
                        data-toggle="showhidepassword"
                        data-target=".signuppassword"
                      >
                        <IconSet
                          sprite="sprtsmclrd"
                          size="14"
                          name="showhide"
                        />
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
                  <Button variant="secondary" className="w-100 active">
                    DOĞRULAMA KODU GÖNDER
                  </Button>
                </Form>
              </div>
            ) : (
              <div className="modalcomp-sign-form">
                <div className="headsmtitle mb-1">
                  <h6 className="text-center w-100">
                    Doğrulama Kodunu Giriniz
                  </h6>
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
            )}
          </ModalBody>
        </Modal>
        <Button size="sm" variant="success" onClick={signUpModalToggle}>
          Kayıt Ol
        </Button>
        <Modal
          wrapClassName=""
          modalClassName="modal-rightside"
          size="sm"
          isOpen={signUpModal}
          toggle={signUpModalToggle}
          keyboard={false}
          fade={false}
          autoFocus={false}
          backdrop="static"
        >
          <ModalHeader toggle={signUpModalToggle}>KAYIT OL</ModalHeader>
          <ModalBody className="modalcomp modalcomp-sign">
            <div className="modalcomp-sign-icon">
              <IconSet sprite="sprtlgclrd" size="50gray" name="newuser" />
            </div>
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
                        {countryPhoneCode.map((code, idx) => {
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
      <div className="header-right-signedin d-none"></div>
      <div className="header-right-lang">
        <Button
          size="sm"
          variant="secondary"
          className="active"
          onClick={() => setLanguage("tr")}
          title="TR"
        >
          TR
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setLanguage("en")}
          title="EN"
        >
          EN
        </Button>
      </div>
    </div>
  );
};

export default HeaderRight;
