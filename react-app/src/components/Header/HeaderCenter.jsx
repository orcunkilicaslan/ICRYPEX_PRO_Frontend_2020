import { useReducer, useEffect } from "react";
import { Col, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { useTranslation } from "react-i18next";

import { IconSet } from "../IconSet";
import { Button } from "../Button";

const ITEMS = [
  "Murat Alaçayır: 01 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 02 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 03 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 04 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 05 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
];

const HeaderCenter = props => {
  const { t } = useTranslation(["app", "common"]);

  const [{ item }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "NEXT":
          return {
            item: ITEMS[(state.idx + 1) % ITEMS.length],
            idx: state.idx + 1,
          };
        default:
          return state;
      }
    },
    { item: ITEMS[0], idx: 0 }
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "NEXT" });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Col className="header-center">
      <div className="newstickerbars siteformui">
        <InputGroup size="sm">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="newslefttxt">
              {t("newsanalysis")}
            </InputGroupText>
          </InputGroupAddon>
          <div className="newstickerbars-box form-control">
            <a className="newstickerbars-item" href="#">
              {item}
            </a>
          </div>
          <InputGroupAddon addonType="append">
            <Button className="input-group-text newsallbtn">
              <span>{t("common:all")}</span>
              <IconSet sprite="sprtsmclrd" size="14" name="arrowmore" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </Col>
  );
};

export default HeaderCenter;
