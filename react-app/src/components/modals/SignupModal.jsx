import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  FormText,
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { verifyCaptcha } from "~/util/";

const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY;

export default function SignupModal(props) {
  const {
    isOpen,
    clearModals,
    errorMessage,
    submit,
    isSigningup,
    countryPhoneCode,
    ...rest
  } = props;
  const { t } = useTranslation(["login", "form"]);
  const { register, handleSubmit, errors, watch, clearErrors, setValue } =
    useForm({
      mode: "onChange",
      defaultValues: {
        firstname: "",
        lastname: "",
        countrycode: countryPhoneCode?.[0] || "90",
        phoneno: "",
        email: "",
        password: "",
        confirm: "",
        termsofuse: false,
        ecommerce: false,
        recaptcha: "",
      },
    });

  const { countrycode: watchedCountrycode, password: watchedPassword } =
    watch();

  const [passShow, setPassShow] = useState(false);
  const toggleTypePass = () => {
    setPassShow(passShow ? false : true);
  };

  const onSubmit = data => {
    const { recaptcha, ...rest } = data;

    clearErrors();
    if (recaptcha) submit(rest);
  };

  const onCaptcha = async value => {
    if (value === null) {
      setValue("recaptcha", ""); // captcha expired
    } else {
      if (await verifyCaptcha(value)) {
        clearErrors("recaptcha");
        setValue("recaptcha", "valid");
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
      backdrop="static"
      {...rest}
    >
      <ModalHeader toggle={clearModals}>
        {t("signup").toUpperCase()}
      </ModalHeader>
      <ModalBody className="modalcomp modalcomp-sign">
        <div className="modalcomp-sign-icon">
          <IconSet sprite="sprtlgclrd" size="50gray" name="newuser" />
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
                className={errors.firstname && "inputresult resulterror"}
              >
                <Input
                  type="text"
                  required
                  name="firstname"
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label>{t("firstname")}</Label>
                {errors.firstname && (
                  <FormText className="inputresult resulterror inputintext">
                    {errors.firstname?.message}
                  </FormText>
                )}
              </FormGroup>
              <FormGroup
                className={errors.lastname && "inputresult resulterror"}
              >
                <Input
                  type="text"
                  required
                  name="lastname"
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label>{t("surname")}</Label>
                {errors.lastname && (
                  <FormText className="inputresult resulterror inputintext">
                    {errors.lastname?.message}
                  </FormText>
                )}
              </FormGroup>
              <FormGroup
                className={`input-group phonelabelgroup ${
                  errors.phoneno && "inputresult resulterror"
                }`}
              >
                <InputGroupAddon addonType="prepend">
                  <Input
                    className="custom-select"
                    type="select"
                    name="countrycode"
                    innerRef={register}
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
                  required
                  name="phoneno"
                  innerRef={register({
                    required: t("form:isRequired"),
                    validate: value => {
                      const parsedCode = parseInt(watchedCountrycode, 10);

                      if (parsedCode === 90) {
                        if (value.length <= 10) return true;
                        else return t("form:shouldBeMaxLength", { value: 10 });
                      } else {
                        if (value.length <= 20) return true;
                        else return t("form:shouldBeMaxLength", { value: 20 });
                      }
                    },
                  })}
                />
                <Label>{t("phone")}</Label>
                {errors.phoneno && (
                  <FormText className="inputresult resulterror inputintext">
                    {errors.phoneno?.message}
                  </FormText>
                )}
              </FormGroup>
              <FormGroup className={errors.email && "inputresult resulterror"}>
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
              <FormGroup
                className={errors.password && "inputresult resulterror"}
              >
                <Input
                  className="signuppassword"
                  type={passShow ? "text" : "password"}
                  required
                  name="password"
                  innerRef={register({
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
                {errors.password && (
                  <FormText className="inputresult resulterror inputintext">
                    {errors.password?.message}
                  </FormText>
                )}
              </FormGroup>
              <FormGroup
                className={errors.confirm && "inputresult resulterror"}
              >
                <Input
                  className="signuprepassword"
                  type={passShow ? "text" : "password"}
                  required
                  name="confirm"
                  innerRef={register({
                    required: t("form:isRequired"),
                    validate: value => {
                      if (watchedPassword !== value) {
                        return t("form:passwordNotMatch");
                      }

                      return true;
                    },
                  })}
                />
                <Label>{t("confirmPassword")}</Label>
                <Button className="showhidepass" onClick={toggleTypePass}>
                  <IconSet sprite="sprtsmclrd" size="14" name={passShow ? "eyehide" : "eyeshow"} />
                </Button>
                {errors.confirm && (
                  <FormText className="inputresult resulterror inputintext">
                    {errors.confirm?.message}
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
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label>{t("notARobot")}</Label>
                {errors.recaptcha && (
                  <FormText className="inputresult resulterror inputintext">
                    {errors.recaptcha?.message}
                  </FormText>
                )}
              </div>
            </div>
            <div className="checkboxarea">
              <div
                className={`custom-control custom-checkbox ${
                  errors.termsofuse && "inputresult resulterror"
                }`}
              >
                <Input
                  className="custom-control-input"
                  id="termsOfUseCheck"
                  type="checkbox"
                  name="termsofuse"
                  innerRef={register({ required: t("form:isRequired") })}
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
                {errors.termsofuse && (
                  <FormText className="inputresult resulterror">
                    {errors.termsofuse?.message}
                  </FormText>
                )}
              </div>
              <div
                className={`custom-control custom-checkbox ${
                  errors.ecommerce && "inputresult resulterror"
                }`}
              >
                <Input
                  className="custom-control-input"
                  id="announcementsCheck"
                  type="checkbox"
                  name="ecommerce"
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label
                  className="custom-control-label"
                  htmlFor="announcementsCheck"
                  check
                >
                  {t("commercialConsent")}
                </Label>
                {errors.ecommerce && (
                  <FormText className="inputresult resulterror">
                    {errors.ecommerce?.message}
                  </FormText>
                )}
              </div>
            </div>
            <Button
              type="submit"
              variant="success"
              className="w-100"
              disabled={isSigningup}
            >
              {t("signup").toUpperCase()}
            </Button>
          </Form>
        </div>
      </ModalBody>
    </Modal>
  );
}
