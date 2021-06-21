import { useTranslation } from "react-i18next";

const FooterRight = props => {
  const { t } = useTranslation(["app"]);

  return <div className="col-auto">{t("companyAddress")}</div>;
};

export default FooterRight;
