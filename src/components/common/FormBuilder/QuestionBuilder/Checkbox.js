import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

const toggle = (value, values) => {
  if (R.contains(value, values)) {
    return R.without(value, values);
  } else {
    return R.append(value, values);
  }
};

const Checkbox = ({
  title,
  description,
  dataKey,
  required,
  value: values,
  onChange,
  validator,
  options,
}) => (
  <div>
    {title}
    {options.map(option => (
      <label>
        <input
          type="radio"
          name={dataKey}
          value={option}
          checked={R.contains(option, values)}
          onChange={toggle(option, values)}
        />
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Checkbox.defaultProps = {
  required: false,
};

export default Checkbox;
