import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Heading, P } from 'common/base';
import i from 'common/icons';
import styles from './WorkExperiences.module.css';
import { formatCreatedAt, formatWeekWorkTime, formatSalary } from './helper';

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
}) => (
  <div className={cn(styles.container, styles[size])}>
    <section className={styles.contentWrapper}>
      <div className={styles.labels}>
        <P size="s" className={styles.date}>
          工作經驗 · {formatCreatedAt(createdAt)}
        </P>
        {weekWorkTime && (
          <div className={styles.weekWorkTime}>
            <i.Clock />
            {formatWeekWorkTime(weekWorkTime)}
          </div>
        )}
        {salary && (
          <div className={styles.salary}>
            <i.Coin />
            {formatSalary(salary)}
          </div>
        )}
        <div className={styles.recommendToOthers}>
          {recommendToOthers ? <i.Good /> : <i.Bad />}
          {recommendToOthers ? '推' : '不推'}
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
        <Link to={createLinkTo(id)} className={styles.readmore}>
          閱讀更多
        </Link>
      </div>
    </section>
  </div>
);

ExperienceEntry.propTypes = {
  data: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l']),
};

ExperienceEntry.defaultProps = {
  size: 'm',
};

export default ExperienceEntry;
