import React from 'react';

import ThumbsUp from '../common/reaction/ThumbsUp';

import styles from './CommentBlock.module.css';

const CommentBlock = () => (
  <section>
    <div className={`pS ${styles.heading}`}>
      <div>
        <span className={`pMBold ${styles.serialNo}`}>1F</span>
        {'2016 年 11 月 22日'}
      </div>
      <div>!!!</div>
    </div>
    <div className={`pL ${styles.comment}`}>content</div>
    <div className={`pS ${styles.reaction}`}>
      <ThumbsUp count={3} toggled onClick={e => { console.log(e); }} />
    </div>
  </section>
);

export default CommentBlock;
