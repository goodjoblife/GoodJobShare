import React, { Component, PropTypes } from 'react';

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
      <section>
        <div className={`pS ${styles.heading}`}>
          <div>
            <span className={`pMBold ${styles.serialNo}`}>
              {`${reply.floor}F`}
            </span>
            {CommentBlock.formatDate(reply.created_at)}
          </div>
          {/* <div>Report</div> */}
        </div>
        <div className={`pL ${styles.comment}`}>{reply.content}</div>
        <div className={`pS ${styles.reaction}`}>
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
