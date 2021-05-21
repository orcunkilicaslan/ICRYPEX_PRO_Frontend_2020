import { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { merge } from "lodash";

import { Button } from "../Button.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { fetchPendingTransactions } from "~/state/slices/transaction.slice";
import { requestCurrencies } from "~/components/OpenOrder/OpenOrderAccountActivitiesPending";
import CustomSelect from "~/components/CustomSelect";

const orderBy = [
  "Önce Yeni Tarihli",
  "Önce Eski Tarihli",
  "Önce Para Yatırma",
  "Önce Para Çekme",
  "Önce TRY",
  "Önce USD",
];

const ActivitiesPendingFilter = props => {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState("");
  const requestTypes = useSelector(
    state => state.api.settings?.moneyRequestTypes
  );
  const { register, handleSubmit, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async data => {
    setApiError("");
    const { currencyTypeID, typeID, ...rest } = data;
    const typeIdx = parseInt(typeID, 10);
    const currencyTypeIdx = parseInt(currencyTypeID, 10);
    const toSubmit = {
      ...rest,
      isdeposit: true,
      iswithdraw: true,
      istry: true,
      isusd: true,
    };

    if (typeIdx !== -1) {
      merge(toSubmit, {
        isdeposit: typeIdx === 1,
        iswithdraw: typeIdx === 2,
      });
    }

    if (currencyTypeIdx !== -1) {
      merge(toSubmit, {
        istry: currencyTypeIdx === 0,
        isusd: currencyTypeIdx === 1,
      });
    }

    const { payload } = await dispatch(fetchPendingTransactions(toSubmit));

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
            <FormGroup>
              <CustomSelect
                list={requestTypes}
                title={"İşlem Tipi"}
                name="typeID"
                index={watch("typeID")}
                setIndex={id => setValue("typeID", id)}
                ref={register}
                namespace="finance"
              />
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Para Birimi</legend>
            <FormGroup>
              <CustomSelect
                list={requestCurrencies}
                title={"Para Birimi"}
                name="currencyTypeID"
                index={watch("currencyTypeID")}
                setIndex={id => setValue("currencyTypeID", id)}
                ref={register}
                namespace="finance"
              />
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
