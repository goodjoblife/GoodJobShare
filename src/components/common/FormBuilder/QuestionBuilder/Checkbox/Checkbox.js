import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './private/Wrapper';
import BlockSelect from './private/BlockSelect';
import { OptionPropType, ValuePropType } from './PropTypes';

const Checkbox = ({
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value,
  onChange,
  warning,
  validator,
  options,
}) => (
  <Wrapper warning={warning}>
    <BlockSelect
      dataKey={dataKey}
      value={value}
      onChange={onChange}
      options={options}
      multiple
    />
  </Wrapper>
);

Checkbox.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.arrayOf(ValuePropType).isRequired,
  value: PropTypes.arrayOf(ValuePropType).isRequired,
  onChange: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
};

export default Checkbox;
