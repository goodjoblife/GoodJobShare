import React from 'react';
import PropTypes from 'prop-types';
import { P } from 'common/base';
import ThumbsUp from 'common/reaction/ThumbsUp';
import styles from './CommentBlock.module.css';

const formatDate = d => {
  const date = new Date(Date.parse(d));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} 年 ${month} 月 ${day} 日`;
};

const CommentBlock = ({ reply, toggleReplyLike }) => {
  return (
    <section className={styles.container} id={`reply-${reply._id}`}>
      <div className={styles.reaction}>
        <ThumbsUp
          count={reply.like_count}
          toggled={reply.liked}
          onClick={toggleReplyLike}
        />
      </div>
      <div className={styles.heading}>
        <P size="m" bold className={styles.serialNo}>
          {`${reply.floor + 1}F`}
        </P>
        <P size="s">{formatDate(reply.created_at)}</P>
      </div>
      <P size="m" className={styles.comment}>
        {reply.content}
      </P>
    </section>
  );
};

CommentBlock.propTypes = {
  reply: PropTypes.object.isRequired,
  toggleReplyLike: PropTypes.func.isRequired,
};

export default CommentBlock;
