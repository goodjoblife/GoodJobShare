import React from 'react';
import PropTypes from 'prop-types';

const Text = ({
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  validator,
}) => (
  <div>
    {title}
    <input type="text" value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

Text.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
};

Text.defaultProps = {
  required: false,
};

export default Text;
