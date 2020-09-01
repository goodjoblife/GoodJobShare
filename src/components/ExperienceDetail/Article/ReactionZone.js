import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import cn from 'classnames';
import i from 'common/icons';
import styles from './ReactionZone.module.css';

import useGetLike from '../hooks/useGetLike';
import useToggleLike from '../hooks/useToggleLike';
import useLogin from 'hooks/useLogin';

const ReactionButton = ({ className, Icon, active, children, ...props }) => (
  <button
    className={cn(
      styles.reactionButton,
      { [styles.active]: !!active },
      className,
    )}
    {...props}
  >
    <Icon className={cn(styles.icon)} /> {children}
  </button>
);

ReactionButton.propTypes = {
  className: PropTypes.string,
  Icon: PropTypes.func.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node,
};

const ReactionZone = ({ experienceId, onClickMsgButton }) => {
  const [likeState, getLike] = useGetLike(experienceId);
  const hasLiked = R.path(['experience', 'liked'])(likeState.value);
  const toggleLike = useToggleLike(experienceId);

  const [hasLoggedIn, loginModal, login] = useLogin();
  const handleLike = useCallback(async () => {
    if (!hasLoggedIn) await login();
    try {
      await toggleLike(hasLiked);
    } catch (e) {}

    await getLike();
  }, [getLike, hasLiked, hasLoggedIn, login, toggleLike]);
  useEffect(() => {
    getLike();
  }, [getLike]);

  return (
    <div className={styles.reactionZone}>
      <ReactionButton
        className={styles.reactionButton}
        Icon={i.Like}
        active={hasLiked}
        onClick={handleLike}
      >
        覺得實用
      </ReactionButton>
      <ReactionButton
        className={styles.reactionButton}
        Icon={i.Comment}
        onClick={onClickMsgButton}
      >
        留言
      </ReactionButton>
      {loginModal}
    </div>
  );
};

ReactionZone.propTypes = {
  experienceId: PropTypes.string.isRequired,
  onClickMsgButton: PropTypes.func.isRequired,
};

export default ReactionZone;
