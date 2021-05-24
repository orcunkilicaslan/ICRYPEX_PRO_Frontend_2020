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

import { Button } from "../Button.jsx";
import { AlertResult } from "../AlertResult.jsx";
import { fetchTransactionHistories } from "~/state/slices/transaction.slice";
import { useCurrencies } from "~/state/hooks/";
import { formatDate } from "~/util/";
import CustomSelect from "~/components/CustomSelect";

const orderBy = [
  "Önce Yeni Tarihli",
  "Önce Eski Tarihli",
  "Önce Para Yatırma",
  "Önce Para Çekme",
  "Önce TRY",
  "Önce USD",
  "Önce Kripto Para",
];

const ActivitiesHistoryFilter = props => {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const dispatch = useDispatch();
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
      <ModalHeader toggle={clearModals}>TRANSFER GEÇMİŞİ FİLTRE</ModalHeader>
      <ModalBody className="modalcomp modalcomp-filters">
        {apiError && <AlertResult error>{apiError}</AlertResult>}
        <Form
          className="modalfiltersform siteformui"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup tag="fieldset">
            <legend>Para Birimleri</legend>
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
                      className="custom-control-label btn btn-sm btn-primary"
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
            <legend>İşlem Durumu</legend>
            <FormGroup>
              <CustomSelect
                list={validStatuses}
                title={"İşlem Durumu"}
                name="statusID"
                index={watch("statusID")}
                setIndex={id => setValue("statusID", id)}
                ref={register}
                namespace="app"
              />
            </FormGroup>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Tarih Aralığı</legend>
            <FormGroup row>
              <Col>
                <Input
                  type="date"
                  title="Start Date"
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
                  title="End Date"
                  innerRef={register({
                    valueAsDate: true,
                  })}
                />{" "}
              </Col>
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

export default ActivitiesHistoryFilter;
