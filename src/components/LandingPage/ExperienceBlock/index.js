import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { Heading, P } from 'common/base';
import Comment from 'common/reaction/Comment';
import ThumbsUp from 'common/reaction/ThumbsUp';

import styles from './ExperienceBlock.module.css';
import { formatCreatedAt, formatType } from './helper';

const ExperienceBlock = ({ data, size, backable }) => {
  const {
    id,
    type,
    created_at: createdAt,
    like_count: likeCount,
    reply_count: replyCount,
  } = data;
  const splitter = ' ・ ';

  return (
    <Link
      to={{ pathname: `/experiences/${id}`, state: { backable } }}
      className={cn(styles.container, styles[size])}
    >
      <section className={styles.contentWrapper}>
        <P size="s" className={styles.meta}>
          {`${formatType(type)}${splitter}${formatCreatedAt(createdAt)}`}
        </P>

        <Heading
          Tag="h2"
          size={size === 'l' ? 'sl' : 'sm'}
          className={styles.heading}
        >
          {data.originalCompanyName} {data.job_title.name}
        </Heading>

        {size === 'l' || size === 'm' ? (
          <P size="m">{data.preview} ... ...</P>
        ) : null}
        <span className={styles.more}>閱讀更多</span>
      </section>
      <div className={styles.reaction}>
        <ThumbsUp count={likeCount} />
        <Comment count={replyCount} />
      </div>
    </Link>
  );
};

ExperienceBlock.propTypes = {
  backable: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    job_title: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    like_count: PropTypes.number.isRequired,
    originalCompanyName: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    reply_count: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l']).isRequired,
};

ExperienceBlock.defaultProps = {
  size: 'm',
  backable: false,
};

export default ExperienceBlock;
