import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ title, description, dataKey, required, validator }) => (
  <div>
    {title}
    <input type="text" />
  </div>
);

Text.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func.isRequired,
};

Text.defaultProps = {
  required: false,
};

export default Text;
