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
import { usePrices } from "~/state/hooks";
import { fetchOrderHistory } from "~/state/slices/order.slice";
import { formatDate } from "~/util/";
import CustomSelect from "~/components/CustomSelect";

const orderBy = [
  "Önce Yeni Tarihli",
  "Önce Eski Tarihli",
  "Önce Alış",
  "Önce Satış",
  "Alfabetik",
];

export default function OrderHistoryFilter(props) {
  const { isOpen, clearModals, defaultValues, isFetching, ...rest } = props;
  const { t } = useTranslation(["app", "finance"]);
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

    if (!payload?.status) {
      setApiError(payload?.errormessage);
    } else {
      setApiError("");
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
      backdrop="static"
      {...rest}
    >
      <ModalHeader toggle={clearModals}>İŞLEM GEÇMİŞİ FİLTRE</ModalHeader>
      <ModalBody className="modalcomp modalcomp-filters">
        {apiError && <AlertResult error>{apiError}</AlertResult>}
        <Form
          className="modalfiltersform siteformui"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup tag="fieldset">
            <legend>İşlem Çiftleri</legend>
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
            <legend>İşlem Tipi</legend>
            <FormGroup>
              <CustomSelect
                list={orderSides}
                title={"İşlem Tipi"}
                name="typeID"
                index={watch("typeID")}
                setIndex={id => setValue("typeID", id)}
                ref={register}
              />
            </FormGroup>{" "}
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
              />{" "}
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
              type="submit"
              disabled={isFetching}
            >
              İŞLEMLERİ FİLTRELE
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
}
