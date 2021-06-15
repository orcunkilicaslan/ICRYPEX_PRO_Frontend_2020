import {Fragment, useMemo, useState} from "react";
import {Col, Form, FormGroup, Input, Label, CustomInput, Modal, ModalBody, ModalFooter} from "reactstrap";
import { Button } from "../Button.jsx";
import {useTranslation} from "react-i18next";
import InputMask from "react-input-mask";
import {useBanks, useCurrencies} from "~/state/hooks/";
import { useForm, Controller } from "react-hook-form";
import {useDispatch} from "react-redux";

import {setOpenModal} from "~/state/slices/ui.slice";
import {cryptoAddressWhitelistsCreate} from "~/state/slices/cryptoaddreswhitelist.slice";

export default function AddCryptoAddressModal(props) {
  const {
    watchedSymbol,
    isOpen,
    ...rest
  } = props;

  const [isSuccess, setIsSuccess] = useState(props.isSuccess);
  const [isError, setIsError] = useState(props.isError);
  const [description, setDescription] = useState("");

  const { banks } = useBanks();
  const { t } = useTranslation(["form", "common", "finance"]);
  const dispatch = useDispatch();
  const { cryptoCurrencies = [], tokenCurrencies = [] } = useCurrencies();

  const { register, handleSubmit,setValue ,control } = useForm({
    mode: "onChange",
    defaultValues: {
      currencyid: "",
      addresstitle: "",
      address: "",
      destinationtag: "",
    },
  });

  const [visibleCurrencies, visibleSymbols] = useMemo(() => {
    const currencies = cryptoCurrencies.concat(tokenCurrencies);
    const symbols = currencies.map(({ symbol }) => symbol);

    return [currencies, symbols];
  }, [cryptoCurrencies, tokenCurrencies]);

  const onSubmit = async data => {
    if(data.addresstitle !== "") {
      const currencyid = visibleCurrencies.find(
          ({ symbol }) => symbol === watchedSymbol
      )?.id;
      let sendData = {
        addresstitle : data.addresstitle,
        address : data.address,
        currencyid: currencyid,
        destinationtag: data.destinationtag
      }
      const { payload } = await  dispatch(cryptoAddressWhitelistsCreate(sendData))
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
                  <h4 className="text-center">{t("finance:addCryptoAddress")}</h4>
                  <div className="labelfocustop mt-3">
                    <FormGroup>
                      <Input
                          type="text"
                          placeHolder={t("finance:addressTitle")}
                          name="addresstitle"
                          innerRef={register({
                            required: t("isRequired"),
                          })}
                      >
                      </Input>
                      <Label>{t("finance:addressTitle")}</Label>
                    </FormGroup>
                    <FormGroup>
                      <Input
                          type="text"
                          placeHolder={t("finance:watchedSymbolAddress", { watchedSymbol: watchedSymbol })}
                          name="address"
                          innerRef={register({
                            required: t("isRequired"),
                          })}
                      >
                      </Input>
                      <Label>{t("finance:address")}</Label>
                    </FormGroup>
                    <FormGroup>
                      <Input
                          type="text"
                          placeHolder={t("finance:destinationTag")}
                          name="destinationtag"
                          innerRef={register({
                          })}
                      >
                      </Input>
                      <Label>{t("finance:destinationTag")}</Label>
                    </FormGroup>
                  </div>
                  <Button
                      variant="primary"
                      className="w-100 mt-2"
                      type="submit"
                  >
                    {t("finance:addAddress")}
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
