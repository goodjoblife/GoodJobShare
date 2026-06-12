import { withShape } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import BlockSelectElse from './private/BlockSelectElse';
import Wrapper from './private/Wrapper';
import { OptionPropType, ValuePropType } from './PropTypes';

const CheckboxElse = ({
  dataKey,
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
  elseOptionValue: ValuePropType.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  placeholder: PropTypes.string,
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.arrayOf(ValuePropType.isRequired).isRequired,
    // else
    1: PropTypes.string.isRequired,
  }),
  warning: PropTypes.string,
};

export default CheckboxElse;
