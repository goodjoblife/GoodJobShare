import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Heading, P } from 'common/base';
import i from 'common/icons';
import styles from './InterviewExperiences.module.css';
import { formatCreatedAt, formatSalary } from './helper';
import Label from './Label';
import Rating from './Rating';

const createLinkTo = (_id, backable) => ({
  pathname: `/experiences/${_id}`,
  state: { backable },
});

const ExperienceEntry = ({ pageType, data, size, backable }) => {
  const { _id, created_at: createdAt, salary, title, overallRating } = data;

  return (
    <Link
      to={createLinkTo(_id, backable)}
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
          {pageType !== 'company' && (
            <Label
              text={data.company.name}
              Icon={i.Company}
              className={styles.company}
            />
          )}
          {pageType !== 'jobTitle' && (
            <Label
              text={data.job_title}
              Icon={i.User}
              className={styles.position}
            />
          )}
          {data.region && (
            <Label
              text={data.region}
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
          <Rating rate={overallRating} />
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
