import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './private/Wrapper';
import BlockSelect from './private/BlockSelect';
import { OptionPropType, ValuePropType } from './PropTypes';

const Checkbox = ({ dataKey, value, onChange, warning, options }) => (
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
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  value: PropTypes.arrayOf(ValuePropType).isRequired,
  warning: PropTypes.string,
};

export default Checkbox;
