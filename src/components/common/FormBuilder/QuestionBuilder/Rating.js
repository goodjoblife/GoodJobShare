import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({
  title,
  description,
  dataKey,
  required,
  validator,
  maxRating,
}) => (
  <div>
    {title}
    {[...Array(maxRating).keys()].map((_, i) => (
      <input key={i} type="radio" name={dataKey} value={i} />
    ))}
  </div>
);

Rating.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func.isRequired,
  maxRating: PropTypes.number.isRequired,
};

Rating.defaultProps = {
  required: false,
};

export default Rating;
