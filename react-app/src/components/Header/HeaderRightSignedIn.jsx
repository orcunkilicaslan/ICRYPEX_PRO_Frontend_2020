import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";

const usermenulistaccount = [
  {
    title: "Profil",
    href: "#",
  },
  {
    title: "Hesap Onayı & Limit",
    href: "#",
  },
  {
    title: "Varlıklar",
    href: "#",
  },
  {
    title: "Komisyon Oranları",
    href: "#",
  },
  {
    title: "Bildirimler",
    href: "#",
  },
  {
    title: "Hesap Hareketleri",
    href: "#",
  },
  {
    title: "İşlem Geçmişi",
    href: "#",
  },
  {
    title: "Bildirim Seçenekleri",
    href: "#",
  },
  {
    title: "Banka Hesap Bilgileri",
    href: "#",
  },
];

const usermenulistsecurity = [
  {
    title: "Giriş & Oturum Güvenliği",
    href: "#",
  },
  {
    title: "2FA Aktivasyon",
    href: "#",
  },
  {
    title: "Özel Anahtar Oluştur",
    href: "#",
  },
  {
    title: "Hareket Geçmişi",
    href: "#",
  },
];

const HeaderRightSignedIn = props => {
  const { user, onSignout } = props;
  const [signedUserModal, setsignedUserModal] = useState(false);

  const signedUserModalToggle = () => {
    setsignedUserModal(!signedUserModal);
  };

  return (
    <div className="header-right-signedin pr-2">
      <Button className="useraccountarea" onClick={signedUserModalToggle}>
        <div className="useraccountarea-avatar rounded-pill">
          <IconSet sprite="sprtlgclrd" size="50gray" name="user" />
        </div>
        <h3 className="useraccountarea-name">
          {user.firstname} {String(user.lastname).toUpperCase()}
        </h3>
        <i className="siteiconsdropdown downdirection"></i>
      </Button>
      <Modal
        wrapClassName=""
        modalClassName="modal-rightside"
        size="sm"
        isOpen={signedUserModal}
        toggle={signedUserModalToggle}
        keyboard={false}
        fade={false}
        autoFocus={false}
        backdrop="static"
      >
        <ModalHeader toggle={signedUserModalToggle}>
          {user.firstname} {String(user.lastname).toUpperCase()}
        </ModalHeader>
        <ModalBody className="modalcomp modalcomp-usermenu">
          <Button
            variant="secondary"
            className="modalcomp-usermenu-notif w-100"
          >
            7 Adet bildiriminiz var.
          </Button>
          <div className="modalcomp-usermenu-area">
            <h6 className="modalcomp-usermenu-title">Hesabım</h6>
            <Nav vertical className="modalcomp-usermenu-list">
              {usermenulistaccount.map(({ title, href }) => {
                return (
                  <NavItem key={title}>
                    <NavLink href={href} title={title}>
                      {title}
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>
            <h6 className="modalcomp-usermenu-title">Güvenlik</h6>
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
            ÇIKIŞ YAP
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default HeaderRightSignedIn;
