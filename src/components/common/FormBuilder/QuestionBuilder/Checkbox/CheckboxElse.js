import React from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';

import Wrapper from './private/Wrapper';
import BlockSelectElse from './private/BlockSelectElse';
import { OptionPropType, ValuePropType } from './PropTypes';

const CheckboxElse = ({
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
  options,
  elseOptionValue,
  placeholder,
}) => (
  <Wrapper warning={warning}>
    <BlockSelectElse
      dataKey={dataKey}
      value={value}
      onChange={onChange}
      onConfirm={onConfirm}
      options={options}
      elseOptionValue={elseOptionValue}
      multiple
      placeholder={placeholder}
    />
  </Wrapper>
);

CheckboxElse.propTypes = {
  dataKey: PropTypes.string.isRequired,
  defaultValue: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.arrayOf(ValuePropType.isRequired).isRequired,
    // else
    1: PropTypes.string.isRequired,
  }),
  description: PropTypes.string,
  elseOptionValue: ValuePropType.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  page: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.arrayOf(ValuePropType.isRequired).isRequired,
    // else
    1: PropTypes.string.isRequired,
  }),
  warning: PropTypes.string,
};

export default CheckboxElse;
