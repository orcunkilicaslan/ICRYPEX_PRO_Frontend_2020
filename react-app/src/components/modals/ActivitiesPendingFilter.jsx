import { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { fetchPendingTransactions } from "~/state/slices/transaction.slice";
import { requestCurrencies } from "~/components/OpenOrder/OpenOrderAccountActivitiesPending";

const orderBy = [
  "Önce Yeni Tarihli",
  "Önce Eski Tarihli",
  "Önce Para Yatırma",
  "Önce Para Çekme",
  "Önce TRY",
  "Önce USD",
  "Önce Banka",
  "Önce Papara",
];

const ActivitiesPendingFilter = props => {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "finance"]);
  const [apiError, setApiError] = useState("");
  const requestTypes = useSelector(
    state => state.api.settings?.moneyRequestTypes
  );
  const { register, handleSubmit, reset, clearErrors } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async data => {
    setApiError("");

    const { payload } = await dispatch(fetchPendingTransactions(data));

    if (!payload?.status) {
      setApiError(payload?.errormessage);
    } else {
      setApiError("");
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
      backdrop="static"
      {...rest}
    >
      <ModalHeader toggle={clearModals}>BEKLEMEDEKİLER FİLTRE</ModalHeader>
      <ModalBody className="modalcomp modalcomp-filters">
        {apiError && <AlertResult error>{apiError}</AlertResult>}
        <Form
          className="modalfiltersform siteformui"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup tag="fieldset">
            <legend>İşlem Tipi</legend>
            <FormGroup className="checkradioboxed">
              {requestTypes.map(({ name, id }) => {
                const inputId = nanoid();
                const fieldName = id === 1 ? "isdeposit" : "iswithdraw";

                return (
                  <div
                    key={name}
                    className="custom-control custom-checkbox custom-control-inline"
                  >
                    <Input
                      className="custom-control-input"
                      type="checkbox"
                      id={inputId}
                      name={fieldName}
                      innerRef={register}
                    />
                    <Label
                      className="custom-control-label btn btn-sm btn-primary"
                      htmlFor={inputId}
                    >
                      {t(`finance:${name?.toLowerCase?.()}`)}
                    </Label>
                  </div>
                );
              })}
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Para Birimi</legend>
            <FormGroup className="checkradioboxed">
              {requestCurrencies.map(currency => {
                const inputId = nanoid();

                return (
                  <div
                    key={currency}
                    className="custom-control custom-checkbox custom-control-inline"
                  >
                    <Input
                      className="custom-control-input"
                      type="checkbox"
                      id={inputId}
                      name={`is${currency?.toLowerCase?.()}`}
                      innerRef={register}
                    />
                    <Label
                      className="custom-control-label btn btn-sm btn-primary"
                      htmlFor={inputId}
                    >
                      {currency}
                    </Label>
                  </div>
                );
              })}
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Sıralama</legend>
            <FormGroup>
              <Input
                className="custom-select"
                type="select"
                name="orderby"
                innerRef={register({
                  valueAsNumber: true,
                })}
              >
                {orderBy.map((el, idx) => {
                  return (
                    <option value={idx + 1} key={`${el}_${idx}`}>
                      {el}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <Button
              variant="primary"
              className="w-100"
              disabled={isFetching}
              type="submit"
            >
              İŞLEMLERİ FİLTRELE
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ActivitiesPendingFilter;
