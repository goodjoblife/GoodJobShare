import React from 'react';

import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import styles from './RecommendationBlock.module.css';

const RecommendationBlock = () => (
  <section className={styles.container}>
    <div>
      <div className={`pS ${styles.createdDate}`}>
        {'面試　•　2016 年 12 月'}
      </div>

      <div className={`pMBold ${styles.heading}`}>
        日月光半導體面試經驗分享
      </div>

      <div className={`pS ${styles.createdDate}`}>
        專案工程師
      </div>
    </div>

    <div className={`pS ${styles.reaction}`}>
      <ThumbsUp count={15} toggled onClick={e => { console.log(e); }} />
      <Comment count={35} />
    </div>
  </section>
);

export default RecommendationBlock;
