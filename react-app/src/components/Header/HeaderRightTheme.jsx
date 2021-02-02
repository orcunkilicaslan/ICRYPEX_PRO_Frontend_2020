import { ReactComponent as SideLight } from "~/assets/images/header/header_theme_sidelight.svg";
import { ReactComponent as SideDark } from "~/assets/images/header/header_theme_sidedark.svg";

const HeaderRightTheme = props => {
  return (
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
  );
};

export default HeaderRightTheme;
