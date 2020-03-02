import React from 'react';
import PropTypes from 'prop-types';

const File = ({ title, description, dataKey, required, validator }) => (
  <div>
    {title}
    {description}
    <input type="file" />
  </div>
);

File.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func.isRequired,
};

File.defaultProps = {
  required: false,
};

export default File;
