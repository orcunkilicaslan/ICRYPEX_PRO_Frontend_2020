import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";

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
  return (
    <div className="assetsaddress-tablebox">
      <div className="asaddresstable scrollbar">
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="ico"></Table.Th>
              <Table.Th sizefixed className="add">
                Adres
              </Table.Th>
              <Table.Th sizeauto className="ass">
                Varlık
              </Table.Th>
              <Table.Th sizeauto className="crt">
                Oluşturulma
              </Table.Th>
              <Table.Th sizeauto className="btn"></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody striped hovered scrollbar>
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
                      <Button type="button" size="sm" variant="outline-success">
                        Yatır
                      </Button>
                      <Button type="button" size="sm" variant="outline-danger">
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
