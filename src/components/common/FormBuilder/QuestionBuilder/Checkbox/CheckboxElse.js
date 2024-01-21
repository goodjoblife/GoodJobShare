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
  validator,
  options,
  placeholder,
}) => (
  <Wrapper warning={warning}>
    <BlockSelectElse
      dataKey={dataKey}
      value={value}
      onChange={onChange}
      onConfirm={onConfirm}
      options={options}
      multiple
      placeholder={placeholder}
    />
  </Wrapper>
);

CheckboxElse.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.arrayOf(ValuePropType.isRequired).isRequired,
    // else
    1: PropTypes.string.isRequired,
  }),
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.arrayOf(ValuePropType.isRequired).isRequired,
    // else
    1: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  placeholder: PropTypes.string,
};

export default CheckboxElse;
