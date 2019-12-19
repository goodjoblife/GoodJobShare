import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';
import { Heading, P } from 'common/base';
import i from 'common/icons';
import styles from './WorkExperiences.module.css';
import { formatSalary, formatSalaryRange } from 'common/formatter';
import { formatCreatedAt, formatWeekWorkTime } from './helper';

const createLinkTo = id => ({
  pathname: `/experiences/${id}`,
  state: { backable: true },
});

const SNIPPET_SIZE = 30;

const ExperienceEntry = ({
  pageType,
  data: {
    id,
    company: { name: companyName } = {},
    job_title: { name: jobTitle } = {},
    created_at: createdAt,
    sections: [section],
    week_work_time: weekWorkTime,
    salary,
    recommend_to_others: recommendToOthers,
  },
  size,
  canViewExperienceDetail,
}) => (
  <div className={cn(styles.container, styles[size])}>
    <Link to={createLinkTo(id)}>
      <section className={styles.contentWrapper}>
        <div className={styles.labels}>
          <P size="s" className={styles.date}>
            工作經驗 · {formatCreatedAt(createdAt)}
          </P>
          {weekWorkTime && canViewExperienceDetail && (
            <div className={styles.weekWorkTime}>
              <i.Clock />
              {formatWeekWorkTime(weekWorkTime)}
            </div>
          )}
          <div className={styles.salaryRecommendWrapper}>
            {salary && (
              <div
                className={cn(styles.salary, {
                  [styles.locked]: !canViewExperienceDetail,
                })}
              >
                {canViewExperienceDetail ? (
                  <React.Fragment>
                    <i.Coin />
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
            <div className={styles.recommendToOthers}>
              {recommendToOthers === 'yes' ? <i.Good /> : <i.Bad />}
              {recommendToOthers === 'yes' ? '推' : '不推'}
            </div>
          </div>
        </div>

        <Heading
          Tag="h2"
          size={size === 'l' ? 'sl' : 'sm'}
          className={styles.heading}
        >
          {companyName} {jobTitle}
        </Heading>

        <div className={styles.snippetWrapper}>
          <span className={styles.snippet}>
            {section.content.slice(0, SNIPPET_SIZE)}....
          </span>
          <span
            className={cn(styles.readmore, {
              [styles.locked]: !canViewExperienceDetail,
            })}
          >
            {`閱讀更多${canViewExperienceDetail ? '' : '並解鎖'}`}
          </span>
        </div>
      </section>
    </Link>
  </div>
);

ExperienceEntry.propTypes = {
  data: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l']),
  canViewExperienceDetail: PropTypes.bool.isRequired,
};

ExperienceEntry.defaultProps = {
  size: 'm',
};

export default ExperienceEntry;
