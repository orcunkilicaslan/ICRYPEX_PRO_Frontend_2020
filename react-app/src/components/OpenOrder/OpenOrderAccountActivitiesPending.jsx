import { useState, useEffect, useCallback, useMemo, memo } from "react";
import classnames from "classnames";
import { Col, Form } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { useClientRect, useCurrencies } from "~/state/hooks";
import { formatDateDistance } from "~/util/";
import { setOpenModal } from "~/state/slices/ui.slice";
import {
  fetchPendingTransactions,
  cancelPendingTransaction,
} from "~/state/slices/transaction.slice";
import { ActivitiesPendingFilter } from "~/components/modals";
import CustomSelect from "~/components/CustomSelect";

export const requestMethods = ["bank", "crypto"];
export const requestCurrencies = ["TRY", "USD"];
const defaultValues = {
  isdeposit: true,
  iswithdraw: true,
  iscrypto: true,
  isbank: true,
  orderby: 0,
};

const OpenOrderAccountActivitiesPending = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "app", "openorder", "common"]);
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { findCurrencyBySymbol, activeCurrencies } = useCurrencies();
  const { lang, openModal } = useSelector(state => state.ui);
  const pendingTransactions = useSelector(state => state.transaction?.pending);
  const isFetching = useSelector(state => state.transaction?.isFetchingPending);
  const requestTypes = useSelector(
    state => state.api.settings?.moneyRequestTypes
  );
  const [requestTypeIdx, setRequestTypeIdx] = useState(-1);
  const [requestCurrenciesIdx, setrequestCurrenciesIdx] = useState(-1);

  const requestCurrencies = useMemo(() => {
    return activeCurrencies?.map(({ symbol }) => symbol);
  }, [activeCurrencies]);

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
  }, [
    pendingTransactions,
    requestCurrencies,
    requestCurrenciesIdx,
    requestTypeIdx,
  ]);

  const onCancel = useCallback(
    id => dispatch(cancelPendingTransaction(id)),
    [dispatch]
  );

  const clearOpenModals = useCallback(() => {
    dispatch(setOpenModal("none"));
  }, [dispatch]);

  const openFiltersModal = useCallback(() => {
    dispatch(setOpenModal("activitiespendingfilter"));
  }, [dispatch]);

  useEffect(() => {
    const toSubmit = {
      ...defaultValues,
      orderby: 1,
    };

    dispatch(fetchPendingTransactions(toSubmit));
  }, [dispatch]);

  return (
    <div className="activities-pending">
      <Form
        className="tabcont tabcont-filterbar siteformui row"
        autoComplete="off"
        noValidate
      >
        <Col xs="auto">
          <CustomSelect
            size="sm"
            list={requestTypes}
            title={t("openorder:tradeType")}
            index={requestTypeIdx}
            setIndex={setRequestTypeIdx}
            namespace="openorder"
            useID
            prefix="requestType"
          />
        </Col>
        <Col xs="auto">
          <CustomSelect
            size="sm"
            list={requestCurrencies}
            title={t("common:currencies")}
            index={requestCurrenciesIdx}
            setIndex={setrequestCurrenciesIdx}
            dontTranslate
          />
        </Col>
        <Col xs="auto">
          <Button variant="secondary" size="sm" onClick={openFiltersModal}>
            {t("openorder:detailedFilter")}
          </Button>
        </Col>
      </Form>
      <div className="activitiespendingtable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="nmbr">
                {t("openorder:tradeNo")}
              </Table.Th>
              <Table.Th sizeauto className="date">
                {t("common:date")}
              </Table.Th>
              <Table.Th sizeauto className="type">
                {t("openorder:tradeType")}
              </Table.Th>
              <Table.Th sizeauto className="mthd">
                {t("common:method")}
              </Table.Th>
              <Table.Th sizeauto className="bank">
                {t("common:unit")}
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                {t("common:amount")}
              </Table.Th>
              <Table.Th sizeauto className="stts">
                {t("common:status")}
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
                const currency = findCurrencyBySymbol(currencysymbol);
                const { digit, digit_show } = currency;

                const requestType = t(
                  `openorder:requestType${request_type_id}`
                );
                const requestMethod = t(
                  `openorder:requestMethod${requst_method_id}`
                );
                const requestStatus = t(`openorder:requestStatus${status}`);

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
                      <span className={typecls}>{requestType}</span>
                    </Table.Td>
                    <Table.Td sizeauto className="mthd">
                      {requestMethod}
                    </Table.Td>
                    <Table.Td sizeauto className="bank">
                      {currencysymbol}
                    </Table.Td>
                    <Table.Td sizefixed className="amnt" title={amount}>
                      <NumberFormat
                        value={amount}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={digit_show || digit}
                        fixedDecimalScale
                        suffix={` ${currencysymbol}`}
                      />
                    </Table.Td>
                    <Table.Td sizeauto className="stts">
                      <span className={statuscls}>{requestStatus}</span>
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
