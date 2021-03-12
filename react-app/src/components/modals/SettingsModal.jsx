import {
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { Button } from "../Button.jsx";

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

export default function SettingsModal(props) {
  const { isOpen, User, clearModals, onSignout, ...rest } = props;

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
      <ModalHeader toggle={clearModals}>
        {User?.firstname} {String(User?.lastname).toUpperCase()}
      </ModalHeader>
      <ModalBody className="modalcomp modalcomp-usermenu">
        <Button variant="secondary" className="modalcomp-usermenu-notif w-100">
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
  );
}
