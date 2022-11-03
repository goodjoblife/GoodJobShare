import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';

import { Heading, P } from 'common/base';
import i from 'common/icons';
import styles from './InterviewExperiences.module.css';
import { formatCreatedAt, formatSalary, formatSalaryRange } from './helper';
import Rating from './Rating';

const createLinkTo = ({ id, pageType }) => ({
  pathname: `/experiences/${id}`,
  state: { pageType },
});

const SNIPPET_SIZE = 30;

const ExperienceEntry = ({
  pageType,
  data: {
    id,
    company: { name: companyName } = {},
    job_title: { name: jobTitle } = {},
    created_at: createdAt,
    salary,
    overall_rating: overallRating,
    sections: [section],
  },
  size,
  canView,
}) => (
  <div className={cn(styles.container, styles[size])}>
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
            <div className={styles.rating}>
              <Rating rate={overallRating} />
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
  data: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l']),
  canView: PropTypes.bool.isRequired,
};

ExperienceEntry.defaultProps = {
  size: 'm',
};

export default ExperienceEntry;
