import { useState, useMemo } from "react";
import {
  Col,
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
import { merge } from "lodash";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { fetchTransactionHistories } from "~/state/slices/transaction.slice";
import { useCurrencies, useLocaleUpperCase } from "~/state/hooks/";
import { formatDate } from "~/util/";
import CustomSelect from "~/components/CustomSelect";
import { orderByAccount as orderBy } from "../OpenOrder/OpenOrder";

const ActivitiesHistoryFilter = props => {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const { t } = useTranslation(["openorder", "common"]);
  const dispatch = useDispatch();
  const toUpperCase = useLocaleUpperCase();
  const [apiError, setApiError] = useState("");
  const { lang } = useSelector(state => state.ui);
  const requestTypes = useSelector(
    state => state.api.settings?.moneyRequestTypes
  );
  const orderStatuses = useSelector(state => state.api.settings?.orderStatuses);
  const { activeCurrencies } = useCurrencies();
  const { register, handleSubmit, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const validStatuses = useMemo(() => {
    return orderStatuses.filter(({ id }) => id === 2 || id === 3);
  }, [orderStatuses]);

  const validCurrencies = useMemo(() => {
    return activeCurrencies.filter(({ symbol }) => symbol !== "EUR");
  }, [activeCurrencies]);

  const onSubmit = async data => {
    setApiError("");
    const {
      typeID,
      statusID,
      currencyids,
      startdate: sd,
      enddate: ed,
      orderby,
      ...rest
    } = data;
    const typeIdx = parseInt(typeID, 10);
    const statusIdx = parseInt(statusID, 10);
    const toSubmit = {
      ...rest,
      isdeposit: true,
      iswithdraw: true,
      isrealized: true,
      iscanceled: true,
      orderby: orderby + 1,
    };

    const _currencyids = [];
    currencyids?.forEach?.((bool, idx) => {
      if (bool) {
        const id = validCurrencies?.[idx]?.id;
        _currencyids.push(parseInt(id, 10));
      }
    });
    merge(toSubmit, { currencyids: JSON.stringify(_currencyids) });

    if (typeIdx !== -1) {
      merge(toSubmit, {
        isdeposit: typeIdx === 1,
        iswithdraw: typeIdx === 2,
      });
    }

    if (statusIdx !== -1) {
      merge(toSubmit, {
        isrealized: statusIdx === 2,
        iscanceled: statusIdx === 3,
      });
    }

    if (sd && ed) {
      const startdate = formatDate(sd, "yyyy-MM-dd", {
        locale: lang,
      });
      const enddate = formatDate(ed, "yyyy-MM-dd", { locale: lang });
      merge(toSubmit, { startdate, enddate });
    }

    const { payload } = await dispatch(fetchTransactionHistories(toSubmit));

    if (!payload?.status) {
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
        {toUpperCase(t("transferHistoryFilter"))}
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
            <legend>{t("common:currencies")}</legend>
            <FormGroup className="checkradioboxed">
              {validCurrencies?.map?.(({ symbol }, idx) => {
                const inputId = nanoid();
                return (
                  <div
                    key={symbol}
                    className="custom-control custom-checkbox custom-control-inline"
                  >
                    <Input
                      className="custom-control-input"
                      type="checkbox"
                      id={inputId}
                      name={`currencyids.${idx}`}
                      innerRef={register}
                    />
                    <Label
                      className="custom-control-label btn btn-sm btn-secondary"
                      htmlFor={inputId}
                    >
                      {symbol}
                    </Label>
                  </div>
                );
              })}
            </FormGroup>
          </FormGroup>
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
                namespace="finance"
              />
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>{t("openorder:tradeStatus")}</legend>
            <FormGroup>
              <CustomSelect
                list={validStatuses}
                title={t("openorder:tradeStatus")}
                name="statusID"
                index={watch("statusID")}
                setIndex={id => setValue("statusID", id)}
                ref={register}
                namespace="app"
              />
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>{t("common:dateRange")}</legend>
            <FormGroup row>
              <Col>
                <Input
                  type="date"
                  title={t("common:startDate")}
                  name="startdate"
                  innerRef={register({
                    valueAsDate: true,
                  })}
                />
              </Col>
              <Col>
                <Input
                  type="date"
                  name="enddate"
                  title={t("common:endDate")}
                  innerRef={register({
                    valueAsDate: true,
                  })}
                />
              </Col>
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>{t("openorder:sortBy")}</legend>
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
              {t("openorder:filterTransactions")}
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ActivitiesHistoryFilter;
