import { useState } from "react";
import { Form, FormGroup, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { merge } from "lodash";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { fetchPendingTransactions } from "~/state/slices/transaction.slice";
import { requestMethods } from "~/components/OpenOrder/OpenOrderAccountActivitiesPending";
import CustomSelect from "~/components/CustomSelect";
import { useLocaleUpperCase } from "~/state/hooks/";
import { orderByAccount as orderBy } from "../OpenOrder/OpenOrder";

const ActivitiesPendingFilter = props => {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const { t } = useTranslation(["openorder", "common"]);
  const dispatch = useDispatch();
  const toUpperCase = useLocaleUpperCase();
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
    const { methodTypeID, typeID, orderby, ...rest } = data;
    const typeIdx = parseInt(typeID, 10);
    const methodTypeIdx = parseInt(methodTypeID, 10);
    const toSubmit = {
      ...rest,
      isdeposit: true,
      iswithdraw: true,
      isbank: true,
      iscrypto: true,
      orderby: orderby + 1,
    };

    if (typeIdx !== -1) {
      merge(toSubmit, {
        isdeposit: typeIdx === 1,
        iswithdraw: typeIdx === 2,
      });
    }

    if (methodTypeIdx !== -1) {
      merge(toSubmit, {
        isbank: methodTypeIdx === 0,
        iscrypto: methodTypeIdx === 1,
      });
    }

    const { payload } = await dispatch(fetchPendingTransactions(toSubmit));

    if (!payload?.data?.status) {
      setApiError(payload?.errormessage);
    } else {
      setApiError("");
      clearModals();
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
      {...rest}
    >
      <ModalHeader toggle={clearModals}>
        {toUpperCase(t("pendingFilter"))}
      </ModalHeader>
      <ModalBody className="modalcomp modalcomp-filters">
        {apiError && <AlertResult error>{apiError}</AlertResult>}
        <Form
          className="modalfiltersform siteformui"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup tag="fieldset">
            <legend>{t("tradeType")}</legend>
            <FormGroup>
              <CustomSelect
                list={requestTypes}
                title={t("tradeType")}
                name="typeID"
                index={watch("typeID")}
                setIndex={id => setValue("typeID", id)}
                ref={register}
                namespace="openorder"
                useID
                prefix="requestType"
              />
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>{t("tradeMethod")}</legend>
            <FormGroup>
              <CustomSelect
                list={requestMethods}
                title={t("tradeMethod")}
                name="methodTypeID"
                index={watch("methodTypeID")}
                setIndex={id => setValue("methodTypeID", id)}
                ref={register}
              />
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>{t("sortBy")}</legend>
            <FormGroup>
              <CustomSelect
                list={orderBy}
                name="orderby"
                index={watch("orderby")}
                setIndex={id => setValue("orderby", id)}
                ref={register({
                  valueAsNumber: true,
                })}
                namespace="openorder"
              />
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <Button
              variant="primary"
              className="w-100"
              disabled={isFetching}
              type="submit"
            >
              {t("filterTransactions")}
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ActivitiesPendingFilter;
