<<<<<<< HEAD
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  Fragment,
} from 'react';
=======
import React, { useState, useEffect, Fragment } from 'react';
>>>>>>> upstream/master
import { Element as ScrollElement, scroller } from 'react-scroll';
import PropTypes from 'prop-types';
import Button from 'common/button/Button';
import { P } from 'common/base';
import ButtonGroup from 'common/button/ButtonGroup';
<<<<<<< HEAD
import Loader from 'common/Loader';
import { useLogin } from 'hooks/login';
import LoginModalContext from 'contexts/LoginModalContext';
=======
import { useLogin, useFacebookLogin } from 'hooks/login';
import Loader from 'common/Loader';
>>>>>>> upstream/master
import useQueryReplies from '../hooks/useQueryReplies';
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

<<<<<<< HEAD
const useLoginFlow = callback => {
  const [state, setState] = useState('init');
  const [isLoggedIn] = useLogin();
  const { isLoginModalDisplayed, setLoginModalDisplayed } = useContext(
    LoginModalContext,
  );

  console.log(
    state,
    'isLoggedIn',
    isLoggedIn,
    'isLoginModalDisplayed',
    isLoginModalDisplayed,
  );

  useEffect(() => {
    if (state === 'submitting_check_logged_in' && isLoggedIn) {
      setState('submitting');
    }
  }, [callback, isLoggedIn, state]);

  useEffect(() => {
    if (state === 'submitting') {
      setState('submitting_check_api');
      callback().then(() => {
        setState('init');
      });
    }
  }, [callback, state]);

  useEffect(() => {
    if (state === 'submitting_check_logged_in' && !isLoggedIn) {
      setState('init');
    }
  }, [isLoggedIn, state]);

  useEffect(() => {
    if (state === 'submitting_open_modal' && !isLoginModalDisplayed) {
      // 當 modal 關閉，檢查登入狀態
      setState('submitting_check_logged_in');
    }
  }, [isLoginModalDisplayed, state]);

  const startFlow = useCallback(() => {
    if (!isLoggedIn) {
      setLoginModalDisplayed(true);
      setState('submitting_open_modal');
    } else {
      setState('submitting');
    }
  }, [isLoggedIn, setLoginModalDisplayed]);

  const isRunning = useMemo(() => state !== 'init', [state]);

  return [startFlow, isRunning];
};

const SubmitCommentBlock = ({ experienceId }) => {
  const [comment, setComment] = useState('');
  const createReply = useCreateReply(experienceId);
  const [, queryReplies] = useQueryReplies(experienceId);

  const submitCommentCallback = useCallback(async () => {
    await createReply(comment);
    await queryReplies();
    setComment('');
    scroller.scrollTo(REPLIES_BOTTOM, { smooth: true, offset: -75 });
  }, [comment, createReply, queryReplies]);

  const [submitComment, isSubmitting] = useLoginFlow(submitCommentCallback);

  console.log('comment', comment);
=======
const MessageBoard = ({ experienceId }) => {
  const [comment, setComment] = useState('');
  const [isLoggedIn] = useLogin();
  const facebookLogin = useFacebookLogin();
  const createReply = useCreateReply(experienceId);
  const [repliesState, queryReplies] = useQueryReplies(experienceId);

  // fetch when experienceId change
  useEffect(() => {
    queryReplies();
  }, [queryReplies]);

  const likeReply = useLikeReply();
>>>>>>> upstream/master

  return (
    <Fragment>
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
<<<<<<< HEAD
          disabled={!comment || isSubmitting}
          onClick={() => {
            submitComment();
=======
          disabled={!comment}
          onClick={async () => {
            if (!isLoggedIn) {
              await facebookLogin();
            }
            await createReply(comment);
            await queryReplies();
            setComment('');
            scroller.scrollTo(REPLIES_BOTTOM, { smooth: true, offset: -75 });
>>>>>>> upstream/master
          }}
        >
          發佈留言
        </Button>
      </div>
    </Fragment>
  );
};

const MessageBoard = ({ experienceId }) => {
  const [repliesState, queryReplies] = useQueryReplies(experienceId);

  // fetch when experienceId change
  useEffect(() => {
    queryReplies();
  }, [queryReplies]);

  const likeReply = useLikeReply();

  return (
    <div className={styles.container}>
      <SubmitCommentBlock experienceId={experienceId} />
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
