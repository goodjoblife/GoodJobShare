import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Rating, RatingLabel } from './Rating';
import styles from './Rating.module.css';
import Thumbs from './Thumbs';

const OverallRating = ({ size, rating, hasRatingLabel, hasRatingNumber }) => {
  return (
    <div className={cn(styles.overallRating)}>
      {hasRatingNumber && (
        <Rating rating={rating} textYellow={hasRatingLabel} />
      )}
      <div className={styles.ratingInfo}>
        <Thumbs size={size} rating={rating} />
        {hasRatingLabel ? <RatingLabel size={size} rating={rating} /> : null}
      </div>
    </div>
  );
};

OverallRating.propTypes = {
  hasRatingLabel: PropTypes.bool,
  hasRatingNumber: PropTypes.bool,
  rating: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['s', 'm']),
};

OverallRating.defaultProps = {
  hasRatingLabel: false,
  hasRatingNumber: false,
};

export default OverallRating;
