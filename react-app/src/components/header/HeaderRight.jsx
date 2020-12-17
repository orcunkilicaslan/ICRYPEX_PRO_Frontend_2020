import { ReactComponent as LightSide } from "../../assets/images/header/lightside.svg";
import { ReactComponent as DarkSide } from "../../assets/images/header/darkside.svg";

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
    </div>
  );
};

export default HeaderRight;
