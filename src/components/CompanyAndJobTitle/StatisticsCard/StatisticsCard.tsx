import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

import ThumbImage from 'common/icons/thumb.svg';
import { PageType } from 'constants/companyJobTitle';
import { companyRatingStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetching } from 'utils/fetchBox';

import styles from './StatisticsCard.module.css';

type StatisticsCardProps = {
  pageName: string;
  pageType: PageType;
};

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  pageType,
  pageName,
}) => {
  const ratingStatistcsBox = useSelector(
    companyRatingStatisticsBoxSelectorByName(pageName),
  );

  if (pageType !== PageType.COMPANY) {
    return null;
  }

  const data = ratingStatistcsBox.data;
  const isLoading = isFetching(ratingStatistcsBox);
  if (!data && !isLoading) {
    return null;
  }

  const { averageRating, ratingCount } = data || {};
  const statBlocks = [
    {
      statLabel: '評分',
      statItems: [
        averageRating ? averageRating.toFixed(1) : null,
        <img src={ThumbImage} className={styles.blackThumb} alt="blackThumb" />,
      ],
    },
    { statLabel: '評分數', statItems: [ratingCount] },
  ];

  return (
    <div className={styles.statisticsCard}>
      {statBlocks.map(({ statLabel, statItems }) => (
        <div className={styles.statBlock} key={statLabel}>
          <div className={styles.statLabel}>{statLabel}</div>
          <div className={styles.statContent}>
            {isLoading ? (
              <Skeleton width={33} height={18} />
            ) : (
              statItems.map((statItem, index) => (
                <span key={index}>{statItem}</span>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCard;
