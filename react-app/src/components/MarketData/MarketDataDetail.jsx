import classnames from "classnames";

import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";
import Table from "../Table.jsx";

const mddetailtable = [
  {
    label: "Bid",
    change: "-2.22%",
    mdper: "up",
  },
  {
    label: "Bid High",
    change: "+1.38%",
    mdper: "down",
  },
  {
    label: "Bid Low",
    change: "+2.24%",
    mdper: "down",
  },
  {
    label: "Ask",
    change: "+3.57%",
    mdper: "up",
  },
  {
    label: "Ask High",
    change: "-1.56%",
    mdper: "down",
  },
  {
    label: "Ask Low",
    change: "-1.56%",
    mdper: "down",
  },
];

const MarketDataDetail = props => {
  return (
    <div className="marketdata-detail">
      <div className="tabcont tabcont-head">
        <p>BTC/TRY - Bitcoin / Türk Lirası</p>
      </div>

      <div className="mddetailtable">
        <Table>
          <Table.Tbody striped>
            {mddetailtable.map(({ label, change, mdper }) => {
              const cls = classnames({
                sitecolorgreen: mdper === "up",
                sitecolorred: mdper !== "up",
              });

              return (
                <Table.Tr key={label}>
                  <Table.Td sizefixed className="txt">
                    {label}
                  </Table.Td>
                  <Table.Td sizefixed className="chg">
                    <span className={cls}>{change}</span>
                  </Table.Td>
                  <Table.Td sizeauto className="per">
                    <PerLineIcon className={`mdper mdper-${mdper}`} />
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

export default MarketDataDetail;
