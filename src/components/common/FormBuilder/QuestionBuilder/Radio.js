import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({
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
      <label key={option}>
        <input type="radio" name={dataKey} value={option} />
        {option}
      </label>
    ))}
  </div>
);

Radio.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Radio.defaultProps = {
  required: false,
};

export default Radio;
