import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { P } from 'common/base';
import ThumbsUp from 'common/reaction/ThumbsUp';
import authStatusConstant from '../../../constants/authStatus';

import styles from './CommentBlock.module.css';

class CommentBlock extends Component {
  static propTypes = {
    reply: PropTypes.object.isRequired,
    likeReply: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    authStatus: PropTypes.string,
    FB: PropTypes.object,
  };

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
    const { authStatus, login, FB, reply, likeReply } = this.props;
    if (authStatus !== authStatusConstant.CONNECTED) {
      login(FB).then(() => likeReply(reply));
    } else {
      likeReply(reply);
    }
  }

  render() {
    const { reply } = this.props;

    return (
      <section className={styles.container} id={`reply-${reply._id}`}>
        <div className={styles.reaction}>
          <ThumbsUp
            count={reply.like_count}
            toggled={reply.liked}
            onClick={this.likeReply}
          />
        </div>
        <div className={styles.heading}>
          <P size="m" bold className={styles.serialNo}>
            {`${reply.floor + 1}F`}
          </P>
          <P size="s">{CommentBlock.formatDate(reply.created_at)}</P>
        </div>
        <P size="m" className={styles.comment}>
          {reply.content}
        </P>
      </section>
    );
  }
}

export default CommentBlock;
