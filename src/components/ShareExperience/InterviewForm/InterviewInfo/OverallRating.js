import React, { PropTypes } from 'react';
import cn from 'classnames';

import RateButton from 'common/button/RateButton';

import InputTitle from '../../common/InputTitle';
import styles from './OverallRating.module.css';


import {
  overallRatingDialogMap,
} from '../../common/optionMap';

const handleRatingDialog = rating => (
  overallRatingDialogMap[rating] || '點擊作評分'
);

const OverallRating = ({ overallRating, onChange, validator, submitted }) => {
  const isWarning = submitted && !validator(overallRating);
  return (
    <div>
      <div
        style={{
          marginBottom: '20px',
        }}
      >
        <InputTitle
          text="整體面試滿意程度"
          must
        />
      </div>
      <div
        className={isWarning ? styles.warning : ''}
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
      {
        isWarning ?
          <p
            className={cn(styles.warning__wording, 'pS')}
            style={{
              marginTop: '8px',
            }}
          >
            需選取面試滿意程度
          </p>
          : null
      }
    </div>
  );
};

OverallRating.propTypes = {
  overallRating: PropTypes.number,
  onChange: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
};

export default OverallRating;

