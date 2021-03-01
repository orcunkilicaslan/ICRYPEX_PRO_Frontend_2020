import { Col, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { useTranslation } from "react-i18next";
import ms from "ms";

import { IconSet } from "../IconSet";
import { Button } from "../Button";
import NewsTicker from "../NewsTicker";

const ITEMS = [
  {
    href: "#",
    title: "Murat Alaçayır: 01 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  },
  {
    href: "#",
    title: "Murat Alaçayır: 02 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  },
  {
    href: "#",
    title: "Murat Alaçayır: 03 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  },
  {
    href: "#",
    title: "Murat Alaçayır: 04 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  },
  {
    href: "#",
    title: "Murat Alaçayır: 05 - Eylül Veya Ekimde Piyasalar Normale Dönebilir",
  },
];

const HeaderCenter = props => {
  const { t } = useTranslation(["app", "common"]);

  return (
    <Col className="header-center">
      <div className="newstickerbars siteformui">
        <InputGroup size="sm">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="newslefttxt">
              {t("newsanalysis")}
            </InputGroupText>
          </InputGroupAddon>
          <NewsTicker items={ITEMS} interval={ms("7s")} />
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
