import { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";

import { ReactComponent as SideLight } from "~/assets/images/header/header_theme_sidelight.svg";
import { ReactComponent as SideDark } from "~/assets/images/header/header_theme_sidedark.svg";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";

const HeaderRight = props => {

  const {
    setLanguage,
  } = props;

  const [signUpModal, setSignUpModal] = useState(false);
  const signUpModalToggle = () => setSignUpModal(!signUpModal);

  const [signInModal, setSignInModal] = useState(false);
  const signInModalToggle = () => setSignInModal(!signInModal);

  const countryPhoneCode = ["90", "357", "392", "1", "1242", "1246", "1264", "1268", "1284", "1340", "1345", "1441", "1473", "1649", "1664", "1670", "1671", "1684", "1721", "1758", "1767", "1784", "1787", "1809", "1829", "1849", "1868", "1869", "1876", "1939", "20", "211", "212", "212", "213", "216", "218", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "248", "249", "250", "251", "252", "253", "254", "255", "256", "257", "258", "260", "261", "262", "262", "263", "264", "265", "266", "267", "268", "269", "27", "290", "291", "297", "298", "299", "30", "31", "32", "33", "34", "350", "351", "352", "353", "354", "355", "356", "358", "359", "36", "370", "371", "372", "373", "374", "375", "376", "377", "378", "379", "380", "381", "382", "383", "385", "386", "387", "389", "39", "40", "41", "420", "421", "423", "43", "44", "441481", "441534", "441624", "45", "46", "47", "47", "48", "49", "500", "501", "502", "503", "504", "505", "506", "507", "508", "509", "51", "52", "53", "54", "55", "56", "57", "58", "590", "590", "591", "592", "593", "595", "597", "598", "599", "60", "61", "62", "63", "64", "65", "66", "670", "672", "673", "674", "675", "676", "677", "678", "679", "680", "681", "682", "683", "685", "686", "687", "688", "689", "690", "691", "692", "7", "81", "82", "84", "850", "852", "853", "855", "856", "86", "880", "886", "91", "92", "93", "94", "95", "960", "961", "962", "963", "964", "965", "966", "967", "968", "970", "971", "972", "973", "974", "975", "976", "977", "98", "992", "993", "994", "995", "996", "998"];

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
        <Modal wrapClassName="" modalClassName="modal-rightside" size="sm" isOpen={signInModal} toggle={signInModalToggle} keyboard={'false'} backdrop={'static'}>
          <ModalHeader toggle={signInModalToggle}>
            ÜYE GİRİŞİ
          </ModalHeader>
          <ModalBody className="modalcomp modalcomp-sign">
            <div className="modalcomp-sign-icon">
              <IconSet sprite="sprtlgclrd" size="50gray" name="user" />
            </div>
            <div className="modalcomp-sign-form">
              <Form className="siteformui" autoComplete="off" noValidate>
                <div className="labelfocustop">
                  <FormGroup>
                    <Input type="email" pattern=".{0}|.{1,}" required />
                    <Label>E-Posta</Label>
                  </FormGroup>
                  <FormGroup>
                    <Input className="signuppassword" type="password" pattern=".{0}|.{1,}" required />
                    <Label>Şifre</Label>
                    <Button className="showhidepass" data-toggle="showhidepassword" data-target=".signuppassword">
                      <IconSet sprite="sprtsmclrd" size="14" name="showhide" />
                    </Button>
                  </FormGroup>
                </div>
                <div className="recaptcha">
                  <div className="recaptcha-area">
                    <div className="recaptcha-check">
                      <ReCAPTCHA className="g-recaptcha" theme="dark" sitekey="6LewOKAUAAAAAMDO2yohWeyDcjFAHfcuEqK2mIp4" />
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
            <div className="modalcomp-sign-form d-none">
              <div className="headsmtitle mb-1">
                <h6 className="text-center w-100">Doğrulama Kodunu Giriniz</h6>
              </div>
              <Form className="siteformui" autoComplete="off" noValidate>
                <div className="labelfocustop">
                  <FormGroup>
                    <Input className="text-center" type="text" pattern=".{0}|.{1,}" required />
                    <Label className="text-center">Doğrulama Kodu</Label>
                  </FormGroup>
                </div>
                <Button variant="success" className="w-100 mt-2">
                  GİRİŞ YAP
                </Button>
              </Form>
            </div>
          </ModalBody>
        </Modal>
        <Button size="sm" variant="success" onClick={signUpModalToggle}>
          Kayıt Ol
        </Button>
        <Modal wrapClassName="" modalClassName="modal-rightside" size="sm" isOpen={signUpModal} toggle={signUpModalToggle} keyboard={'false'} backdrop={'static'}>
          <ModalHeader toggle={signUpModalToggle}>
            KAYIT OL
          </ModalHeader>
          <ModalBody className="modalcomp modalcomp-sign">
            <div className="modalcomp-sign-icon">
              <IconSet sprite="sprtlgclrd" size="50gray" name="newuser" />
            </div>
            <div className="modalcomp-sign-form">
              <Form className="siteformui" autoComplete="off" noValidate
              >
                <div className="labelfocustop">
                  <FormGroup>
                    <Input type="text" pattern=".{0}|.{1,}" required />
                    <Label>Adınız</Label>
                  </FormGroup>
                  <FormGroup>
                    <Input type="text" pattern=".{0}|.{1,}" required />
                    <Label>Soyadınız</Label>
                  </FormGroup>
                  <FormGroup className="input-group phonelabelgroup">
                    <InputGroupAddon addonType="prepend">
                      <Input className="custom-select" type="select">

                        {countryPhoneCode.map((code, idx) => {
                          return <option value={code} key={`${code}_${idx}`}>{code}</option>;
                        })}

                      </Input>
                    </InputGroupAddon>
                    <Input className="text-left" type="text" pattern=".{0}|.{1,}" required />
                    <Label>Telefon</Label>
                  </FormGroup>
                  <FormGroup>
                    <Input type="email" pattern=".{0}|.{1,}" required />
                    <Label>E-Posta</Label>
                  </FormGroup>
                  <FormGroup>
                    <Input className="signuppassword" type="password" pattern=".{0}|.{1,}" required />
                    <Label>Şifre</Label>
                    <Button className="showhidepass" data-toggle="showhidepassword" data-target=".signuppassword">
                      <IconSet sprite="sprtsmclrd" size="14" name="showhide" />
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <Input className="signuprepassword" type="password" pattern=".{0}|.{1,}" required />
                    <Label>Şifre Doğrulama</Label>
                    <Button className="showhidepass" data-toggle="showhidepassword" data-target=".signuprepassword">
                      <IconSet sprite="sprtsmclrd" size="14" name="showhide" />
                    </Button>
                  </FormGroup>
                </div>
                <div className="recaptcha">
                  <div className="recaptcha-area">
                    <div className="recaptcha-check">
                      <ReCAPTCHA className="g-recaptcha" theme="dark" sitekey="6LewOKAUAAAAAMDO2yohWeyDcjFAHfcuEqK2mIp4" />
                    </div>
                    <Label>Ben robot değilim</Label>
                  </div>
                </div>
                <div className="checkboxarea">
                  <div className="custom-control custom-checkbox">
                    <Input className="custom-control-input" id="termsOfUseCheck" type="checkbox" />
                    <Label className="custom-control-label" htmlFor="termsOfUseCheck" check>
                      18 Yaşında olduğumu beyan ederim, <a href="#" title="" rel="bookmark" target="_blank"><u>Ön Bilgilendirme Metni</u></a> ve <a href="#" title="" rel="bookmark" target="_blank"><u>Kullanım Sözleşmesini</u></a> okudum ve onaylıyorum.
                    </Label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <Input className="custom-control-input" id="announcementsCheck" type="checkbox" />
                    <Label className="custom-control-label" htmlFor="announcementsCheck" check>
                      Ticari reklam ve duyurulardan haber almak istiyorum.
                    </Label>
                  </div>
                </div>
                <Button variant="success" className="w-100">
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
