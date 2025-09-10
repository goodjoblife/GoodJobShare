import React, { Fragment } from 'react';
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
  if (rating > 0) {
    return (
      <Fragment>
        <div style={{ display: 'flex' }}>
          <InfoBlock label="評分" noMargin>
            {rating}分
          </InfoBlock>
          <OverallRating rating={rating} hasRatingLabel />
        </div>
      </Fragment>
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
