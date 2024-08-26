import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Thumbs from './Thumbs';
import { Rating, RatingLabel } from './Rating';
import styles from './Rating.module.css';

const OverallRating = ({ rating, hasRatingLabel, hasRatingNumber }) => {
  return (
    <div className={cn(styles.overallRating)}>
      {hasRatingNumber && (
        <Rating rating={rating} textYellow={hasRatingLabel} />
      )}
      <div className={styles.ratingInfo}>
        <Thumbs rating={rating} />
        {hasRatingLabel ? <RatingLabel rating={rating} /> : null}
      </div>
    </div>
  );
};

OverallRating.propTypes = {
  hasRatingLabel: PropTypes.bool,
  hasRatingNumber: PropTypes.bool,
  rating: PropTypes.number.isRequired,
};

OverallRating.defaultProps = {
  hasRatingLabel: false,
  hasRatingNumber: false,
};

export default OverallRating;
