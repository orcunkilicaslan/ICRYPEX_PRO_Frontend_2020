import { useState, useEffect, useMemo } from "react";
import { ButtonGroup } from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../Button.jsx";
import OpenOrderAssetsAddressListTable from "./OpenOrderAssetsAddressListTable.jsx";
import { fetchCryptoAddresses } from "~/state/slices/assets.slice";

const OpenOrderAssetsAddressList = props => {
  const dispatch = useDispatch();
  const { groupedCryptoAddresses: groupedAddresses = {} } = useSelector(
    state => state.assets
  );
  const keys = Object.keys(groupedAddresses);
  const [activeTab, setActiveTab] = useState(keys[0]);

  useEffect(() => {
    dispatch(fetchCryptoAddresses());
  }, [dispatch]);

  const toggle = symbol => {
    if (activeTab !== symbol) setActiveTab(symbol);
  };

  return (
    <div className="assets-addrslist">
      <div className="assetsaddress assetsaddress-tabs tabareaflexflow">
        <ButtonGroup size="sm" className="sitetabs nav">
          {keys.map(symbol => {
            const cls = classnames({ active: activeTab === symbol });

            return (
              <Button
                size="sm"
                variant="secondary"
                className={cls}
                onClick={() => toggle(symbol)}
                key={symbol}
              >
                {symbol}
              </Button>
            );
          })}
        </ButtonGroup>
        <OpenOrderAssetsAddressListTable
          addresses={groupedAddresses[activeTab]}
        />
      </div>
    </div>
  );
};

export default OpenOrderAssetsAddressList;
