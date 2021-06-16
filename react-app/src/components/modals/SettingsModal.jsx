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
import {useSelector} from "react-redux";

export default function SettingsModal(props) {
  const { isOpen, User, clearModals, onSignout, ...rest } = props;
  const toUpperCase = useLocaleUpperCase();
  const { t } = useTranslation(["app", "openorder"]);
  const { settings: Settings } = useSelector(state => state.api);

  const usermenulistaccount = [
    {
      title: t("profile"),
      tr: "tr/profil",
      en: "en/profile",
    },
    {
      title: t("approvalLimit"),
      href: "#",
    },
    {
      title: t("assets"),
      href: "#",
    },
    {
      title: t("commissionRates"),
      href: "#",
    },
    {
      title: t("notifications"),
      href: "#",
    },
    {
      title: t("openorder:accountActivities"),
      href: "#",
    },
    {
      title: t("openorder:tradeHistory"),
      href: "#",
    },
    {
      title: t("accountDetails"),
      href: "#",
    },
  ];

  const usermenulistsecurity = [
    {
      title: t("sessionSecurity"),
      href: "#",
    },
    {
      title: t("twofa"),
      href: "#",
    },
    {
      title: t("specialKey"),
      href: "#",
    },
    {
      title: t("activityHistory"),
      href: "#",
    },
  ];

  const navLink = (navLink) => {

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
                  <NavLink href={null} title={listaccount.title} onclick={navLink(listaccount)}>
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
