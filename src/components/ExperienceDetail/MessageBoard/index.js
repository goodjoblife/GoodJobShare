import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'common/button/Button';
import Checkbox from 'common/form/Checkbox';
import { P } from 'common/base';
import CommentBlock from '../../../containers/ExperienceDetail/CommentBlock';
import authStatusConstant from '../../../constants/authStatus';

import styles from './MessageBoard.module.css';

class MessageBoard extends Component {
  state = {
    comment: '',
    isTermsAccepted: false,
  };

  handleTermsAcceptedChange = () => {
    this.setState({
      isTermsAccepted: !this.state.isTermsAccepted,
    });
  };

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value,
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
    const { isTermsAccepted, comment } = this.state;

    return (
      <div className={styles.container}>
        <P size="m">共 {replies.length} 則回應</P>
        <hr />
        <textarea
          rows="5"
          placeholder="寫下您的留言、意見"
          value={comment}
          onChange={this.handleCommentChange}
        />
        <div className={`formLabel ${styles.termsOfService}`}>
          <Checkbox
            id="termsOfService"
            value="agree"
            label={
              <p style={{ color: '#3B3B3B' }}>
                我分享的是真實資訊，並且遵守本站
                <Link
                  to="/guidelines"
                  target="_blank"
                  style={{ color: '#02309E' }}
                >
                  發文留言規定
                </Link>
                、
                <Link
                  to="/user-terms"
                  target="_blank"
                  style={{ color: '#02309E' }}
                >
                  使用者條款
                </Link>
                以及中華民國法律。
              </p>
            }
            onChange={this.handleTermsAcceptedChange}
            checked={isTermsAccepted}
            style={{ display: 'flex', justifyContent: 'center' }}
          />
          <Button
            btnStyle="submit"
            disabled={!isTermsAccepted || !comment}
            onClick={this.handleSubmitComment}
          >
            {authStatus === authStatusConstant.CONNECTED
              ? '發佈留言'
              : '以  f  認證，發佈留言'}
          </Button>
        </div>
        <div className={styles.commentBlocks}>
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
