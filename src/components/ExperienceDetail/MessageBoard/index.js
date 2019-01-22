import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'common/button/Button';
import { P } from 'common/base';
import CommentBlock from '../../../containers/ExperienceDetail/CommentBlock';
import authStatusConstant from '../../../constants/authStatus';
import ButtonGroup from 'common/button/ButtonGroup';

import styles from './MessageBoard.module.css';

const recommendedSentences = ['詳細給推', '感謝大大無私分享'];

class MessageBoard extends Component {
  state = {
    comment: '',
  };

  updateComment = comment => {
    this.setState({
      comment,
    });
  };

  handleSubmitComment = () => {
    const { submitComment, login, authStatus, FB } = this.props;
    const { comment } = this.state;

    if (authStatus !== authStatusConstant.CONNECTED) {
      login(FB).then(() => submitComment(comment));
    } else {
      submitComment(comment);
    }
  };

  render() {
    const { replies, likeReply, authStatus } = this.props;
    const { comment } = this.state;

    return (
      <div className={styles.container}>
        <textarea
          rows="5"
          placeholder="寫下您的留言、意見"
          value={comment}
          onChange={e => {
            this.updateComment(e.target.value);
          }}
        />
        <div className={styles.recommendedSentences}>
          <ButtonGroup
            value={[]}
            options={recommendedSentences.map(v => ({ label: v, value: v }))}
            onChange={v => {
              this.updateComment((comment ? `${comment}\n` : '') + v);
            }}
          />
        </div>
        <div className={`formLabel ${styles.termsOfService}`}>
          <Button
            btnStyle="submit"
            disabled={!comment}
            onClick={this.handleSubmitComment}
          >
            {authStatus === authStatusConstant.CONNECTED
              ? '發佈留言'
              : '以  f  認證，發佈留言'}
          </Button>
        </div>
        <div className={styles.commentBlocks}>
          <P size="m">共 {replies.length} 則回應</P>
          <hr />
          {replies.map(reply => (
            <CommentBlock key={reply._id} reply={reply} likeReply={likeReply} />
          ))}
        </div>
      </div>
    );
  }
}

MessageBoard.propTypes = {
  replies: PropTypes.array.isRequired,
  likeReply: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authStatus: PropTypes.string,
  FB: PropTypes.object,
};

export default MessageBoard;
