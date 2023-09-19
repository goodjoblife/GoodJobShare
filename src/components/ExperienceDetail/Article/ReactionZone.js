import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import i from 'common/icons';
import { useLogin } from 'hooks/login';
import styles from './ReactionZone.module.css';
import useQueryLike from '../hooks/useQueryLike';
import useToggleLike from '../hooks/useToggleLike';

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
  const [likeState, queryLike] = useQueryLike(experienceId);

  const hasLiked = likeState.value ? true : false;
  const toggleLike = useToggleLike(experienceId);

  const [hasLoggedIn, login] = useLogin();
  const handleLike = useCallback(async () => {
    if (!hasLoggedIn) {
      await login();
      return;
    }
    try {
      await toggleLike(hasLiked);
    } catch (e) {}

    await queryLike();
  }, [hasLiked, hasLoggedIn, login, queryLike, toggleLike]);

  useEffect(() => {
    queryLike();
  }, [queryLike]);

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
    </div>
  );
};

ReactionZone.propTypes = {
  experienceId: PropTypes.string.isRequired,
  onClickMsgButton: PropTypes.func.isRequired,
};

export default ReactionZone;
