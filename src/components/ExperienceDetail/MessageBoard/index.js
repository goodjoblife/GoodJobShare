import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Element as ScrollElement, scroller } from 'react-scroll';
import PropTypes from 'prop-types';
import Button from 'common/button/Button';
import { P } from 'common/base';
import ButtonGroup from 'common/button/ButtonGroup';
import Loader from 'common/Loader';
import useQueryReplies from '../hooks/useQueryReplies';
import useLikeReply from '../hooks/useLikeReply';
import useCreateReply from '../hooks/useCreateReply';
import CommentBlock from './CommentBlock';
import styles from './MessageBoard.module.css';
import useLoginFlow from '../hooks/useLoginFlow';

const recommendedSentences = [
  '詳細給推',
  '感謝大大無私分享',
  '蒸的很蚌',
  '真的非常謝謝你的分享！',
  '很實用！',
  '台灣的職場因為有你變得更好！',
];

const REPLIES_BOTTOM = 'REPLIES_BOTTOM';

const MessageBoard = ({ experienceId }) => {
  const [comment, setComment] = useState('');
  const createReply = useCreateReply(experienceId);
  const [repliesState, queryReplies] = useQueryReplies(experienceId);

  const submitCommentCallback = useCallback(async () => {
    await createReply(comment);
    await queryReplies();
    setComment('');
    scroller.scrollTo(REPLIES_BOTTOM, { smooth: true, offset: -75 });
  }, [comment, createReply, queryReplies]);

  const [submitComment, isSubmitting] = useLoginFlow(submitCommentCallback);

  // fetch when experienceId change
  useEffect(() => {
    queryReplies();
  }, [queryReplies]);

  const likeReply = useLikeReply();

  return (
    <div className={styles.container}>
      <textarea
        rows="5"
        placeholder="寫下您的留言、意見"
        value={comment}
        onChange={e => {
          setComment(e.target.value);
        }}
      />
      <div className={styles.recommendedSentences}>
        <ButtonGroup
          value={[]}
          options={recommendedSentences.map(v => ({ label: v, value: v }))}
          onChange={v => {
            setComment((comment ? `${comment}\n` : '') + v);
          }}
        />
      </div>
      <div className={`formLabel ${styles.termsOfService}`}>
        <Button
          btnStyle="submit"
          disabled={!comment || isSubmitting}
          onClick={() => {
            submitComment();
          }}
        >
          發佈留言
        </Button>
      </div>
      <div className={styles.commentBlocks}>
        {repliesState.loading || !repliesState.value ? (
          <Loader size="s" />
        ) : (
          <Fragment>
            <P size="m">共 {repliesState.value.length} 則回應</P>
            <hr />
            {repliesState.value.map(reply => (
              <CommentBlock
                key={reply._id}
                reply={reply}
                toggleReplyLike={async () => {
                  await likeReply(reply);
                  await queryReplies();
                }}
              />
            ))}
          </Fragment>
        )}
        <ScrollElement name={REPLIES_BOTTOM} />
      </div>
    </div>
  );
};

MessageBoard.propTypes = {
  experienceId: PropTypes.string.isRequired,
};

export default MessageBoard;
