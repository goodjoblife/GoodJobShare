import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  onConfirm,
  warning,
  maxRating,
}) => (
  <div>
    {title}
    {[...Array(maxRating).keys()].map((_, i) => (
      <input
        key={i}
        type="checkbox"
        name={dataKey}
        checked={i < value}
        onChange={() => {
          onChange(i + 1);
          onConfirm();
        }}
      />
    ))}
  </div>
);

Rating.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
  maxRating: PropTypes.number.isRequired,
};

Rating.defaultProps = {
  required: false,
};

export default Rating;
