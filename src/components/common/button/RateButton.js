import React, { PropTypes } from 'react';

import RateButtonElement from './RateButtonElement';

const RateButton = ({ rating, onChange }) => (
  <div>
    {rating}
    {
      Array(5)
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
  rating: PropTypes.number,
  onChange: PropTypes.func,
};

export default RateButton;
