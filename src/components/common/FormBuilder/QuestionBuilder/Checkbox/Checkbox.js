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
  dataKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.arrayOf(ValuePropType).isRequired,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  page: PropTypes.number.isRequired,
  required: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: PropTypes.arrayOf(ValuePropType).isRequired,
  warning: PropTypes.string,
};

export default Checkbox;
