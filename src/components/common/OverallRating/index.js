import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Thumbs from './Thumb';
import { Rating, RatingLabel } from './Rating';
import styles from './Rating.module.css';

const OverallRating = ({ rate, hasRatingLabel }) => {
  return (
    <div className={cn(styles.overallRating)}>
      <Rating rate={rate} textYellow={hasRatingLabel} />
      <div className={styles.ratingInfo}>
        <Thumbs rate={rate} />
        {hasRatingLabel && <RatingLabel rate={rate} />}
      </div>
    </div>
  );
};

OverallRating.propTypes = {
  hasRatingLabel: PropTypes.bool,
  rate: PropTypes.number.isRequired,
};

OverallRating.defaultProps = {
  hasRatingLabel: false,
};

export default OverallRating;
