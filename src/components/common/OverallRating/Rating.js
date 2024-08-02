import React from 'react';
import styles from './Rating.module.css';
import cn from 'classnames';
import { overallRatingDialogMap } from 'components/ShareExperience/common/optionMap';
import PropTypes from 'prop-types';

const Rating = ({ rating, textYellow }) => (
  <div
    className={cn(styles.rating, {
      [styles.textYellow]: !textYellow,
    })}
  >
    {rating} 分
  </div>
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  textYellow: PropTypes.bool,
};

const RatingLabel = ({ rating }) => {
  return (
    <div className={styles.ratingLabel}>
      {overallRatingDialogMap[Math.floor(rating)]}
    </div>
  );
};

RatingLabel.propTypes = {
  rating: PropTypes.number.isRequired,
};

export { Rating, RatingLabel };
