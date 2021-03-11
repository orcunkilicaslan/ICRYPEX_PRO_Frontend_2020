import {
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import { AlertResult } from "../AlertResult.jsx";

export default function VerifyModal(props) {
  const {
    isOpen,
    clearModals,
    errorMessage,
    submit,
    isVerifying,
    ...rest
  } = props;
  const { t } = useTranslation(["login", "form"]);
  const { register, handleSubmit, errors, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

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
      <ModalHeader toggle={clearModals}>{t("verificationCode")}</ModalHeader>
      <ModalBody className="modalcomp modalcomp-sign">
        <div className="modalcomp-sign-icon">
          <IconSet sprite="sprtlgclrd" size="50gray" name="user" />
        </div>
        {errorMessage ? <AlertResult error>{errorMessage}</AlertResult> : null}
        <div className="modalcomp-sign-form">
          <div className="headsmtitle mb-1">
            <h6 className="text-center w-100">{t("enterCode")}</h6>
          </div>
          <Form
            className="siteformui"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="labelfocustop">
              <FormGroup>
                <Input
                  className="text-center"
                  type="text"
                  name="code"
                  required
                  innerRef={register({
                    required: t("form:isRequired"),
                    maxLength: {
                      value: 6,
                      message: t("form:shouldBeMaxLength", { value: 6 }),
                    },
                  })}
                />
                <Label className="text-center">{t("verificationCode")}</Label>
                <div>
                  {errors.code && (
                    <span style={{ color: "red", fontSize: "1rem" }}>
                      {errors.code?.message}
                    </span>
                  )}
                </div>
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
      </ModalBody>
    </Modal>
  );
}
