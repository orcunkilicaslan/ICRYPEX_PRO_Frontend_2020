import { ReactComponent as SideLight } from "../../assets/images/header/header_theme_sidelight.svg";
import { ReactComponent as SideDark } from "../../assets/images/header/header_theme_sidedark.svg";

import { LinkButton } from "../LinkButton.jsx";
import { IconSet } from "../IconSet.jsx";

const HeaderRight = props => {
  return (
    <div className="header-right col-auto">
      <div className="header-right-theme siteformui">
        <div className="custom-control custom-switch">
          <span className="switchthemebg">
            <SideLight className="sidelightsvg" />
            <SideDark className="sidedarksvg" />
          </span>
          <input
            id="headThemeColor"
            className="custom-control-input"
            type="checkbox"
            defaultChecked
          />
          <label htmlFor="headThemeColor" className="custom-control-label" />
        </div>
      </div>
      <div className="header-right-icons">
        <a
          className="headsignedinicon fullscreen"
          href="#"
          title="Tam Sayfa Görünümü"
          data-toggle="fullscreenbtn"
        >
          <IconSet
            sprite="icon-sprtsmiconclrd"
            size="icon20"
            name="sm-pagefullscreen"
            variant=""
          />
        </a>
        <a
          className="headsignedinicon support"
          href="#"
          title="Destek"
          rel="bookmark"
        >
          <IconSet
            sprite="icon-sprtsmiconclrd"
            size="icon20"
            name="sm-support"
            variant=""
          />
        </a>
        <a
          className="headsignedinicon notif"
          href="#"
          data-toggle="modal"
          data-target="#modalHeadNotifications"
        >
          <span
            title="4 Yeni Bildiriminiz Var"
            data-toggle="tooltip"
            data-placement="bottom"
          >
            <IconSet
              sprite="icon-sprtsmiconclrd"
              size="icon20"
              name="sm-notif"
              variant=""
            >
              <span className="badge badge-pill badge-danger">4</span>
            </IconSet>
          </span>
        </a>
      </div>
      <div className="header-right-notsignedin pr-2">
        <LinkButton
          size="sm"
          variant="secondary"
          href="#"
          title="Üye Girişi"
          data-toggle="modal"
          data-target="#modalHeadSignIn"
        >
          Üye Girişi
        </LinkButton>
        <LinkButton
          size="sm"
          variant="success"
          href="#"
          title="Kayıt Ol"
          data-toggle="modal"
          data-target="#modalHeadSignUp"
        >
          Kayıt Ol
        </LinkButton>
      </div>
      <div className="header-right-signedin d-none"></div>
      <div className="header-right-lang">
        <LinkButton
          size="sm"
          variant="secondary"
          className="active"
          href="#"
          title="TR"
        >
          TR
        </LinkButton>
        <LinkButton size="sm" variant="secondary" href="#" title="EN">
          EN
        </LinkButton>
      </div>
    </div>
  );
};

export default HeaderRight;
