import React from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';

import Wrapper from './private/Wrapper';
import BlockSelectElse from './private/BlockSelectElse';
import { OptionPropType, ValuePropType } from './PropTypes';

const RadioElse = ({
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value,
  onChange,
  onConfirm,
  warning,
  validator,
  options,
  elseOptionValue,
  placeholder,
}) => (
  <Wrapper warning={warning}>
    <BlockSelectElse
      dataKey={dataKey}
      required={required}
      value={value}
      onChange={onChange}
      onConfirm={onConfirm}
      options={options}
      elseOptionValue={elseOptionValue}
      placeholder={placeholder}
    />
  </Wrapper>
);

RadioElse.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: PropTypes.string.isRequired,
  }),
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionValue: ValuePropType.isRequired,
  placeholder: PropTypes.string,
};

export default RadioElse;
