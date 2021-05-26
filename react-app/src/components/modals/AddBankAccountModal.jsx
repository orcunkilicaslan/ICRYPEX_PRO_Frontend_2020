import {Fragment, useState} from "react";
import {Col, Form, FormGroup, Input, Label, CustomInput, Modal, ModalBody, ModalFooter} from "reactstrap";
import { Button } from "../Button.jsx";
import {useTranslation} from "react-i18next";
import InputMask from "react-input-mask";
import { useBanks } from "~/state/hooks/";
import { useForm, Controller } from "react-hook-form";
import {useDispatch} from "react-redux";
import {createBankAccount} from "~/state/slices/bankaccount.slice";
import {setOpenModal} from "~/state/slices/ui.slice";

export default function AddBankAccountModal(props) {
  const {
    isOpen,
    ...rest
  } = props;

  const [isSuccess, setIsSuccess] = useState(props.isSuccess);
  const [isError, setIsError] = useState(props.isError);
  const [description, setDescription] = useState("");

  const { banks } = useBanks();
  const { t } = useTranslation(["form", "common", "finance"]);
  const dispatch = useDispatch();

  const { register, handleSubmit,setValue ,control } = useForm({
    mode: "onChange",
    defaultValues: {
      bankid: -1,
      ibanno: "",
      currencyid: "",
    },
  });

  const onSubmit = async data => {
    if(data.bankid !== -1) {
      let sendData = {
        bankid : data.bankid,
        currencyid: data.currencyid,
        ibanno : data.ibanno.replace(/ /g,'')
      }
      const { payload } = await  dispatch(createBankAccount(sendData))
      if (payload?.status !== 1) {
        setDescription(payload?.errormessage)
        setIsError(true)
      }else {
        setDescription(payload?.description)
        setIsSuccess(true)
      }
    }
  }

  const clearOpenModals = async () => {
    await dispatch(setOpenModal("none"));
    setTimeout(() => setIsError(false), 1000)
    setTimeout(() => setIsSuccess(false), 1000)
  };

  const   handleChange = e => {
    const { name, value } = e.target;
    setValue(name, value.trim(), {
      shouldValidate: true,
    });
  };
  return (
      <Modal
          wrapClassName=""
          modalClassName=""
          isOpen={isOpen}
          toggle={clearOpenModals}
          keyboard={false}
          fade={false}
          autoFocus={false}
          backdrop="static"
          centered
          {...rest}
      >
        <div className="modal-close">
          <Button className="close" onClick={clearOpenModals}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
        { !isError ? (!isSuccess ? (
            <Fragment>
              <ModalBody>
                <Form
                    className="siteformui"
                    autoComplete="off"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                  <h4 className="text-center">{t("finance:addBankAccount")}</h4>
                  <div className="labelfocustop mt-3">
                    <FormGroup>
                      <Input
                          className="custom-select"
                          type="select"
                          name="bankid"
                          innerRef={register({
                            valueAsNumber: true,
                            required: t("isRequired"),
                          })}
                      >
                        <option value="-1">
                          {t("finance:selectBank")}
                        </option>
                        {banks.map(account => {
                          const { id, name } = account;

                          return (
                              <option value={id} key={id}>
                                {name}
                              </option>
                          );
                        })}
                      </Input>
                      <Label>{t("finance:selectBank")}</Label>
                    </FormGroup>
                    <FormGroup>
                      <Controller
                          className="form-control"
                          as={InputMask}
                          control={control}
                          mask="TR99 9999 9999 9999 9999 9999 99"
                          name="ibanno"
                          placeholder="IBAN"
                          ref={register({
                            required: t("isRequired"),
                          })}

                      />
                      <Label>IBAN</Label>
                    </FormGroup>
                  </div>
                  <FormGroup className="mt-3 text-center">
                    <FormGroup check inline>
                      <CustomInput id="AddBankCurrTRY" type="radio" name="currencyid"  value="1"
                                   innerRef={register({
                                     required: t("isRequired"),
                                   })}
                                   label={`${t("common:turkishLira")} - TRY`}
                                   onChange={handleChange} />
                    </FormGroup>
                    <FormGroup check inline>
                      <CustomInput id="AddBankCurrUSD" type="radio"
                                   innerRef={register({
                                    required: t("isRequired"),
                                  })}
                                   name="currencyid" value="2" label={`${t("common:usDollar")} - USD`} />
                    </FormGroup>
                  </FormGroup>
                  <Button
                      variant="primary"
                      className="w-100 mt-2"
                      type="submit"
                  >
                    {t("finance:addAccount")}
                  </Button>
                </Form>
              </ModalBody>
            </Fragment>
        ) : (
            <Fragment>
              <ModalBody className="modal-confirm text-center">
                <div className="animation-alert-icons">
                  <div className="alert-icons alert-icons-success">
                    <div className="alert-icons-success-tip" />
                    <div className="alert-icons-success-long" />
                  </div>
                </div>
                <h4>{t("common:success")}</h4>
                <p>{description}</p>
              </ModalBody>
              <ModalFooter className="row">
                <Button
                    variant="secondary"
                    className="active col"
                    onClick={clearOpenModals}
                >
                  {t("common:close")}
                </Button>
              </ModalFooter>
            </Fragment>
        )) : (
            <Fragment>
              <ModalBody className="modal-confirm text-center">
                <div className="animation-alert-icons">
                  <div className="alert-icons alert-icons-error">
                    <div className="alert-icons-error-x">
                      <div className="alert-icons-error-x-left"></div>
                      <div className="alert-icons-error-x-right"></div>
                    </div>
                  </div>
                </div>
                <h4>{t("common:failed")}</h4>
                <p>{description}</p>
              </ModalBody>
              <ModalFooter className="row">
                <Button
                    variant="secondary"
                    className="active col"
                    onClick={clearOpenModals}
                >
                  {t("common:close")}
                </Button>
              </ModalFooter>
            </Fragment>
        )}

      </Modal>
  );
}
