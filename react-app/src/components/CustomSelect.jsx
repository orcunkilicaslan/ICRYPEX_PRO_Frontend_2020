import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";

const CustomSelect = props => {
  const {
    children,
    className,
    list,
    title,
    index,
    setIndex,
    buttonProps,
    namespace = "common",
    ...rest
  } = props;
  const { t } = useTranslation(namespace);

  return (
    <Input
      className="custom-select custom-select-sm"
      type="select"
      onChange={evt => setIndex(parseInt(evt?.target?.value, 10))}
      value={index}
      {...rest}
    >
      {title && <option value={-1}>{title}</option>}
      {list?.map?.(({ id, name }) => {
        return (
          <option value={id} key={name}>
            {t(name?.toLowerCase?.())}
          </option>
        );
      })}
    </Input>
  );
};

export default CustomSelect;
