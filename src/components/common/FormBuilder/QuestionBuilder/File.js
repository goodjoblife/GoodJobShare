import React from 'react';
import PropTypes from 'prop-types';

const File = ({
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
    {description}
    <input type="file" value={value} onChange={onChange} />
  </div>
);

File.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
};

File.defaultProps = {
  required: false,
};

export default File;
