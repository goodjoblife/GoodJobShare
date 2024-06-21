import React from 'react';
import Thumbs from './Thumb';
import { OverallRatingContainer, Rating, RatingLabel } from './Rating';
import styles from './Rating.module.css';
import PropTypes from 'prop-types';

const OverallRating = ({ rate, hasRatingLabel }) => {
  return (
    <OverallRatingContainer>
      <Rating rate={rate} textYellow={hasRatingLabel} />
      <div className={styles.ratingInfo}>
        <Thumbs rate={rate} />
        {hasRatingLabel && <RatingLabel rate={rate} />}
      </div>
    </OverallRatingContainer>
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
