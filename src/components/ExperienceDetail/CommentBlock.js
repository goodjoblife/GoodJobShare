import React, { PropTypes } from 'react';

import ThumbsUp from '../common/reaction/ThumbsUp';

import styles from './CommentBlock.module.css';

const CommentBlock = ({ reply }) => (
  <section>
    <div className={`pS ${styles.heading}`}>
      <div>
        <span className={`pMBold ${styles.serialNo}`}>
          {`${reply.floor}F`}
        </span>
        {CommentBlock.formatDate(reply.created_at)}
      </div>
      <div>!!!</div>
    </div>
    <div className={`pL ${styles.comment}`}>{reply.content}</div>
    <div className={`pS ${styles.reaction}`}>
      <ThumbsUp
        count={reply.like_count}
        toggled={reply.liked}
        onClick={e => { console.log(e); }}
      />
    </div>
  </section>
);

CommentBlock.propTypes = {
  reply: PropTypes.object.isRequired,
};

CommentBlock.formatDate = d => {
  const date = new Date(Date.parse(d));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} 年 ${month} 月 ${day} 日`;
};

export default CommentBlock;
