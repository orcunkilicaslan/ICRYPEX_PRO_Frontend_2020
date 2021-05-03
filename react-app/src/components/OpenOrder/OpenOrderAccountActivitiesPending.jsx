import { useState, useEffect, useCallback, useMemo, memo } from "react";
import classnames from "classnames";
import { Col, Form } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { useClientRect } from "~/state/hooks";
import { formatDateDistance } from "~/util/";
import { setOpenModal } from "~/state/slices/ui.slice";
import {
  fetchPendingTransactions,
  cancelPendingTransaction,
} from "~/state/slices/transaction.slice";
import { ActivitiesPendingFilter } from "~/components/modals";
import CustomSelect from "~/components/CustomSelect";

export const requestCurrencies = ["TRY", "USD"];
const defaultValues = {
  isdeposit: true,
  iswithdraw: true,
  istry: true,
  isusd: true,
  isbank: true,
  ispapara: true,
  orderby: 1,
};

const OpenOrderAccountActivitiesPending = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "app"]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { lang, openModal } = useSelector(state => state.ui);
  const pendingTransactions = useSelector(state => state.transaction?.pending);
  const isFetching = useSelector(state => state.transaction?.isFetchingPending);
  const requestTypes = useSelector(
    state => state.api.settings?.moneyRequestTypes
  );
  const orderStatuses = useSelector(state => state.api.settings?.orderStatuses);
  const [requestTypeIdx, setRequestTypeIdx] = useState(-1);
  const [requestCurrenciesIdx, setrequestCurrenciesIdx] = useState(-1);

  const visibleTransactions = useMemo(() => {
    let transactions = pendingTransactions;
    const typeIdx = parseInt(requestTypeIdx, 10);
    const currenciesIdx = parseInt(requestCurrenciesIdx, 10);

    if (typeIdx !== -1) {
      transactions = transactions?.filter?.(
        ({ request_type_id }) => request_type_id === typeIdx
      );
    }

    if (currenciesIdx !== -1) {
      const currency = requestCurrencies[currenciesIdx];

      transactions = transactions.filter(
        ({ currencysymbol }) => currency === currencysymbol
      );
    }

    return transactions;
  }, [pendingTransactions, requestCurrenciesIdx, requestTypeIdx]);

  const onCancel = useCallback(id => dispatch(cancelPendingTransaction(id)), [
    dispatch,
  ]);

  const clearOpenModals = useCallback(() => {
    dispatch(setOpenModal("none"));
  }, [dispatch]);

  const openFiltersModal = useCallback(() => {
    dispatch(setOpenModal("activitiespendingfilter"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPendingTransactions(defaultValues));
  }, [dispatch]);

  const getOrderStatusText = (statusId = 1) => {
    const status = orderStatuses?.find?.(({ id }) => id === statusId);
    const key = status?.name?.toLowerCase?.();

    return t(`app:${key}`);
  };

  return (
    <div className="activities-pending">
      <Form
        className="tabcont tabcont-filterbar siteformui row"
        autoComplete="off"
        noValidate
      >
        <Col xs="auto">
          <CustomSelect
              list={requestTypes}
              title={"İşlem Tipi"}
              index={requestTypeIdx}
              setIndex={setRequestTypeIdx}
              namespace="finance"
          />
        </Col>
        <Col xs="auto">
          <CustomSelect
              list={requestCurrencies}
              title={"Para Birimleri"}
              index={requestCurrenciesIdx}
              setIndex={setrequestCurrenciesIdx}
          />
        </Col>
        <Col xs="auto">
          <Button variant="secondary" size="sm" onClick={openFiltersModal}>
            Detaylı Filtreleme
          </Button>
        </Col>
      </Form>
      <div className="activitiespendingtable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="nmbr">
                İşlem No
              </Table.Th>
              <Table.Th sizeauto className="date">
                Tarih
              </Table.Th>
              <Table.Th sizeauto className="type">
                İşlem Tipi
              </Table.Th>
              <Table.Th sizeauto className="mthd">
                Yöntem
              </Table.Th>
              <Table.Th sizeauto className="bank">
                Birim
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                Miktar
              </Table.Th>
              <Table.Th sizeauto className="stts">
                Durum
              </Table.Th>
              <Table.Th sizeauto className="bttn" />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
            striped
            hovered
            scrollbar
            scrollbarstyles={{ height: `${tableHeight - 36}px` }}
          >
            {visibleTransactions.map(
              ({
                id,
                datetime,
                currencysymbol,
                amount,
                request_type_id,
                requesttype,
                requst_method_id,
                requstmethod,
                status,
              }) => {
                const typecls = classnames({
                  sitecolorgreen: request_type_id === 1,
                  sitecolorred: request_type_id === 2,
                });

                const statuscls = classnames({
                  sitecoloryellow: status === 1,
                  sitecolorgreen: status === 2,
                  sitecolorred: status > 2,
                });

                return (
                  <Table.Tr key={id}>
                    <Table.Td sizeauto className="nmbr">
                      {id}
                    </Table.Td>
                    <Table.Td sizeauto className="date">
                      <span title={datetime}>
                        {formatDateDistance(new Date(datetime), Date.now(), {
                          locale: lang,
                        })}
                      </span>
                    </Table.Td>
                    <Table.Td sizeauto className="type">
                      <span className={typecls}>{requesttype}</span>
                    </Table.Td>
                    <Table.Td sizeauto className="mthd">
                      {requstmethod}
                    </Table.Td>
                    <Table.Td sizeauto className="bank">
                      {currencysymbol}
                    </Table.Td>
                    <Table.Td sizefixed className="amnt">
                      {amount}
                    </Table.Td>
                    <Table.Td sizeauto className="stts">
                      <span className={statuscls}>
                        {getOrderStatusText(status)}
                      </span>
                    </Table.Td>
                    <Table.Td sizeauto className="bttn">
                      <Button onClick={() => onCancel(id)}>
                        <IconSet sprite="sprtsmclrd" size="14" name="delete" />
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                );
              }
            )}
          </Table.Tbody>
        </Table>
      </div>
      <ActivitiesPendingFilter
        isOpen={openModal === "activitiespendingfilter"}
        clearModals={clearOpenModals}
        defaultValues={defaultValues}
        isFetching={isFetching}
      />
    </div>
  );
};

export default memo(OpenOrderAccountActivitiesPending);
