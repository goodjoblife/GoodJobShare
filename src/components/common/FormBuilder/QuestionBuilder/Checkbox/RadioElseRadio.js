import React from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';

import Wrapper from './private/Wrapper';
import BlockSelectElseRadio from './private/BlockSelectElseRadio';
import { OptionPropType, ValuePropType } from './PropTypes';

const RadioElseRadio = ({
  dataKey,
  required,
  value,
  onChange,
  onConfirm,
  warning,
  options,
  elseOptionValue,
  elseOptions,
  placeholder,
}) => (
  <Wrapper warning={warning}>
    <BlockSelectElseRadio
      dataKey={dataKey}
      required={required}
      value={value}
      onChange={onChange}
      onConfirm={onConfirm}
      options={options}
      elseOptionValue={elseOptionValue}
      elseOptions={elseOptions}
      placeholder={placeholder}
    />
  </Wrapper>
);

RadioElseRadio.propTypes = {
  dataKey: PropTypes.string.isRequired,
  elseOptionValue: ValuePropType.isRequired,
  elseOptions: PropTypes.arrayOf(OptionPropType).isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: ValuePropType,
  }),
  warning: PropTypes.string,
};

export default RadioElseRadio;
