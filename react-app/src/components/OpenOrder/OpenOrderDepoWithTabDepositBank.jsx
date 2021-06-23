import {Fragment, useState} from "react";
import {Input, Label, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";

import BankAccountsForm from "~/components/OpenOrder/OpenOrderDepoWithTabDepositBankForm";
import { useBanks } from "~/state/hooks/";
import {IconSet} from "~/components/IconSet";
import {Button} from "~/components/Button";
import {setOpenModal} from "~/state/slices/ui.slice";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

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
  const [read, setRead] = useState({click: false, show: false});
  const { accountsByBankCode } = useBanks();
  const dispatch = useDispatch();
  const { t } = useTranslation(["form", "finance", "common","login"]);
  const btnClass  = classnames({ 'disabled': read.click === false,'w-100': true });
  const { lang: currentLanguage } = useSelector(state => state.ui);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const showForm = () => {
    if(read.click) {setRead({...read,show: !read.show})}
  }

  const openTermsModal = () => {
    dispatch(setOpenModal("depositwithdrawalterms"));
  };

  return (
      <Fragment>
        {!read.show ? (
            <div className="dandwinforesult resultbox">
              <div className="modal-content text-center">
                <div className="modal-body modal-confirm">
                  <IconSet sprite="sprtlgclrd" size="50clrd" name="warning" />
                  <h6>{t("finance:depositBankTransfer")}</h6>
                  <p>İşleminize devam edebilmek için lütfen <a className="urllink"><u onClick={()=> {openTermsModal()}}>Kural ve Şartları</u></a> dikkatle okuyup onaylayınız.</p>
                  <div className="contcheckbox">
                    <div className="custom-control custom-checkbox">
                      <Input
                          className="custom-control-input"
                          id="depositTabBankIhaveRead"
                          type="checkbox"
                          onClick={() => setRead && setRead(  {...read,click: !read.click})}
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
                  <Button variant="primary" className={btnClass} onClick={() => showForm()}>
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
                {currentLanguage==="en" ?
                    (
                        <ul>
                          <li>
                            Only the name, surname and T.C. you registered in our system.
                            Amounts from bank accounts belonging to the Identity Number
                            are accepted.
                          </li>
                          <li>
                            You can transfer the amount you want to deposit to the above
                            Icrypex account via your bank.
                          </li>
                        </ul>
                    ): (
                        <ul>
                          <li>
                            Yalnızca sistemimize kayıt olduğunuz isim, soyisim ve T.C. Kimlik
                            Numarası’na ait banka hesaplarından gelen tutarlar kabul
                            edilmektedir.
                          </li>
                          <li>
                            Yatırmak istediğiniz miktarı bankanız üzerinden yukardaki Icrypex
                            hesabına Havale/EFT yapabilirsiniz.
                          </li>
                        </ul>
                  )}
              </div>
            </div>
        )}
      </Fragment>
  );
};

export default OpenOrderDepoWithTabDepositBank;
