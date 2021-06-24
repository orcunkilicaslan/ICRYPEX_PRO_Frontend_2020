import { Fragment, useState } from "react";
import {
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import BankAccountsForm from "~/components/OpenOrder/OpenOrderDepoWithTabDepositBankForm";
import { useBanks } from "~/state/hooks/";
import { IconSet } from "~/components/IconSet";
import { Button } from "~/components/Button";
import { setOpenModal } from "~/state/slices/ui.slice";
import DepositWithdrawalTermsModal from "~/components/modals/DepositWithdrawalTermsModal.jsx";

const tabs = [
  {
    bankCode: "00046",
    titleIcon: "akbank",
  },
  {
    bankCode: "00010",
    titleIcon: "ziraat",
  },
  {
    bankCode: "00015",
    titleIcon: "vakifbank",
  },
];

const OpenOrderDepoWithTabDepositBank = props => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.bankCode);
  const [read, setRead] = useState({ click: false, show: false });
  const { accountsByBankCode } = useBanks();
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "finance", "common", "login"]);
  const { openModal } = useSelector(state => state.ui);
  const btnClass = classnames({
    disabled: read.click === false,
    "w-100": true,
  });

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const showForm = () => {
    if (read.click) {
      setRead({ ...read, show: !read.show });
    }
  };

  const openTermsModal = () => {
    dispatch(setOpenModal("depositwithdrawalterms"));
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  return (
    <Fragment>
      {!read.show ? (
        <div className="dandwinforesult resultbox">
          <div className="modal-content text-center">
            <div className="modal-body modal-confirm">
              <IconSet sprite="sprtlgclrd" size="50clrd" name="warning" />
              <h6>{t("finance:depositBankTransfer")}</h6>
              <p>
                {`${t("finance:rulesNotice1")} `}
                <span className="urllink">
                  <u onClick={() => openTermsModal()}>
                    {t("finance:rulesNotice2")}
                  </u>
                </span>
                {` ${t("finance:rulesNotice3")}`}
              </p>
              <div className="contcheckbox">
                <div className="custom-control custom-checkbox">
                  <Input
                    className="custom-control-input"
                    id="depositTabBankIhaveRead"
                    type="checkbox"
                    onClick={() =>
                      setRead && setRead({ ...read, click: !read.click })
                    }
                  />
                  <Label
                    className="custom-control-label"
                    htmlFor="depositTabBankIhaveRead"
                  >
                    {t("login:readAndAgreeCapital")}
                  </Label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button
                variant="primary"
                className={btnClass}
                onClick={() => showForm()}
              >
                {t("common:continue")}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="dandwtab-bank dandwtab-bank-tabs tabareaflexflow">
          <Nav justified className="sitetabs">
            {tabs.map(({ bankCode, titleIcon }) => {
              const cls = classnames({ active: activeTab === bankCode });

              return (
                <NavItem key={bankCode}>
                  <NavLink
                    className={`banklogostablink ${cls}`}
                    onClick={() => toggle(bankCode)}
                  >
                    <i className={`banksprttablogos logo${titleIcon}`}></i>
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <TabContent className="sitetabs" activeTab={activeTab}>
            {tabs.map(({ bankCode, component: Comp }) => {
              const accounts = accountsByBankCode[bankCode];

              return (
                <TabPane key={bankCode} tabId={bankCode}>
                  <BankAccountsForm bankCode={bankCode} accounts={accounts} />
                </TabPane>
              );
            })}
          </TabContent>
          <div className="bttminfolist">
            <ul>
              <li>{t("finance:depositBankInfo1")}</li>
              <li>{t("finance:depositBankInfo2")}</li>
            </ul>
          </div>
        </div>
      )}
      <DepositWithdrawalTermsModal
        isOpen={openModal === "depositwithdrawalterms"}
        clearModals={clearOpenModals}
      />
    </Fragment>
  );
};

export default OpenOrderDepoWithTabDepositBank;
