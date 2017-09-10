import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import qs from 'qs';
import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import styles from './RecommendationBlock.module.css';

const RecommendationBlock = ({ experience }) => {
  const formattedType = experience.type === 'interview' ? '面試' : '工作';
  const createdAt = new Date(Date.parse(experience.created_at));
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth() + 1;
  const splitter = ' ・ ';
  const backable = true;
  return (
    <Link to={`/experiences/${experience._id}?${qs.stringify({ backable })}`} className={styles.container}>
      <div>
        <div className={`pS ${styles.createdDate}`}>
          {`${formattedType}${splitter}${year} 年 ${month} 月`}
        </div>

        <div className={`pMBold ${styles.heading}`}>
          { experience.title }
        </div>

        <div className={`pS ${styles.createdDate}`}>
          { experience.job_title }
        </div>
      </div>

      <div className={`pS ${styles.reaction}`}>
        <ThumbsUp count={experience.like_count} />
        <Comment count={experience.reply_count} />
      </div>
    </Link>
  );
};

RecommendationBlock.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default RecommendationBlock;
