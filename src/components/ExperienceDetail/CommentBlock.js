import React, { Component, PropTypes } from 'react';
import { P } from 'common/base';
import ThumbsUp from '../common/reaction/ThumbsUp';

import styles from './CommentBlock.module.css';

class CommentBlock extends Component {
  static propTypes = {
    reply: PropTypes.object.isRequired,
    likeReply: PropTypes.func.isRequired,
  }

  static formatDate = d => {
    const date = new Date(Date.parse(d));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} 年 ${month} 月 ${day} 日`;
  };

  constructor() {
    super();
    this.likeReply = this.likeReply.bind(this);
  }

  likeReply() {
    const { reply, likeReply } = this.props;
    likeReply(reply);
  }

  render() {
    const { reply } = this.props;

    return (
      <section className={styles.container}>
        <div className={styles.heading}>
          <P size="m" bold className={styles.serialNo}>
            {`${reply.floor + 1}F`}
          </P>
          <P size="s">{CommentBlock.formatDate(reply.created_at)}</P>
        </div>
        <P size="m" className={styles.comment}>{reply.content}</P>
        <div className={styles.reaction}>
          <ThumbsUp
            count={reply.like_count}
            toggled={reply.liked}
            onClick={this.likeReply}
          />
        </div>
      </section>
    );
  }
}

export default CommentBlock;
