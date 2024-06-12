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
  defaultValue: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: ValuePropType,
  }),
  description: PropTypes.string,
  elseOptionValue: ValuePropType.isRequired,
  elseOptions: PropTypes.arrayOf(OptionPropType).isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  page: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: ValuePropType,
  }),
  warning: PropTypes.string,
};

export default RadioElseRadio;
