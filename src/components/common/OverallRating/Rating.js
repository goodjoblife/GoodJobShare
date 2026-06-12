import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { overallRatingDialogMap } from 'components/ShareExperience/common/optionMap';

import styles from './Rating.module.css';

const Rating = ({ rating, textYellow }) => (
  <div
    className={cn(styles.rating, {
      [styles.textYellow]: !textYellow,
    })}
  >
    {rating.toFixed(1)} 分
  </div>
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  textYellow: PropTypes.bool,
};

const RatingLabel = ({ size = 'm', rating }) => {
  return (
    <div className={cn(styles.ratingLabel, styles[size])}>
      {overallRatingDialogMap[Math.floor(rating)]}
    </div>
  );
};

RatingLabel.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['s', 'm']).isRequired,
};

export { Rating, RatingLabel };
