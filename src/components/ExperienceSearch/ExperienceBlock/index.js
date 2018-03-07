import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Heading, P } from 'common/base';
import i from 'common/icons';
import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import styles from './ExperienceBlock.module.css';
import {
  formatType,
  formatCreatedAt,
  formatSalary,
} from './helper';

const Label = ({ Icon, text, className }) => (
  <div className={cn(styles.label, className)}>
    <Icon />
    <P Tag="span" size="m" bold>{text}</P>
  </div>
);

Label.propTypes = {
  Icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const ExperienceBlock = ({ data, size, backable }) => {
  const {
    _id,
    type,
    created_at: createdAt,
    salary,
    title,
    like_count: likeCount,
    reply_count: replyCount,
  } = data;
  const splitter = ' ・ ';

  return (
    <Link to={{ pathname: `/experiences/${_id}`, state: { backable } }} className={cn(styles.container, styles[size])}>
      <section className={styles.contentWrapper}>
        <P size="s">
          {`${formatType(type)}${splitter}${formatCreatedAt(createdAt)}`}
        </P>

        <Heading
          Tag="h2"
          size={size === 'l' ? 'sl' : 'sm'}
          className={styles.heading}
        >
          {title}
        </Heading>

        <div className={styles.labels}>
          <Label text={data.company.name} Icon={i.Company} className={styles.company} />
          <Label text={data.job_title} Icon={i.User} className={styles.position} />
          <Label text={data.region} Icon={i.Location} className={styles.location} />
          {
            salary &&
            <Label
              className={styles.salary}
              text={formatSalary(salary)}
              Icon={i.Coin}
            />
          }
        </div>

        {
          (size === 'l' || size === 'm') ?
            <P size="m">
              {data.preview} ... ... <span className={styles.more}>閱讀更多</span>
            </P>
            : null
        }
      </section>
      <div className={styles.reaction}>
        <ThumbsUp count={likeCount} />
        <Comment count={replyCount} />
      </div>
    </Link>
  );
};

ExperienceBlock.propTypes = {
  data: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l']),
  backable: PropTypes.bool,
};

ExperienceBlock.defaultProps = {
  size: 'm',
  backable: false,
};

export default ExperienceBlock;
