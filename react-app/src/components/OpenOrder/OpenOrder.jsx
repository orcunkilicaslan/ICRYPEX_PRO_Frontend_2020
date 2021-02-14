import { useState, useCallback, createContext, useReducer } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { inRange } from "lodash";

import OpenOrderOrders from "./OpenOrderOrders.jsx";
import OpenOrderTransactionHistory from "./OpenOrderTransactionHistory.jsx";
import OpenOrderAssets from "./OpenOrderAssets.jsx";
import OpenOrderDepoWith from "./OpenOrderDepoWith.jsx";
import OpenOrderAccountActivities from "./OpenOrderAccountActivities.jsx";
import { setOpenModal } from "~/state/slices/ui.slice";
import UserNotLoginBox from "~/pages/Sections/UserNotLoginBox.jsx";

export const openOrderContext = createContext();
export const TRANSACTION_MODES = ["deposit", "withdraw"];
export const TRANSACTION_METHODS = ["bank", "papara", "crypto"];

const tabs = [
  {
    title: "Açık Emirler",
    component: OpenOrderOrders,
  },
  {
    title: "İşlem Geçmişi",
    component: OpenOrderTransactionHistory,
  },
  {
    title: "Varlıklar",
    component: OpenOrderAssets,
  },
  {
    title: "Yatır-Çek",
    component: OpenOrderDepoWith,
  },
  {
    title: "Hesap Hareketleri",
    component: OpenOrderAccountActivities,
  },
];

const OpenOrder = props => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(tabs[0].title);
  const { accesstoken } = useSelector(state => state.api);

  const initialState = {
    mode: TRANSACTION_MODES[0],
    method: TRANSACTION_METHODS[0],
  };
  const [state, _dispatch] = useReducer((state, action) => {
    const { type, payload } = action;

    switch (type) {
      case "depo_or_with": {
        const { tabIndex, mode, method } = payload;

        if (inRange(tabIndex, 0, tabs.length)) {
          setActiveTab(tabs[tabIndex].title);
        }

        const override = {};
        if (TRANSACTION_MODES.includes(mode)) {
          override.mode = mode;
        }
        if (TRANSACTION_METHODS.includes(method)) {
          override.method = method;
        }

        return { ...state, ...override };
      }
      case "reset":
        return initialState;
      default:
        return state;
    }
  }, initialState);

  const openSigninModal = useCallback(() => {
    dispatch(setOpenModal("signin"));
  }, [dispatch]);

  const openSignupModal = useCallback(() => {
    dispatch(setOpenModal("signup"));
  }, [dispatch]);

  const toggle = tab => {
    _dispatch({ type: "reset" });
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <openOrderContext.Provider value={{ state, dispatch: _dispatch }}>
      <div className="mainbox mainbox-openorders">
        <div className="openorders openorders-tabs tabareaflexflow">
          <Nav tabs justified className="sitetabs">
            {tabs.map(tab => {
              const { title } = tab;
              const cls = classnames({ active: activeTab === title });

              return (
                <NavItem key={title}>
                  <NavLink className={cls} onClick={() => toggle(title)}>
                    {title}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <TabContent className="sitetabs" activeTab={activeTab}>
            {tabs.map(({ title, component: Comp }) => {
              return (
                <TabPane key={title} tabId={title}>
                  {accesstoken ? (
                    <Comp />
                  ) : (
                    <UserNotLoginBox
                      openSigninModal={openSigninModal}
                      openSignupModal={openSignupModal}
                    />
                  )}
                </TabPane>
              );
            })}
          </TabContent>
        </div>
      </div>
    </openOrderContext.Provider>
  );
};

export default OpenOrder;
