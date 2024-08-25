import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Thumbs from './Thumbs';
import { Rating, RatingLabel } from './Rating';
import styles from './Rating.module.css';

const OverallRating = ({ rating, hasRatingLabel, hasRatingText }) => {
  const renderRatingText = () => {
    if (!hasRatingText) return null;
    return <Rating rating={rating} textYellow={hasRatingLabel} />;
  };

  const renderRatingLabel = () => {
    if (!hasRatingLabel) return null;
    return <RatingLabel rating={rating} />;
  };

  return (
    <div className={cn(styles.overallRating)}>
      {renderRatingText()}
      <div className={styles.ratingInfo}>
        <Thumbs rating={rating} />
        {renderRatingLabel()}
      </div>
    </div>
  );
};

OverallRating.propTypes = {
  hasRatingLabel: PropTypes.bool,
  hasRatingText: PropTypes.bool,
  rating: PropTypes.number.isRequired,
};

OverallRating.defaultProps = {
  hasRatingLabel: false,
  hasRatingText: false,
};

export default OverallRating;
