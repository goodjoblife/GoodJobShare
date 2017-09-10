import React, { PropTypes } from 'react';

import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import styles from './RecommendationBlock.module.css';

const RecommendationBlock = ({ experience }) => (
  <section className={styles.container}>
    <div>
      <div className={`pS ${styles.createdDate}`}>
        { experience.type === 'interview' ? '面試' : '工作' }
      </div>

      <div className={`pMBold ${styles.heading}`}>
        { experience.title }
      </div>

      <div className={`pS ${styles.createdDate}`}>
        { experience.job_title }
      </div>
    </div>

    <div className={`pS ${styles.reaction}`}>
      <ThumbsUp count={experience.like_count} toggled onClick={e => { console.log(e); }} />
      <Comment count={experience.reply_count} />
    </div>
  </section>
);

RecommendationBlock.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default RecommendationBlock;
