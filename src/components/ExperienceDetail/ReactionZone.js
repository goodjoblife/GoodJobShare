import React from 'react';

import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import Report from 'common/reaction/Report';
import styles from './ReactionZone.module.css';

const ReactionZone = () => (
  <div className={styles.container}>
    <div className={styles.left}>
      <ThumbsUp
        fontClass="pSBold"
        count={15} label="好"
        toggled onClick={e => { console.log(e); }}
      />
      <Comment fontClass="pSBold" count={35} label="留言" />
      { /* <div>分享</div> */ }
    </div>
    <div className={styles.right}>
      <Report fontClass="pSBold" label="檢舉此篇" />
    </div>
  </div>
);

export default ReactionZone;
