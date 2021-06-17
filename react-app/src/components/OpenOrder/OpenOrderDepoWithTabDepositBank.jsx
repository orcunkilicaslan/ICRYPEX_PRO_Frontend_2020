import {Fragment, useState} from "react";
import {Input, Label, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";

import BankAccountsForm from "~/components/OpenOrder/OpenOrderDepoWithTabDepositBankForm";
import { useBanks } from "~/state/hooks/";
import {IconSet} from "~/components/IconSet";
import {Button} from "~/components/Button";

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
  const { accountsByBankCode } = useBanks();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
      <Fragment>
        {0 === 1 ? (
            <div className="dandwinforesult resultbox">
              <div className="modal-content text-center">
                <div className="modal-body modal-confirm">
                  <IconSet sprite="sprtlgclrd" size="50clrd" name="warning" />
                  <h6>Banka Transferi ile Para Yatırma</h6>
                  <p>İşleminize devam edebilmek için lütfen <a className="urllink"><u>Kural ve Şartları</u></a> dikkatle okuyup onaylayınız.</p>
                  <div className="contcheckbox">
                    <div className="custom-control custom-checkbox">
                      <Input
                          className="custom-control-input"
                          id="depositTabBankIhaveRead"
                          type="checkbox"
                      />
                      <Label
                          className="custom-control-label"
                          htmlFor="depositTabBankIhaveRead"
                      >
                        Okudum ve onaylıyorum.
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Button variant="primary" className="w-100 disabled">
                    DEVAM ET
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
              </div>
            </div>
        )}
      </Fragment>
  );
};

export default OpenOrderDepoWithTabDepositBank;
