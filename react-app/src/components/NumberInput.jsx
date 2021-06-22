import PropTypes from "prop-types";
import { Input } from "reactstrap";
import { Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

const NumberInput = props => {
  const { control, name, inputProps, rules, defaultValue, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={field => (
        <NumberFormat
          customInput={Input}
          value={field?.value}
          {...inputProps}
        />
      )}
      {...rest}
    />
  );
};

NumberInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default NumberInput;
