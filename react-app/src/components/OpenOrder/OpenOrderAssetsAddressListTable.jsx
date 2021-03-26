import { useContext } from "react";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";
import { openOrderContext } from "./OpenOrder";
import { useClientRect } from "~/state/hooks";

const OpenOrderAssetsAddressListTable = props => {
  const { addresses } = props;
  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();
  const { dispatch } = useContext(openOrderContext);

  const onClick = (mode, symbol) => {
    dispatch({
      type: "depo_or_with",
      payload: { tabIndex: 3, method: "crypto", mode, symbol },
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
                      <IconSet sprite="sprtsmclrd" size="16" name="qrcode" />
                    </Button>
                    <Button type="button">
                      <IconSet sprite="sprtsmclrd" size="16" name="copybtn" />
                    </Button>
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
                      Yatır
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline-danger"
                      onClick={() => onClick("withdraw", symbol)}
                    >
                      Çek
                    </Button>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default OpenOrderAssetsAddressListTable;
