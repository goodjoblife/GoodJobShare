import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Thumbs from './Thumbs';
import { Rating, RatingLabel } from './Rating';
import styles from './Rating.module.css';

const OverallRating = ({ rating: rawRating, hasRatingLabel }) => {
  const rating = Number(rawRating.toFixed(1));

  return (
    <div className={cn(styles.overallRating)}>
      <Rating rating={rating} textYellow={hasRatingLabel} />
      <div className={styles.ratingInfo}>
        <Thumbs rating={rating} />
        {hasRatingLabel && <RatingLabel rating={rating} />}
      </div>
    </div>
  );
};

OverallRating.propTypes = {
  hasRatingLabel: PropTypes.bool,
  rating: PropTypes.number.isRequired,
};

OverallRating.defaultProps = {
  hasRatingLabel: false,
};

export default OverallRating;
