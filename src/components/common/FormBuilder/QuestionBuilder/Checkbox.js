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
  warning,
  options,
}) => (
  <div>
    {title}
    {options.map(option => (
      <label key={option}>
        <input
          type="checkbox"
          name={dataKey}
          value={option}
          checked={R.contains(option, values)}
          onChange={() => onChange(toggle(option, values))}
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
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  warning: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Checkbox.defaultProps = {
  required: false,
};

export default Checkbox;
