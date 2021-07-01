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
import { merge } from "lodash";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { usePrices, useLocaleUpperCase } from "~/state/hooks";
import { fetchOpenOrders } from "~/state/slices/order.slice";
import CustomSelect from "~/components/CustomSelect";
import { orderBy } from "../OpenOrder/OpenOrder";

const OrderOpenOrdersFilter = props => {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const dispatch = useDispatch();
  const toUpperCase = useLocaleUpperCase();
  const { t } = useTranslation(["openorder"]);
  const [apiError, setApiError] = useState("");
  const { allPairs } = usePrices();
  const orderSides = useSelector(state => state.api.settings?.orderSides);
  const { register, handleSubmit, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async data => {
    setApiError("");
    const { typeID, pairids, orderby, ...rest } = data;
    const typeIdx = parseInt(typeID, 10);
    const toSubmit = {
      ...rest,
      isbuyorders: true,
      issellorders: true,
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

    const { payload } = await dispatch(fetchOpenOrders(toSubmit));

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
        {toUpperCase(t("openOrdersFilter"))}
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
            <legend>{t("tradePairs")}</legend>
            <FormGroup className="checkradioboxed">
              {allPairs?.map?.((pair, idx) => {
                return (
                  <div
                    key={pair?.symbol}
                    className="custom-control custom-checkbox custom-control-inline"
                  >
                    <Input
                      className="custom-control-input"
                      type="checkbox"
                      id={`filterPair${pair?.symbol}`}
                      name={`pairids.${idx}`}
                      innerRef={register}
                    />
                    <Label
                      className="custom-control-label btn btn-sm btn-secondary"
                      htmlFor={`filterPair${pair?.symbol}`}
                    >
                      {pair?.name.replace(/\s/g, "")}
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
                list={orderSides}
                title={t("tradeType")}
                name="typeID"
                index={watch("typeID")}
                setIndex={id => setValue("typeID", id)}
                ref={register}
                namespace="openorder"
                useID
                prefix="orderSide"
              />
            </FormGroup>{" "}
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>{t("sortBy")}</legend>
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
          <FormGroup tag="fieldset">
            <Button
              variant="primary"
              className="w-100"
              disabled={isFetching}
              type="submit"
            >
              {toUpperCase(t("filterTransactions"))}
            </Button>
            {/* <Button
                variant="secondary"
                size="sm"
                className="active"
                onClick={onReset}
              >
                Sıfırla
              </Button> */}
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default OrderOpenOrdersFilter;
