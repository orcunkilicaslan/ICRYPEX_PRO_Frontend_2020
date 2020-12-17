import { ReactComponent as LightSide } from "../../assets/images/header/lightside.svg";
import { ReactComponent as DarkSide } from "../../assets/images/header/darkside.svg";
import { LinkButton } from "../LinkButton.jsx";

const HeaderRight = props => {
  return (
    <div className="header-right col-auto">
      <div className="header-right-sett">
        <div className="header-right-sett-theme siteformui">
          <div className="custom-control custom-switch">
            <span className="switchthemebg">
              <LightSide className="lightsidesvg" />
              <DarkSide className="darksidesvg" />
            </span>
            <input
              id="headThemeColor"
              className="custom-control-input"
              type="checkbox"
              checked
            />
            <label htmlFor="headThemeColor" className="custom-control-label" />
          </div>
        </div>
        <div className="header-right-sett-icns">
          <a
            className="headsetticon fullscreen"
            href="#"
            title="Tam Sayfa Görünümü"
            data-toggle="fullscreenbtn"
          >
            <i className="icon-sprtsmiconclrd icon20 sm-pagefullscreen hide"></i>
          </a>
        </div>
      </div>
      <div className="header-right-notsignedin d-none">
        <div className="header-right-notsignedin-btn">
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
      </div>
      <div className="header-right-signedin">
        <div className="header-right-signedin-icns">
          <a
            className="headsignedinicon support"
            href="#"
            title="Destek"
            rel="bookmark"
          >
            <i className="icon-sprtsmiconclrd icon20 sm-support"></i>
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
              <i className="icon-sprtsmiconclrd icon20 sm-notif"></i>
              <span className="badge badge-pill badge-danger">4</span>
            </span>
          </a>
        </div>
        <div className="header-right-signedin-user"></div>
      </div>
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
