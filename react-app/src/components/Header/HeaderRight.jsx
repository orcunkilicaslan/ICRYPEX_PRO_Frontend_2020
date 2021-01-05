import { UncontrolledTooltip } from "reactstrap";

import { ReactComponent as SideLight } from "../../assets/images/header/header_theme_sidelight.svg";
import { ReactComponent as SideDark } from "../../assets/images/header/header_theme_sidedark.svg";

import { ButtonLink } from "../ButtonLink.jsx";
import { Button } from "../Button.jsx";

import { IconSet } from "../IconSet.jsx";

const HeaderRight = props => {
  const { setLanguage } = props;

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
          <IconSet sprite="sprtsmclrd" size="20" name="pagefullscreen" />
        </a>
        <a
          className="headsignedinicon support"
          href="#"
          title="Destek"
          rel="bookmark"
        >
          <IconSet sprite="sprtsmclrd" size="20" name="support" />
        </a>
        <a
          className="headsignedinicon notif"
          href="#"
          data-toggle="modal"
          data-target="#modalHeadNotifications"
        >
          <span id="headTooltipNotif">
            <IconSet sprite="sprtsmclrd" size="20" name="notif">
              <span className="badge badge-pill badge-danger">4</span>
            </IconSet>
          </span>
          <UncontrolledTooltip placement="bottom" target="headTooltipNotif">
            4 Yeni Bildiriminiz Var
          </UncontrolledTooltip>
        </a>
      </div>
      <div className="header-right-notsignedin pr-2">
        <ButtonLink
          size="sm"
          variant="secondary"
          href="#"
          title="Üye Girişi"
          data-toggle="modal"
          data-target="#modalHeadSignIn"
        >
          Üye Girişi
        </ButtonLink>
        <ButtonLink
          size="sm"
          variant="success"
          href="#"
          title="Kayıt Ol"
          data-toggle="modal"
          data-target="#modalHeadSignUp"
        >
          Kayıt Ol
        </ButtonLink>
      </div>
      <div className="header-right-signedin d-none"></div>
      <div className="header-right-lang">
        <Button
          size="sm"
          variant="secondary"
          className="active"
          onClick={() => setLanguage("tr")}
          title="TR"
        >
          TR
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setLanguage("en")}
          title="EN"
        >
          EN
        </Button>
      </div>
    </div>
  );
};

export default HeaderRight;
