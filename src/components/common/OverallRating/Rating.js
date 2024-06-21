import React from 'react';
import styles from './Rating.module.css';
import cn from 'classnames';
import { overallRatingDialogMap } from 'components/ShareExperience/common/optionMap';
import PropTypes from 'prop-types';

const OverallRatingContainer = ({ children }) => (
  <div className={cn(styles.overallRating)}>{children}</div>
);

OverallRatingContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const Rating = ({ rate, textYellow }) => (
  <div
    className={cn(styles.rating, {
      [styles.textYellow]: !textYellow,
    })}
  >
    {rate} 分
  </div>
);

Rating.propTypes = {
  rate: PropTypes.number.isRequired,
  textYellow: PropTypes.bool,
};

const RatingLabel = ({ rate }) => {
  return (
    <div className={styles.ratingLabel}>
      {overallRatingDialogMap[Math.floor(rate)]}
    </div>
  );
};

RatingLabel.propTypes = {
  rate: PropTypes.number.isRequired,
};

export { OverallRatingContainer, Rating, RatingLabel };
