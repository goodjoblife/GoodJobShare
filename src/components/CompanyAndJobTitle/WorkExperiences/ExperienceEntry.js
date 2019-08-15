import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Heading, P } from 'common/base';
import i from 'common/icons';
import styles from './WorkExperiences.module.css';
import {
  formatCreatedAt,
  formatSalary,
  formatRecommendToOthers,
} from './helper';
import Label from '../Label';
import { pageType as PAGE_TYPE } from '../../../constants/companyJobTitle';

const createLinkTo = (id, backable) => ({
  pathname: `/experiences/${id}`,
  state: { backable },
});

const ExperienceEntry = ({ pageType, data, size, backable }) => {
  const {
    id,
    company: { name: companyName } = {},
    job_title: { name: jobTitle } = {},
    region,
    created_at: createdAt,
    salary,
    title,
    recommend_to_others: recommendToOthers,
  } = data;

  return (
    <Link
      to={createLinkTo(id, backable)}
      className={cn(styles.container, styles[size])}
    >
      <section className={styles.contentWrapper}>
        <P size="s">{formatCreatedAt(createdAt)}</P>

        <Heading
          Tag="h2"
          size={size === 'l' ? 'sl' : 'sm'}
          className={styles.heading}
        >
          {title}
        </Heading>

        <div className={styles.labels}>
          {pageType !== PAGE_TYPE.COMPANY && (
            <Label
              text={companyName}
              Icon={i.Company}
              className={styles.company}
            />
          )}
          {pageType !== PAGE_TYPE.JOB_TITLE && (
            <Label text={jobTitle} Icon={i.User} className={styles.position} />
          )}
          {region && (
            <Label
              text={region}
              Icon={i.Location}
              className={styles.location}
            />
          )}
          {salary && (
            <Label
              className={styles.salary}
              text={formatSalary(salary)}
              Icon={i.Coin}
            />
          )}
          <Label
            className={styles.recommendToOthers}
            text={formatRecommendToOthers(recommendToOthers)}
            Icon={recommendToOthers === 'yes' ? i.Good : i.Bad}
          />
        </div>
      </section>
    </Link>
  );
};

ExperienceEntry.propTypes = {
  data: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l']),
  backable: PropTypes.bool,
};

ExperienceEntry.defaultProps = {
  size: 'm',
  backable: false,
};

export default ExperienceEntry;
