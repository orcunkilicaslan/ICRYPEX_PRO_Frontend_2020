import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { useTranslation } from "react-i18next";

import { ReactComponent as PerLineIcon } from "~/assets/images/icons/path_icon_pericon.svg";
import { IconSet } from "../IconSet.jsx";

const priceListJSON = {
  coinid: 1,
  data: {
    lastPrice: "43,199",
    bestBuy: "21,149",
    bestSell: "12,345",
    change24h: "10,539",
    high24h: "24,247",
    low24h: "7,357",
    average24h: "32,643",
    volume: "32,643",
    excavating: "1,474,00",
  },
};

const CompCryptocoinbar = props => {
  const { t } = useTranslation("coinbar");

  return (
    <div className="mainbox mainbox-cryptocoinbar">
      <div className="cryptocoinbar siteformui">
        <InputGroup size="lg">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="selectedcur">BTC/TRY</InputGroupText>
          </InputGroupAddon>
          <div className="cryptostatsbar">
            <div className="cryptostatsbar-biger">
              <PerLineIcon className="mdper mdper-up" />
              <span className="sitecolorgreen">9198.00</span>
            </div>
            <div className="cryptostatsbar-stats">
              <ul className="bigstatslist">
                {Object.entries(priceListJSON.data).map(([key, value]) => {
                  return (
                    <li key={key}>
                      <h6>{t(key)}</h6>
                      <p>{value} TRY</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <InputGroupAddon addonType="append">
            <InputGroupText className="alarmbtn">
              <a
                className="iconbtn iconbtn-warning btn-sm"
                href="#"
                title="Alarm Kur"
                data-toggle="modal"
                data-target="#modalSetAlarm"
              >
                <div className="iconbtn-svg">
                  <IconSet sprite="sprtsmclrd" size="16" name="bell"></IconSet>
                </div>
                <div className="iconbtn-txt">
                  <span>Alarm Kur</span>
                </div>
              </a>
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
};

export default CompCryptocoinbar;
