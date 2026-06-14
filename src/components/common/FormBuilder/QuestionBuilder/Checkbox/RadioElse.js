import { withShape } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import BlockSelectElse from './private/BlockSelectElse';
import Wrapper from './private/Wrapper';
import { OptionPropType, ValuePropType } from './PropTypes';

const RadioElse = ({
  dataKey,
  required,
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
  dataKey: PropTypes.string.isRequired,
  elseOptionValue: ValuePropType.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: PropTypes.string.isRequired,
  }),
  warning: PropTypes.string,
};

export default RadioElse;
