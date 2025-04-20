import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';
import { Heading, P } from 'common/base';
import Clock from 'common/icons/Clock';
import Coin from 'common/icons/Coin';
import Good from 'common/icons/Good';
import Bad from 'common/icons/Bad';
import styles from './WorkExperiences.module.css';
import { formatSalary, formatSalaryRange } from 'common/formatter';
import { formatCreatedAt, formatWeekWorkTime } from './helper';
import OverallRating from 'common/OverallRating';

const createLinkTo = ({ pageType, id }) => ({
  pathname: `/experiences/${id}`,
  state: { pageType },
});

const SNIPPET_SIZE = 30;

const ExperienceEntry = ({
  pageType,
  data: {
    id,
    originalCompanyName,
    job_title: { name: jobTitle } = {},
    created_at: createdAt,
    sections: [section],
    week_work_time: weekWorkTime,
    salary,
    recommend_to_others: recommendToOthers,
    averageSectionRating,
  },
  size,
  canView,
  onClick,
}) => (
  <div className={cn(styles.container, styles[size])} onClick={onClick}>
    <Link to={createLinkTo({ id, pageType })}>
      <section className={styles.contentWrapper}>
        <div className={styles.labels}>
          <P size="s" className={styles.date}>
            評價 · {formatCreatedAt(createdAt)}
          </P>
          <div className={styles.salaryRecommendWrapper}>
            <div className={styles.rowWrapper}>
              {weekWorkTime && canView && (
                <div className={styles.weekWorkTime}>
                  <Clock />
                  {formatWeekWorkTime(weekWorkTime)}
                </div>
              )}
              {salary && (
                <div
                  className={cn(styles.salary, {
                    [styles.locked]: !canView,
                  })}
                >
                  {canView ? (
                    <React.Fragment>
                      <Coin />
                      {formatSalary(salary)}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <FontAwesomeIcon icon={faLock} />
                      {formatSalaryRange(salary)}
                    </React.Fragment>
                  )}
                </div>
              )}

              {averageSectionRating ? (
                <div className={styles.overallRatingWrapper}>
                  <OverallRating
                    rating={averageSectionRating}
                    hasRatingNumber
                  />
                </div>
              ) : (
                <div className={styles.recommendToOthers}>
                  {recommendToOthers === 'yes' ? <Good /> : <Bad />}
                  {recommendToOthers === 'yes' ? '推' : '不推'}
                </div>
              )}
            </div>
          </div>
        </div>

        <Heading
          Tag="h3"
          size={size === 'l' ? 'sl' : 'sm'}
          className={styles.heading}
        >
          {originalCompanyName} {jobTitle}
        </Heading>

        <div className={styles.snippetWrapper}>
          <span className={styles.snippet}>
            {section.content.slice(0, SNIPPET_SIZE)}....
          </span>
          <span
            className={cn(styles.readmore, {
              [styles.locked]: !canView,
            })}
          >
            {`閱讀更多${canView ? '' : '並解鎖'}`}
          </span>
        </div>
      </section>
    </Link>
  </div>
);

ExperienceEntry.propTypes = {
  canView: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    averageSectionRating: PropTypes.number,
    created_at: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    job_title: PropTypes.shape({ name: PropTypes.string.isRequired })
      .isRequired,
    originalCompanyName: PropTypes.string.isRequired,
    recommend_to_others: PropTypes.string,
    salary: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }),
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
      }),
    ).isRequired,
    week_work_time: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  pageType: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l']),
};

ExperienceEntry.defaultProps = {
  size: 'm',
  onClick: null,
};

export default ExperienceEntry;
