import {useContext, useRef, useState} from "react";
import { useTranslation } from "react-i18next";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { openOrderContext } from "./OpenOrder";
import { useClientRect } from "~/state/hooks";
import {QrCodeModal} from "~/components/modals";
import {useDispatch, useSelector} from "react-redux";
import {setOpenModal} from "~/state/slices/ui.slice";
import {Tooltip} from "reactstrap";


const OpenOrderAssetsAddressListTable = props => {
  const { addresses } = props;
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { dispatch: dispatchContext} = useContext(openOrderContext);
  const { t } = useTranslation(["finance","common"]);
  const {openModal} = useSelector(state => state.ui);
  const [selectedAddress, setSelectedAddress] = useState("");
  const dispatch = useDispatch();
  const [tooltipOpen, setTooltipOpen] = useState({ address:false});



  const onClick = (mode, symbol) => {
    dispatchContext({
      type: "depo_or_with",
      payload: { tabIndex: 3, method: "crypto", mode, symbol },
    });
  };


  const clearOpenModals = () => {
    dispatch(setOpenModal("none"));
  };

  const openQrCodeModal = (_id) => {
    console.log(_id)

    dispatch(setOpenModal("qrcode"));
  };

  const  copyToClipboard = _id => async () => {

    const address = addresses.find(
        ({id}) => id === _id
    )?.address;
        return navigator.clipboard.writeText(address).then(r => {
          setTooltipOpen({...tooltipOpen,address: true})
          setTimeout(async () => await  setTooltipOpen({...tooltipOpen,address: false}), 2000)
        });
  };

  return (
    <div className="assetsaddress-tablebox">
      <div className="asaddresstable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="ico" />
              <Table.Th sizeauto className="btn" />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
            striped
            hovered
            scrollbar
            scrollbarstyles={{ height: `${tableHeight - 36}px` }}
          >
            {addresses?.map(({ id, address, symbol }) => {
              return (
                <Table.Tr key={id}>
                  <Table.Td sizeauto className="ico">
                    <Button type="button">
                      <IconSet sprite="sprtsmclrd" size="16" name="qrcode" onClick={() => {
                        openQrCodeModal(id)
                      }}/>
                    </Button>
                    <Button type="button" onClick={copyToClipboard(id)}  id="address">
                      <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
                    </Button>
                    <Tooltip placement="right" isOpen={tooltipOpen.address} target="address">
                      {t("common:copied")}
                    </Tooltip>
                  </Table.Td>
                  <Table.Td sizefixed className="add">
                    {address}
                  </Table.Td>
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
    </div>
  );
};

export default OpenOrderAssetsAddressListTable;
