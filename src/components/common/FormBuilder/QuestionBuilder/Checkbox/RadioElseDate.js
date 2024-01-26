import React from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';

import Wrapper from './private/Wrapper';
import BlockSelectElseDate from './private/BlockSelectElseDate';
import { OptionPropType, ValuePropType } from './PropTypes';
import { DatePropType } from '../Date';

const RadioElseDate = ({
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
}) => (
  <Wrapper warning={warning}>
    <BlockSelectElseDate
      page={page}
      title={title}
      dataKey={dataKey}
      required={required}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      onConfirm={onConfirm}
      options={options}
      elseOptionValue={elseOptionValue}
    />
  </Wrapper>
);

RadioElseDate.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: DatePropType,
  }),
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: DatePropType,
  }),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionValue: ValuePropType.isRequired,
};

export default RadioElseDate;
