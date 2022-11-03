import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, BlockSelect } from './private';

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
  validator,
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
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Radio;
