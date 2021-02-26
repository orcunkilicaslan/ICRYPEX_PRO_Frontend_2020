import { useDispatch, useSelector} from "react-redux";
import { UncontrolledTooltip, Badge, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useState } from "react";
import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import AccordionCollapse from "~/components/AccordionCollapse.jsx";
import { setOpenModal } from "~/state/slices/ui.slice";


const HeaderRightIcons = props => {

    const dispatch = useDispatch();

    const { accesstoken } = useSelector(state => state.api);
    const { openModal } = useSelector(state => state.ui);

    const openNotificationsModal = () => {
        dispatch(setOpenModal("notifications"));
    };

    const clearOpenModals = () => {
        dispatch(setOpenModal("none"));
    };

    const [collapse, setCollapse] = useState(false);

    const collapseToggle = () => setCollapse(!collapse);


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
                <Button
                    className="headsignedinicon notif"
                    onClick={openNotificationsModal}
                >
                  <span id="headTooltipNotif">
                    <IconSet sprite="sprtsmclrd" size="20" name="notif">
                      <Badge color="danger" pill>4</Badge>
                    </IconSet>
                  </span>
                    <UncontrolledTooltip placement="bottom" target="headTooltipNotif">
                        4 Yeni Bildiriminiz Var
                    </UncontrolledTooltip>
                </Button>
            ) : null}

            <Modal
                wrapClassName=""
                modalClassName="modal-rightside"
                size="sm"
                isOpen={openModal === "notifications"}
                toggle={clearOpenModals}
                keyboard={false}
                fade={false}
                autoFocus={false}
                backdrop="static"
            >
                <ModalHeader toggle={clearOpenModals}>BİLDİRİMLER</ModalHeader>
                <ModalBody className="modalcomp modalcomp-notif">
                    <div className="headsmtitle">
                        <div className="headsmtitle-col">
                            <h6>30 Okunmamış Mesaj</h6>
                        </div>
                    </div>
                    <div className="modalcomp-notif-wrp modalcomp-psright">
                        <AccordionCollapse scrollbar className="modalcomp-notif-list">
                            <AccordionCollapse.Item className="notifnotread">
                                <AccordionCollapse.Head
                                    onClick={collapseToggle}
                                    aria-expanded={collapse ? 'true' : 'false'}
                                >
                                    Gentle Reminder ：BTC Halving
                                </AccordionCollapse.Head>
                                <AccordionCollapse.Body
                                    isOpen={collapse}
                                >
                                    <p>3NzYxpmhDGc6dhaXwZB4t2KUhUECy2 no’lu BTC adresine 0.19500000 BTC tutarında onaylanmamış giriş olmuştur.</p>
                                    <div className="collapsefoot">
                                        <span className="collapsefoot-date">21.02.2020 15:32</span>
                                        <button className="collapsefoot-btn btn btn-sm">Okundu Olarak İşaretle</button>
                                    </div>
                                </AccordionCollapse.Body>
                            </AccordionCollapse.Item>
                        </AccordionCollapse>
                    </div>
                    <div className="footbtns">
                        <Button
                            variant="danger"
                            className="w-100"
                        >
                            TÜMÜNÜ OKUNDU OLARAK İŞARETLE
                        </Button>
                    </div>
                </ModalBody>
            </Modal>

        </div>
    );
};

export default HeaderRightIcons;
