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
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { AlertResult } from "../AlertResult.jsx";

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
  const { register, handleSubmit, errors, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      firstname: "",
      lastname: "",
      countrycode: countryPhoneCode?.[0] || "",
      phoneno: "",
      email: "",
      password: "",
      confirm: "",
      termsofuse: false,
      ecommerce: false,
    },
  });

  const onSubmit = data => {
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
              <FormGroup>
                <Input
                  type="text"
                  required
                  name="firstname"
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label>{t("firstname")}</Label>
                <div>
                  {errors.firstname && (
                    <span style={{ color: "red", fontSize: "1rem" }}>
                      {errors.firstname?.message}
                    </span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  required
                  name="lastname"
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label>{t("surname")}</Label>
                <div>
                  {errors.lastname && (
                    <span style={{ color: "red", fontSize: "1rem" }}>
                      {errors.lastname?.message}
                    </span>
                  )}
                </div>
              </FormGroup>
              <FormGroup className="input-group phonelabelgroup">
                <InputGroupAddon addonType="prepend">
                  <Input
                    className="custom-select"
                    type="select"
                    name="countrycode"
                    innerRef={register()}
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
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label>{t("phone")}</Label>
                <div>
                  {errors.phoneno && (
                    <span style={{ color: "red", fontSize: "1rem" }}>
                      {errors.phoneno?.message}
                    </span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  required
                  name="email"
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label>{t("email")}</Label>
                <div>
                  {errors.email && (
                    <span style={{ color: "red", fontSize: "1rem" }}>
                      {errors.email?.message}
                    </span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <Input
                  className="signuppassword"
                  type="password"
                  required
                  name="password"
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label>{t("password")}</Label>
                <Button
                  className="showhidepass"
                  data-toggle="showhidepassword"
                  data-target=".signuppassword"
                >
                  <IconSet sprite="sprtsmclrd" size="14" name="showhide" />
                </Button>
                <div>
                  {errors.password && (
                    <span style={{ color: "red", fontSize: "1rem" }}>
                      {errors.password?.message}
                    </span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <Input
                  className="signuprepassword"
                  type="password"
                  required
                  name="confirm"
                  innerRef={register({ required: t("form:isRequired") })}
                />
                <Label>{t("confirmPassword")}</Label>
                <Button
                  className="showhidepass"
                  data-toggle="showhidepassword"
                  data-target=".signuprepassword"
                >
                  <IconSet sprite="sprtsmclrd" size="14" name="showhide" />
                </Button>
                <div>
                  {errors.confirm && (
                    <span style={{ color: "red", fontSize: "1rem" }}>
                      {errors.confirm?.message}
                    </span>
                  )}
                </div>
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
                <div>
                  {errors.termsofuse && (
                    <span style={{ color: "red", fontSize: "1rem" }}>
                      {errors.termsofuse?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="custom-control custom-checkbox">
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
                <div>
                  {errors.ecommerce && (
                    <span style={{ color: "red", fontSize: "1rem" }}>
                      {errors.ecommerce?.message}
                    </span>
                  )}
                </div>
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
