import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";
import { Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

const NumberInput = forwardRef((props, ref) => {
  const { control, name, inputProps, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={(field, { isDirty, isTouched }) => (
        <NumberFormat
          customInput={Input}
          value={field?.value}
          innerRef={ref}
          {...inputProps}
        />
      )}
      {...rest}
    />
  );
});

NumberInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default NumberInput;
