import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './private/Wrapper';
import BlockSelect from './private/BlockSelect';
import { OptionPropType, ValuePropType } from './PropTypes';

const Radio = ({
  dataKey,
  required,
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
  dataKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  required: PropTypes.bool,
  value: ValuePropType,
  warning: PropTypes.string,
};

export default Radio;
