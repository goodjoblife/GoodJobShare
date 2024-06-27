import React from 'react';
import Good from 'common/icons/Good';
import Bad from 'common/icons/Bad';
import styles from './Article.module.css';
import InfoBlock from './InfoBlock';
import OverallRating from 'common/OverallRating';
import PropTypes from 'prop-types';

const RecommendationIcon = ({ recommend }) => (
  <div className={styles.recommendIcon}>
    {recommend === 'yes' ? (
      <>
        <Good /> 推
      </>
    ) : (
      <>
        <Bad /> 不推
      </>
    )}
  </div>
);

RecommendationIcon.propTypes = {
  recommend: PropTypes.string.isRequired,
};

const RatingInfo = ({ rating, recommend }) => {
  if (rating >= 0) {
    return (
      <InfoBlock label="整體評價">
        <OverallRating rating={rating} hasRatingLabel />
      </InfoBlock>
    );
  }

  if (recommend) {
    return (
      <InfoBlock label="是否推薦此工作">
        <RecommendationIcon recommend={recommend} />
      </InfoBlock>
    );
  }

  return null;
};

RatingInfo.propTypes = {
  rating: PropTypes.number,
  recommend: PropTypes.string,
};

export default RatingInfo;
