import React from 'react';
import { ThumbsContainer, RatingThumb } from './Thumb';
import { OverallRatingContainer, Rating, RatingLabel } from './Rating';
import styles from './Rating.module.css';
import PropTypes from 'prop-types';

const thumbs = Array.from({ length: 5 }, (_, i) => i + 1);

const OverallRating = ({ rate, hasRatingLabel }) => {
  const renderThumbs = thumbs.map(element => {
    return <RatingThumb key={element} rate={rate} element={element} />;
  });
  return (
    <OverallRatingContainer>
      <Rating rate={rate} textYellow={hasRatingLabel} />
      <div className={styles.ratingInfo}>
        <ThumbsContainer>{renderThumbs}</ThumbsContainer>
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
