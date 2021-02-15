import { useClientRect } from "~/state/hooks";
import classnames from "classnames";

import { Button } from "../Button.jsx";
import { IconSet } from "../IconSet.jsx";
import Table from "../Table.jsx";

const pendingtable = [
  {
    transactionno: "MR-99999",
    transactiondate: "21.02.2020",
    transactiontime: "18:23",
    transactiontypeid: "2",
    transactiontypetxt: "Çekme",
    transactionmethod: "Havale-EFT",
    transactionbank: "Vakıfbank",
    transactionamount: "23,456,865.56 TRY",
    transactionstatusid: "1",
    transactionstatustxt: "Beklemede",
  },
];

const OpenOrderAccountActivitiesPending = props => {

  const [{ height: tableHeight }, tableCanvasRef] = useClientRect();

  return (
    <div className="activities-pending">
      <div className="activitiespendingtable scrollbar" ref={tableCanvasRef}>
        <Table scrollbar>
          <Table.Thead scrollbar>
            <Table.Tr>
              <Table.Th sizeauto className="nmbr">
                İşlem No
              </Table.Th>
              <Table.Th sizeauto className="date">
                Tarih
              </Table.Th>
              <Table.Th sizeauto className="type">
                İşlem Tipi
              </Table.Th>
              <Table.Th sizeauto className="mthd">
                Yöntem
              </Table.Th>
              <Table.Th sizeauto className="bank">
                Banka
              </Table.Th>
              <Table.Th sizefixed className="amnt">
                Miktar
              </Table.Th>
              <Table.Th sizeauto className="stts">
                Durum
              </Table.Th>
              <Table.Th sizeauto className="bttn" />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
              striped
              hovered
              scrollbar
              scrollbarstyles={{ height: `${tableHeight - 36}px` }}
          >
            {pendingtable.map(
              ({
                transactionno,
                transactiondate,
                transactiontime,
                transactiontypeid,
                transactiontypetxt,
                transactionmethod,
                transactionbank,
                transactionamount,
                transactionstatusid,
                transactionstatustxt,
              }) => {
                const typecls = classnames({
                  sitecolorgreen: transactiontypeid === "1",
                  sitecolorred: transactiontypeid === "2",
                });

                const statuscls = classnames({
                  sitecoloryellow: transactionstatusid === "1",
                  sitecolorgreen: transactionstatusid === "2",
                  sitecolorred: transactionstatusid === "3",
                });

                return (
                  <Table.Tr key={transactionno}>
                    <Table.Td sizeauto className="nmbr">
                      {transactionno}
                    </Table.Td>
                    <Table.Td sizeauto className="date">
                      {transactiondate} - {transactiontime}
                    </Table.Td>
                    <Table.Td sizeauto className="type">
                      <span className={typecls}>{transactiontypetxt}</span>
                    </Table.Td>
                    <Table.Td sizeauto className="mthd">
                      {transactionmethod}
                    </Table.Td>
                    <Table.Td sizeauto className="bank">
                      {transactionbank}
                    </Table.Td>
                    <Table.Td sizefixed className="amnt">
                      {transactionamount}
                    </Table.Td>
                    <Table.Td sizeauto className="stts">
                      <span className={statuscls}>{transactionstatustxt}</span>
                    </Table.Td>
                    <Table.Td sizeauto className="bttn">
                      <Button type="button">
                        <IconSet sprite="sprtsmclrd" size="14" name="delete" />
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

export default OpenOrderAccountActivitiesPending;
