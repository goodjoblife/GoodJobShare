import React from 'react';
import { ThumbsContainer, RatingThumb } from './Thumb';
import { OverallRatingContainer, Rating, RatingLabel } from './Rating';
import styles from './Rating.module.css';
import PropTypes from 'prop-types';

const thumbs = Array.from({ length: 5 }, (_, i) => i + 1);

const OverallRating = ({ rate, isShowRatingLabel = true }) => {
  const renderThumbs = thumbs.map(element => {
    return <RatingThumb key={element} rate={rate} element={element} />;
  });

  return (
    <OverallRatingContainer>
      <Rating rate={rate} textYellow={isShowRatingLabel} />
      <div className={styles.ratingInfo}>
        <ThumbsContainer>{renderThumbs}</ThumbsContainer>
        {isShowRatingLabel && <RatingLabel rate={rate} />}
      </div>
    </OverallRatingContainer>
  );
};

OverallRating.propTypes = {
  isShowRatingLabel: PropTypes.bool,
  rate: PropTypes.number.isRequired,
};

export default OverallRating;
