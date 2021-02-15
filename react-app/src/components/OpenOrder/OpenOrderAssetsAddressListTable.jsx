import { useContext } from "react";
import { useClientRect } from "~/state/hooks";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { openOrderContext } from "./OpenOrder";

const assetadresslist = [
  {
    id: "01",
    addresshash: "0x4A356640831fF69F10fCd55Be27588c51d34384c",
    createdate: "03/06/2020",
    createtime: "12:51",
    balance: "0.02003240 BTC",
  },
];

const OpenOrderAssetsAddressListTable = props => {

  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();

  const { dispatch } = useContext(openOrderContext);
  const onClick = mode => {
    dispatch({
      type: "depo_or_with",
      payload: { tabIndex: 3, method: "crypto", mode },
    });
  };

  return (
    <div className="assetsaddress-tablebox">
      <div className="asaddresstable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="ico" />
              <Table.Th sizefixed className="add">
                Adres
              </Table.Th>
              <Table.Th sizeauto className="ass">
                Varlık
              </Table.Th>
              <Table.Th sizeauto className="crt">
                Oluşturulma
              </Table.Th>
              <Table.Th sizeauto className="btn" />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
              striped
              hovered
              scrollbar
              scrollbarstyles={{ height: `${tableHeight - 36}px` }}
          >
            {assetadresslist.map(
              ({ id, addresshash, createdate, createtime, balance }) => {
                return (
                  <Table.Tr key={id}>
                    <Table.Td sizeauto className="ico">
                      <Button type="button">
                        <IconSet sprite="sprtsmclrd" size="16" name="qrcode" />
                      </Button>
                      <Button type="button">
                        <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
                      </Button>
                    </Table.Td>
                    <Table.Td sizefixed className="add">
                      {addresshash}
                    </Table.Td>
                    <Table.Td sizeauto className="ass">
                      {balance}
                    </Table.Td>
                    <Table.Td sizeauto className="crt">
                      {createdate} - {createtime}
                    </Table.Td>
                    <Table.Td sizeauto className="btn">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline-success"
                        onClick={() => onClick("deposit")}
                      >
                        Yatır
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline-danger"
                        onClick={() => onClick("withdraw")}
                      >
                        Çek
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                );
              }
            )}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default OpenOrderAssetsAddressListTable;
