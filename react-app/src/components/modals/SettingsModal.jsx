import {
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { useLocaleUpperCase } from "~/state/hooks/";
import {useDispatch, useSelector} from "react-redux";
import {uyeGiris} from "~/state/slices/weblogin.slice";

export default function SettingsModal(props) {
  const { isOpen, User, clearModals, onSignout, ...rest } = props;
  const toUpperCase = useLocaleUpperCase();
  const { t } = useTranslation(["app", "openorder"]);
  const { lang: currentLanguage } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const usermenulistaccount = [
    {
      title: t("profile"),
      tr: "profil",
      en: "profile",
    },
    {
      title: t("approvalLimit"),
      tr: "profil/hesap-onayi-ve-limit",
      en: "profile/account-approval-and-limit",
    },
    {
      title: t("assets"),
      tr: "profil/varliklar",
      en: "profile/assets",
    },
    {
      title: t("commissionRates"),
      tr: "profil/komisyonlar",
      en: "profile/commissions",
    },
    {
      title: t("notifications"),
      tr: "profil/bildirimler",
      en: "profile/notifications",
    },
    {
      title: t("openorder:accountActivities"),
      tr: "profil/yatirma-cekme-gecmisi",
      en: "profile/money-requests",
    },
    {
      title: t("openorder:tradeHistory"),
      tr: "profil/islem-gecmisi",
      en: "profile/histories",
    },
    {
      title: t("accountDetails"),
      tr: "profil/banka-hesap-bilgileri",
      en: "profile/bank-account-informations",
    },
  ];

  const usermenulistsecurity = [
    {
      title: t("sessionSecurity"),
      tr: "profil/giris-oturum-guvenligi",
      en: "profile/login-session-security",
    },
    {
      title: t("twofa"),
      tr: "profil/2fy",
      en: "profile/2fa",
    },
    {
      title: t("specialKey"),
      tr: "profil/ozel-anahtar-olustur",
      en: "profile/create-private-key",
    },
    {
      title: t("activityHistory"),
      tr: "profil/hareket-gecmisi",
      en: "profile/transaction-history",
    },
  ];

  async function navLink(listAccount) {
    const endpoint = listAccount[currentLanguage];

    if (endpoint) {
      if (currentLanguage === "tr") {
        const action= await dispatch(uyeGiris(endpoint))
        console.log(action)
      } else if (currentLanguage === "en") {
        console.log(endpoint)
      }
    }
  }

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
      {...rest}
    >
      <ModalHeader toggle={clearModals}>
        {toUpperCase(User?.info?.displayname)}
      </ModalHeader>
      <ModalBody className="modalcomp modalcomp-usermenu">
        <Button variant="secondary" className="modalcomp-usermenu-notif w-100">
          7 Adet bildiriminiz var.
        </Button>
        <div className="modalcomp-usermenu-area">
          <h6 className="modalcomp-usermenu-title">{t("myAccount")}</h6>
          <Nav vertical className="modalcomp-usermenu-list">
            {usermenulistaccount.map((listaccount, idx) => {
              return (
                <NavItem key={listaccount.title}>
                  <NavLink href={null} title={listaccount.title}   onClick={() => { navLink(listaccount)}}>
                    {listaccount.title}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <h6 className="modalcomp-usermenu-title">{t("security")}</h6>
          <Nav vertical className="modalcomp-usermenu-list">
            {usermenulistsecurity.map(({ title, href }) => {
              return (
                <NavItem key={title}>
                  <NavLink href={href} title={title}>
                    {title}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </div>
        <Button
          variant="danger"
          className="modalcomp-usermenu-signout w-100"
          onClick={onSignout}
        >
          {toUpperCase(t("signOut"))}
        </Button>
      </ModalBody>
    </Modal>
  );
}
