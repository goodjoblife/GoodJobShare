import React from 'react';

import Checkbox from '../common/form/Checkbox';
import CommentBlock from './CommentBlock';

import styles from './MessageBoard.module.css';

const MessageBoard = () => (
  <div className={styles.container}>
    <div className="formLabel">共 3 則回應</div>
    <hr />
    <textarea rows="5" placeholder="寫下您的留言、意見" />
    <div className={`formLabel ${styles.termsOfService}`}>
      <Checkbox
        id="termsOfService" value="agree"
        label="我分享的是真實資訊，並且遵守中華民國法律以及本站使用者條款。"
        onChange={() => {}} checked={false}
      />
      <button>發佈留言</button>
    </div>
    <div className={styles.commentBlocks}>
      <CommentBlock className={styles.test} />
      <CommentBlock />
      <CommentBlock />
    </div>
  </div>
);

export default MessageBoard;
