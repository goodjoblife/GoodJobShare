import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { companyRatingStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { isFetched } from 'utils/fetchBox';
import styles from './RatingStatisticsCard.module.css';
import ThumbImage from 'common/icons/thumb.svg';

const RatingStatisticsCard = ({ pageType, pageName }) => {
  const ratingStatistcsBox = useSelector(
    companyRatingStatisticsBoxSelectorByName(pageName),
  );

  if (pageType !== PAGE_TYPE.COMPANY || !isFetched(ratingStatistcsBox)) {
    return null;
  }

  const data = ratingStatistcsBox.data;
  if (!data) {
    return null;
  }

  const { averageRating, ratingCount } = data;
  return (
    <div className={styles.ratingStatisticsCard}>
      <div className={styles.statBlock}>
        <div className={styles.label}>評分</div>
        <div className={styles.value}>
          <span>{averageRating.toFixed(1)}</span>
          <span>
            <img
              src={ThumbImage}
              className={styles.blackThumb}
              alt="blackThumb"
            />
          </span>
        </div>
      </div>
      <div className={styles.statBlock}>
        <div className={styles.label}>評分數</div>
        <div className={styles.value}>
          <span>{ratingCount}</span>
        </div>
      </div>
    </div>
  );
};

export default RatingStatisticsCard;

RatingStatisticsCard.propTypes = {
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
};
