import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ title, description, dataKey, required, validator }) => (
  <div>
    {title}
    <textarea />
  </div>
);

Textarea.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func.isRequired,
};

Textarea.defaultProps = {
  required: false,
};

export default Textarea;
