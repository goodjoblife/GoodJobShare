import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Glike } from 'common/icons';
import rateButtonStyles from 'common/button/RateButtonElement.module.css';
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
