import React, { PropTypes } from 'react';

import RateButton from 'common/button/RateButton';

import styles from './OverallRating.module.css';

import {
  overallRatingDialogMap,
} from '../../common/optionMap';

const handleRatingDialog = rating => (
  overallRatingDialogMap[rating] || '點擊作評分'
);

const OverallRating = ({ overallRating, onChange }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <RateButton
      max={5}
      rating={overallRating}
      onChange={onChange}
    />
    <div
      className={styles.dialog}
    >
      <p
        className="pS"
      >
        {handleRatingDialog(overallRating)}
      </p>
    </div>
  </div>
);

OverallRating.propTypes = {
  overallRating: PropTypes.number,
  onChange: PropTypes.func,
};

export default OverallRating;

