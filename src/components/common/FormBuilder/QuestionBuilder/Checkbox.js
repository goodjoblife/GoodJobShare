import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  title,
  description,
  dataKey,
  required,
  validator,
  options,
}) => (
  <div>
    {title}
    {options.map(option => (
      <label>
        <input type="radio" name={dataKey} value={option} />
        {option}
      </label>
    ))}
  </div>
);

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Checkbox.defaultProps = {
  required: false,
};

export default Checkbox;
