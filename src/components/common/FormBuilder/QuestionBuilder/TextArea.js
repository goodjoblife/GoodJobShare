import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({
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
    <textarea value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

Textarea.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
};

Textarea.defaultProps = {
  required: false,
};

export default Textarea;
