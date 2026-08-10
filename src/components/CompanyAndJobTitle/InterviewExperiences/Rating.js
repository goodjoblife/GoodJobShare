import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import rateButtonStyles from 'common/button/RateButtonElement.module.css';
import Glike from 'common/icons/Glike';

import styles from './InterviewExperiences.module.css';

const Rating = ({ rate }) => (
  <div className={styles.rateButtons}>
    {[1, 2, 3, 4, 5].map(el => (
      <Glike
        key={el}
        className={cn(
          rateButtonStyles.container,
          styles.autoCursor,
          {
            [rateButtonStyles.active]: el <= rate,
          },
          styles.rateButton,
        )}
      />
    ))}
  </div>
);

Rating.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default Rating;
