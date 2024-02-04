import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './private/Wrapper';
import BlockSelect from './private/BlockSelect';
import { OptionPropType, ValuePropType } from './PropTypes';

const Radio = ({
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
}) => (
  <Wrapper warning={warning}>
    <BlockSelect
      dataKey={dataKey}
      required={required}
      value={value}
      onChange={onChange}
      onConfirm={onConfirm}
      options={options}
    />
  </Wrapper>
);

Radio.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: ValuePropType,
  value: ValuePropType,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
};

export default Radio;
