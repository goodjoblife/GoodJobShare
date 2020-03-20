import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  validator,
  options,
}) => (
  <div>
    {title}
    {options.map(option => (
      <label key={option}>
        <input
          type="radio"
          name={dataKey}
          value={option}
          checked={option === value}
          onChange={() => onChange(option)}
        />
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
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Radio.defaultProps = {
  required: false,
};

export default Radio;
