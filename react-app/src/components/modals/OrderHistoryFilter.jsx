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
import { useTranslation } from "react-i18next";
import { merge } from "lodash";

import { Button } from "../Button.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { usePrices, useLocaleUpperCase } from "~/state/hooks";
import { fetchOrderHistory } from "~/state/slices/order.slice";
import { formatDate } from "~/util/";
import CustomSelect from "~/components/CustomSelect";
import { orderBy } from "../OpenOrder/OpenOrder";

export default function OrderHistoryFilter(props) {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const { t } = useTranslation(["app", "finance", "openorder", "common"]);
  const toUpperCase = useLocaleUpperCase();
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState("");
  const { lang } = useSelector(state => state.ui);
  const orderSides = useSelector(state => state.api.settings?.orderSides);
  const orderStatuses = useSelector(state => state.api.settings?.orderStatuses);
  const { allPairs } = usePrices();
  const { register, handleSubmit, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues,
  });
  const validStatuses = useMemo(() => {
    return orderStatuses.filter(({ id }) => id === 2 || id === 3);
  }, [orderStatuses]);

  const onSubmit = async data => {
    setApiError("");
    const {
      typeID,
      statusID,
      pairids,
      startdate: sd,
      enddate: ed,
      orderby,
      ...rest
    } = data;
    const typeIdx = parseInt(typeID, 10);
    const statusIdx = parseInt(statusID, 10);
    const toSubmit = {
      ...rest,
      isbuyorders: true,
      issellorders: true,
      isfilledorders: true,
      iscanceledorders: true,
      orderby: orderby + 1,
    };

    const _pairids = [];
    pairids?.forEach?.((bool, idx) => {
      if (bool) _pairids.push(allPairs?.[idx]?.id);
    });
    merge(toSubmit, { pairids: JSON.stringify(_pairids) });

    if (typeIdx !== -1) {
      merge(toSubmit, {
        isbuyorders: typeIdx === 1,
        issellorders: typeIdx === 2,
      });
    }

    if (statusIdx !== -1) {
      merge(toSubmit, {
        isfilledorders: statusIdx === 2,
        iscanceledorders: statusIdx === 3,
      });
    }

    if (sd && ed) {
      const startdate = formatDate(sd, "yyyy-MM-dd", {
        locale: lang,
      });
      const enddate = formatDate(ed, "yyyy-MM-dd", { locale: lang });
      merge(toSubmit, { startdate, enddate });
    }

    const { payload } = await dispatch(fetchOrderHistory(toSubmit));

    if (!payload?.data?.status) {
      setApiError(payload?.errormessage);
    } else {
      setApiError("");
      clearModals();
    }
  };

  // const onReset = () => {
  //   reset(defaultValues);
  //   setApiError("");
  //   clearErrors();
  // };

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
        {toUpperCase(t("openorder:tradeHistoryFilter"))}
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
            <legend>{t("openorder:tradePairs")}</legend>
            <FormGroup className="checkradioboxed">
              {allPairs?.map?.((pair, idx) => {
                const id = nanoid();

                return (
                  <div
                    key={pair?.symbol}
                    className="custom-control custom-checkbox custom-control-inline"
                  >
                    <Input
                      className="custom-control-input"
                      type="checkbox"
                      id={id}
                      name={`pairids.${idx}`}
                      innerRef={register}
                    />
                    <Label
                      className="custom-control-label btn btn-sm btn-secondary"
                      htmlFor={id}
                    >
                      {pair?.name.replace(/\s/g, "")}
                    </Label>
                  </div>
                );
              })}
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>{t("openorder:tradeType")}</legend>
            <FormGroup>
              <CustomSelect
                list={orderSides}
                title={t("openorder:tradeType")}
                name="typeID"
                index={watch("typeID")}
                setIndex={id => setValue("typeID", id)}
                ref={register}
                namespace="openorder"
                useID
                prefix="orderSide"
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
                namespace="openorder"
                useID
                prefix="orderStatus"
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
              type="submit"
              disabled={isFetching}
            >
              {toUpperCase(t("openorder:filterTransactions"))}
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
}
