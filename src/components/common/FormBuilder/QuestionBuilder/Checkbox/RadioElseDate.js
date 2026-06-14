import { withShape } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import BlockSelectElseDate from './private/BlockSelectElseDate';
import Wrapper from './private/Wrapper';
import { OptionPropType, ValuePropType } from './PropTypes';
import { DatePropType } from '../Date';

const RadioElseDate = ({
  page,
  title,
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
  dataKey: PropTypes.string.isRequired,
  defaultValue: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: DatePropType,
  }),
  elseOptionValue: ValuePropType.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  page: PropTypes.number.isRequired,
  required: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: ValuePropType,
    // else
    1: DatePropType,
  }),
  warning: PropTypes.string,
};

export default RadioElseDate;
