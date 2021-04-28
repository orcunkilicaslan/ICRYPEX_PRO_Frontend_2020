import { useState, useEffect, useCallback, useMemo, memo } from "react";
import classnames from "classnames";
import { Row, Col, Form } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { useClientRect } from "~/state/hooks";
import { formatDateDistance, isBitOn } from "~/util/";
import { setOpenModal } from "~/state/slices/ui.slice";
import {
  fetchPendingTransactions,
  cancelPendingTransaction,
} from "~/state/slices/transaction.slice";
import { ActivitiesPendingFilter } from "~/components/modals";
import ButtonGroupCheckbox from "~/components/ButtonGroupCheckbox";

export const requestMethods = [
  { name: "Banka", fieldName: "isbank" },
  { name: "Papara", fieldName: "ispapara" },
];
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
  const [requestTypeMask, setRequestTypeMask] = useState(null);
  const [requestMethodMask, setRequestMethodMask] = useState(null);
  const [requestCurrenciesMask, setRequestCurrenciesMask] = useState(null);

  const visibleTransactions = useMemo(() => {
    let transactions = pendingTransactions;

    if (requestTypeMask) {
      const isDepositOn = isBitOn(requestTypeMask, 0);
      const isWithdrawOn = isBitOn(requestTypeMask, 1);

      transactions = transactions.filter(({ request_type_id }) => {
        switch (request_type_id) {
          case 1:
            return isDepositOn;
          case 2:
            return isWithdrawOn;
          default:
            return true;
        }
      });
    }

    if (requestMethodMask) {
      const isBankOn = isBitOn(requestMethodMask, 0);
      const isPaparaOn = isBitOn(requestMethodMask, 1);

      transactions = transactions.filter(({ requst_method_id }) => {
        switch (requst_method_id) {
          case 1:
            return isBankOn;
          case 2:
            return isPaparaOn;
          default:
            return true;
        }
      });
    }

    if (requestCurrenciesMask) {
      const isTRYOn = isBitOn(requestCurrenciesMask, 0);
      const isUSDOn = isBitOn(requestCurrenciesMask, 1);

      transactions = transactions.filter(({ currencysymbol }) => {
        switch (currencysymbol) {
          case "TRY":
            return isTRYOn;
          case "USD":
            return isUSDOn;
          default:
            return true;
        }
      });
    }

    return transactions;
  }, [
    pendingTransactions,
    requestCurrenciesMask,
    requestMethodMask,
    requestTypeMask,
  ]);

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
        className="tabcont tabcont-filterbar siteformui"
        autoComplete="off"
        noValidate
      >
        <Row className="tabcont tabcont-filterbar">
          <Col xs="auto">
            <Button variant="secondary" size="sm" onClick={openFiltersModal}>
              Filtre
            </Button>
          </Col>
          <Col sm="2">
            <ButtonGroupCheckbox
              list={requestTypes}
              mask={requestTypeMask}
              setMask={setRequestTypeMask}
              namespace="finance"
            />
          </Col>
          <Col sm="2">
            <ButtonGroupCheckbox
              list={requestMethods}
              mask={requestMethodMask}
              setMask={setRequestMethodMask}
              namespace="finance"
            />
          </Col>
          <Col sm="2">
            <ButtonGroupCheckbox
              list={requestCurrencies}
              mask={requestCurrenciesMask}
              setMask={setRequestCurrenciesMask}
            />
          </Col>
        </Row>
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
