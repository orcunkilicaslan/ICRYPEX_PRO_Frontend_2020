import { useReducer, useEffect } from "react";
import { Col, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

import { IconSet } from "../IconSet";

const ITEMS = [
  "Murat Alaçayır: 01 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 02 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 03 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 04 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  "Murat Alaçayır: 05 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
];

const HeaderCenter = props => {
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
              Haber & Analiz
            </InputGroupText>
          </InputGroupAddon>
          <div className="newstickerbars-box form-control">
            <a
              className="newstickerbars-item"
              href="#"
              title=""
              data-toggle="modal"
              data-target="#modalHeadNewsAll"
            >
              {item}
            </a>
          </div>
          <InputGroupAddon addonType="append">
            {/* <InputGroupText> */}
            <a
              className="input-group-text newsallbtn"
              href="#"
              title="Tümü"
              data-toggle="modal"
              data-target="#modalHeadNewsAll"
            >
              <span>Tümü</span>
              <IconSet sprite="sprtsmclrd" size="14" name="arrowmore" />
            </a>
            {/* </InputGroupText> */}
          </InputGroupAddon>
        </InputGroup>
      </div>
    </Col>
  );
};

export default HeaderCenter;
