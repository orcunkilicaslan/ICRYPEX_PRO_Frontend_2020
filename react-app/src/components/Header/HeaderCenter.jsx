import { useEffect } from "react";
import { Col, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { useTranslation } from "react-i18next";
import ms from "ms";
import { useDispatch, useSelector } from "react-redux";

import { IconSet } from "../IconSet";
import { Button } from "../Button";
import NewsTicker from "../NewsTicker";
import { fetchAnnouncements } from "~/state/slices/announcement.slice";

const HeaderCenter = props => {
  const { t } = useTranslation(["app", "common"]);
  const dispatch = useDispatch();
  const { all } = useSelector(state => state.announcement);

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  return (
    <Col className="header-center">
      <div className="newstickerbars siteformui">
        <InputGroup size="sm">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="newslefttxt">
              {t("newsanalysis")}
            </InputGroupText>
          </InputGroupAddon>
          <NewsTicker items={all} interval={ms("7s")} />
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
