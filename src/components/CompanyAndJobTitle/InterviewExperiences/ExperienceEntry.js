import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';

import { Heading, P } from 'common/base';
import Coin from 'common/icons/Coin';
import styles from './InterviewExperiences.module.css';
import { formatCreatedAt, formatSalary, formatSalaryRange } from './helper';
import OverallRating from 'common/OverallRating';

const createLinkTo = ({ id, pageType }) => ({
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
    salary,
    averageSectionRating,
    sections: [section],
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
            面試經驗 · {formatCreatedAt(createdAt)}
          </P>
          <div className={styles.salaryRatingWrapper}>
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
            {averageSectionRating && (
              <OverallRating rating={averageSectionRating} hasRatingNumber />
            )}
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
    originalCompanyName: PropTypes.string,
    salary: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }),
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  pageType: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm', 'l']),
};

ExperienceEntry.defaultProps = {
  size: 'm',
  onClick: null,
};

export default ExperienceEntry;
