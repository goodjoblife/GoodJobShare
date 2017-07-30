import React, { PropTypes } from 'react';

import Button from 'common/button/Button';
import Checkbox from 'common/form/Checkbox';
import { P } from 'common/base';
import CommentBlock from '../../containers/ExperienceDetail/CommentBlock';
import authStatusConstant from '../../constants/authStatus';

import styles from './MessageBoard.module.css';

const MessageBoard = ({
  replies, likeReply, tos, comment, setTos, setComment, submitComment,
  login, authStatus, FB,
}) => (
  <div className={styles.container}>
    <P size="m">共 {replies.length} 則回應</P>
    <hr />
    <textarea
      rows="5" placeholder="寫下您的留言、意見"
      value={comment} onChange={setComment}
    />
    <div className={`formLabel ${styles.termsOfService}`}>
      <Checkbox
        id="termsOfService" value="agree"
        label="我分享的是真實資訊，並且遵守中華民國法律以及本站使用者條款。"
        onChange={setTos} checked={tos}
      />
      <Button
        btnStyle="submit"
        disabled={!tos || !comment}
        onClick={() => {
          if (authStatus !== authStatusConstant.CONNECTED) {
            login(FB).then(() => submitComment());
          } else {
            submitComment();
          }
        }}
      >
        {
          authStatus === authStatusConstant.CONNECTED ? '發佈留言' : '以  f  認證，發佈留言'
        }
      </Button>
    </div>
    <div className={styles.commentBlocks}>
      {
        (replies || []).map(o => (
          <CommentBlock key={o._id} reply={o} likeReply={likeReply} />
        ))
      }
    </div>
  </div>
);

MessageBoard.propTypes = {
  replies: PropTypes.array.isRequired,
  likeReply: PropTypes.func.isRequired,
  tos: PropTypes.bool.isRequired,
  comment: PropTypes.string.isRequired,
  setTos: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
  authStatus: React.PropTypes.string,
  FB: React.PropTypes.object,
};

export default MessageBoard;
