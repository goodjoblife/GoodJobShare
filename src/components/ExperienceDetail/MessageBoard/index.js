import React, { useState, useEffect, Fragment } from 'react';
import { Element as ScrollElement, scroller } from 'react-scroll';
import PropTypes from 'prop-types';
import Button from 'common/button/Button';
import { P } from 'common/base';
import ButtonGroup from 'common/button/ButtonGroup';
import Loader from 'common/Loader';
import { useLogin, useFacebookLogin } from 'hooks/login';
import useFetchReplies from '../hooks/useFetchReplies';
import useLikeReply from '../hooks/useLikeReply';
import useCreateReply from '../hooks/useCreateReply';
import CommentBlock from './CommentBlock';
import styles from './MessageBoard.module.css';

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
  const [isLoggedIn] = useLogin();
  const facebookLogin = useFacebookLogin();

  const [repliesState, fetchReplies] = useFetchReplies(experienceId);

  // fetch when experienceId change
  useEffect(() => {
    fetchReplies();
  }, [fetchReplies]);

  const likeReply = useLikeReply();

  const createReply = useCreateReply(experienceId);

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
          disabled={!comment}
          onClick={async () => {
            if (!isLoggedIn) {
              await facebookLogin();
            }
            await createReply(comment);
            await fetchReplies();
            setComment('');
            scroller.scrollTo(REPLIES_BOTTOM, { smooth: true, offset: -75 });
          }}
        >
          {isLoggedIn ? '發佈留言' : '以  f  認證，發佈留言'}
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
                  if (!isLoggedIn) {
                    await facebookLogin();
                  }
                  await likeReply(reply);
                  await fetchReplies();
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
