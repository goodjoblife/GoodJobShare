import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import { PageBoxRenderer } from '../StatusRenderer';
import WorkExperiencesSection from './WorkExperiences';
import Helmet from './Helmet';
import { Link } from 'common/base';
import { companyRatingStatisticsBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetching } from 'utils/fetchBox';
import ThumbImage from 'common/icons/thumb.svg';
import styles from './WorkExperiencesGenderSummary.module.css';
import filterStyles from './WorkExperiencesGenderFilter.module.css';

const GenderSummary = ({ pageName }) => {
  const ratingStatistcsBox = useSelector(
    companyRatingStatisticsBoxSelectorByName(pageName),
  );

  const isLoading = isFetching(ratingStatistcsBox);
  const data = ratingStatistcsBox.data;

  if (!data && !isLoading) {
    return null;
  }

  const { averageRating = 0, ratingDistribution = [], ratingCount = 0 } =
    data || {};

  const distributionMap = new Map(
    ratingDistribution.map(item => [item.rating, item.count]),
  );

  const rows = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: distributionMap.get(rating) || 0,
  }));

  const totalCount =
    ratingCount ||
    rows.reduce((sum, { count }) => {
      return sum + count;
    }, 0);

  return (
    <section className={styles.genderSummary}>
      <div className={styles.genderSummaryHeader}>
        <div className={styles.scoreBlock}>
          <div className={styles.scoreLabel}>性別友善度</div>
          <div className={styles.scoreValue}>
            {isLoading ? '-' : averageRating.toFixed(1)}
          </div>
          <div className={styles.thumbRow}>
            {Array.from({ length: 5 }).map((_, index) => (
              <img
                key={index}
                src={ThumbImage}
                className={styles.thumbIcon}
                alt="thumb"
              />
            ))}
          </div>
          <div className={styles.scoreMeta}>
            {isLoading ? '載入中…' : `評分人數：${totalCount}`}
          </div>
        </div>
        <div className={styles.distribution}>
          {rows.map(({ rating, count }) => {
            const percentage =
              totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
            return (
              <div key={rating} className={styles.distributionRow}>
                <div className={styles.distributionLabel}>{rating}分</div>
                <div className={styles.distributionBarTrack}>
                  <div
                    className={styles.distributionBarFill}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className={styles.distributionCount}>{count}</div>
              </div>
            );
          })}
        </div>
      </div>
      <p className={styles.summaryText}>
        本站使用者分享之評價內容，整體反映出公司在性別友善度上的表現。不同部門或職務在文化、福利與加班情況上可能有所差異，建議在評估工作機會時，搭配實際職缺內容與自身需求一併考量。
      </p>
      <p className={styles.summaryNote}>
        本段評論由 ChatGPT
        參考本站公開評價內容自動整理，僅供參考，實際情形仍以各公司內部規範與個人經驗為準。
      </p>
    </section>
  );
};

GenderSummary.propTypes = {
  pageName: PropTypes.string.isRequired,
};

const FILTER_OPTIONS = [
  { key: 'verySatisfied', label: '非常滿意' },
  { key: 'satisfied', label: '滿意' },
  { key: 'normal', label: '普通' },
  { key: 'dissatisfied', label: '不滿意' },
  { key: 'veryDissatisfied', label: '非常不滿意' },
];

const Filter = () => {
  const [activeKeys, setActiveKeys] = useState(['verySatisfied', 'satisfied']);

  const toggleKey = key => {
    setActiveKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key],
    );
  };

  return (
    <div className={filterStyles.filterContainer}>
      <span className={filterStyles.label}>篩選：</span>
      <div className={filterStyles.options}>
        {FILTER_OPTIONS.map(option => {
          const isActive = activeKeys.includes(option.key);
          return (
            <button
              key={option.key}
              type="button"
              className={`${filterStyles.optionButton} ${
                isActive ? filterStyles.optionButtonActive : ''
              }`}
              onClick={() => toggleKey(option.key)}
            >
              <span
                className={`${filterStyles.checkbox} ${
                  isActive ? filterStyles.checkboxActive : ''
                }`}
              >
                {isActive && <span className={filterStyles.checkboxCheck} />}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const WorkExperiencesGender = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  page,
  pageSize,
}) => (
  <CompanyAndJobTitleWrapper
    pageType={pageType}
    pageName={pageName}
    tabType={tabType}
  >
    <Link>&lt;&lt;回到評價分頁</Link>
    <PageBoxRenderer
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      boxSelector={boxSelector}
      render={({ workExperiences, workExperiencesCount: totalCount }) => {
        return (
          <Fragment>
            <Helmet
              pageType={pageType}
              pageName={pageName}
              totalCount={totalCount}
              page={page}
            />
            <GenderSummary pageName={pageName} />
            <Filter />
            <WorkExperiencesSection
              pageType={pageType}
              pageName={pageName}
              tabType={tabType}
              data={workExperiences}
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
            />
          </Fragment>
        );
      }}
    />
  </CompanyAndJobTitleWrapper>
);

WorkExperiencesGender.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
};

export default WorkExperiencesGender;
