import React, { PropTypes } from 'react';

import RateButtonElement from './RateButtonElement';

const RateButton = ({ max, rating, onChange }) => (
  <div>
    {rating}
    {
      Array(max)
        .fill(null)
        .map((_, index) => index + 1)
        .map(ele =>
          <RateButtonElement
            key={ele}
            active={rating >= ele}
            onClick={() => onChange(ele)}
          />
        )
    }
  </div>
);

RateButton.propTypes = {
  max: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
};

export default RateButton;
