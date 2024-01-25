import React from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';

import Wrapper from './private/Wrapper';
import BlockSelectElseRadio from './private/BlockSelectElseRadio';
import { OptionPropType, ValuePropType } from './PropTypes';

const RadioElseRadio = ({
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
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: ValuePropType,
  }),
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: ValuePropType,
  }),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionValue: ValuePropType.isRequired,
  elseOptions: PropTypes.arrayOf(OptionPropType).isRequired,
  placeholder: PropTypes.string,
};

export default RadioElseRadio;
