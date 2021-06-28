import { useContext, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "reactstrap";
import ms from "ms";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { openOrderContext } from "./OpenOrder";
import { useClientRect, useLocaleUpperCase } from "~/state/hooks";
import { QrCodeModal } from "~/components/modals";
import { setOpenModal } from "~/state/slices/ui.slice";

const OpenOrderAssetsAddressListTable = props => {
  const { addresses } = props;
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { dispatch: dispatchContext } = useContext(openOrderContext);
  const { t } = useTranslation(["finance", "common"]);
  const { openModal } = useSelector(state => state.ui);
  const [selectedAddress, setSelectedAddress] = useState("");
  const dispatch = useDispatch();
  const [tooltipOpen, setTooltipOpen] = useState({
    address: false,
    tag: false,
  });
  const toUpperCase = useLocaleUpperCase();

  const onClick = (mode, symbol) => {
    dispatchContext({
      type: "depo_or_with",
      payload: { tabIndex: 3, method: "crypto", mode, symbol },
    });
  };

  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  const openQrCodeModal = text => {
    setSelectedAddress(String(text));
    dispatch(setOpenModal("qrcode"));
  };

  const copyToClipboard = (text, type) => async () => {
    return navigator.clipboard.writeText(text).then(r => {
      if (type === "addr") {
        setTooltipOpen({ ...tooltipOpen, address: true });
        setTimeout(
          async () => await setTooltipOpen({ ...tooltipOpen, address: false }),
          ms("2s")
        );
      } else if (type === "tag") {
        setTooltipOpen({ ...tooltipOpen, tag: true });
        setTimeout(
          async () => await setTooltipOpen({ ...tooltipOpen, tag: false }),
          ms("2s")
        );
      }
    });
  };

  return (
    <div className="assetsaddress-tablebox">
      {addresses?.[0]?.address ? (
        <Fragment>
          <div className="asaddresstable scrollbar" ref={tableCanvasRef}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th sizeauto className="ico ico01" />
                  <Table.Th sizefixed className="add">
                    {t("address")}
                  </Table.Th>
                  {addresses?.[0]?.destination_tag && (
                    <Fragment>
                      <Table.Th sizeauto className="ico ico02" />
                      <Table.Th sizeauto className="tag">
                        Tag
                      </Table.Th>
                    </Fragment>
                  )}
                  <Table.Th sizeauto className="btn" />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody striped hovered>
                {addresses?.map(item => {
                  const { id, address, symbol, destination_tag } = item;

                  return (
                    <Table.Tr key={id}>
                      <Table.Td sizeauto className="ico ico01">
                        <Button type="button">
                          <IconSet
                            sprite="sprtsmclrd"
                            size="16"
                            name="qrcode"
                            onClick={() => openQrCodeModal(address)}
                          />
                        </Button>
                        <Button
                          type="button"
                          onClick={copyToClipboard(address, "addr")}
                          id="address"
                        >
                          <IconSet
                            sprite="sprtsmclrd"
                            size="16"
                            name="copybtn"
                          />
                        </Button>
                        <Tooltip
                          placement="right"
                          isOpen={tooltipOpen.address}
                          target="address"
                        >
                          {t("common:copied")}
                        </Tooltip>
                      </Table.Td>
                      <Table.Td sizefixed className="add">
                        {address}
                      </Table.Td>
                      {destination_tag && (
                        <Fragment>
                          <Table.Td sizeauto className="ico ico02">
                            <Button type="button">
                              <IconSet
                                sprite="sprtsmclrd"
                                size="16"
                                name="qrcode"
                                onClick={() => openQrCodeModal(destination_tag)}
                              />
                            </Button>
                            <Button
                              type="button"
                              onClick={copyToClipboard(destination_tag, "tag")}
                              id="destination_tag"
                            >
                              <IconSet
                                sprite="sprtsmclrd"
                                size="16"
                                name="copybtn"
                              />
                            </Button>
                            <Tooltip
                              placement="right"
                              isOpen={tooltipOpen.tag}
                              target="destination_tag"
                            >
                              {t("common:copied")}
                            </Tooltip>
                          </Table.Td>
                          <Table.Td sizeauto className="tag">
                            {destination_tag}
                          </Table.Td>
                        </Fragment>
                      )}
                      <Table.Td sizeauto className="btn">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline-success"
                          onClick={() => onClick("deposit", symbol)}
                        >
                          {t("deposit")}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline-danger"
                          onClick={() => onClick("withdraw", symbol)}
                        >
                          {t("withdraw")}
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </div>
          <QrCodeModal
            isOpen={openModal === "qrcode"}
            value={selectedAddress || ""}
            clearModals={clearOpenModals}
          />
        </Fragment>
      ) : (
          <div className="resultbox">
            <div className="modal-content text-center">
              <div className="modal-body modal-confirm">
                <h6>Yeni XXX Adresi Yarat</h6>
                <p>İşlemi onaylıyor iseniz aşağıdaki butondan yeni XXX adresi yaratabilirsiniz.</p>
              </div>
              <div className="modal-footer">
                <Button variant="primary">{toUpperCase(t("createNewAddress"))}</Button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default OpenOrderAssetsAddressListTable;
