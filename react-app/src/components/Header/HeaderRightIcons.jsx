import { useSelector } from "react-redux";
import { UncontrolledTooltip } from "reactstrap";
import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";

const HeaderRightIcons = props => {

    const { accesstoken } = useSelector(state => state.api);

    return (
        <div className="header-right-icons">
            <Button
                className="headsignedinicon fullscreen"
                data-toggle="fullscreenbtn"
            >
                <IconSet sprite="sprtsmclrd" size="20" name="pagefullscreen" />
            </Button>
            {accesstoken ? (
                <Button className="headsignedinicon support">
                    <IconSet sprite="sprtsmclrd" size="20" name="support" />
                </Button>
            ) : null}
            {accesstoken ? (
                <Button className="headsignedinicon notif">
                    <span id="headTooltipNotif">
                        <IconSet sprite="sprtsmclrd" size="20" name="notif">
                            <span className="badge badge-pill badge-danger">4</span>
                        </IconSet>
                    </span>
                    <UncontrolledTooltip placement="bottom" target="headTooltipNotif">
                        4 Yeni Bildiriminiz Var
                    </UncontrolledTooltip>
                </Button>
            ) : null}
        </div>
    );
};

export default HeaderRightIcons;