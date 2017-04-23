import React, { PropTypes } from 'react';

import RateButton from 'common/button/RateButton';

const OverallRating = ({ overallRating, onChange }) => (
  <div>
    <RateButton
      rating={overallRating}
      onChange={onChange}
    />
  </div>
);

OverallRating.propTypes = {
  overallRating: PropTypes.number,
  onChange: PropTypes.func,
};

export default OverallRating;

