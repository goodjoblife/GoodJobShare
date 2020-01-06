import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import R from 'ramda';
import i from 'common/icons';
import { P } from 'common/base';
import useIsLogin from 'hooks/useIsLogin';
import useFacebookLogin from 'hooks/login/useFacebookLogin';
import useGetLike from '../hooks/useGetLike';
import useToggleLike from '../hooks/useToggleLike';
import styles from './LikeZone.module.css';

// count 是 number，不能使用 `count && xxx`，否則 count = 0 會有問題
const ThumbsUp = ({ onClick, label, count, ...restProps }) => (
  <button onClick={onClick} {...restProps}>
    <i.Like className={styles.icon} />
    {label && <div className={styles.label}>{label}</div>}
    {count !== undefined && count > 0 ? (
      <div className={styles.count}>{count}</div>
    ) : null}
  </button>
);

const LikeZone = ({ experienceId }) => {
  const [likeState, getLike] = useGetLike(experienceId);
  useEffect(() => {
    getLike();
  }, [getLike]);

  const toggleLike = useToggleLike(experienceId);

  const isLogin = useIsLogin();
  const facebookLogin = useFacebookLogin();

  const like_count = R.path(['experience', 'like_count'])(likeState.value);
  const liked = R.path(['experience', 'liked'])(likeState.value);

  return (
    <div className={styles.likeZone}>
      <P center className={styles.description} size="l">
        按讚或留言，鼓勵作者分享經驗的勇氣吧～
      </P>
      <ThumbsUp
        label="好"
        count={like_count}
        onClick={async () => {
          if (!isLogin) {
            await facebookLogin();
          }
          try {
            await toggleLike(liked);
          } catch (e) {}

          await getLike();
        }}
        className={cn(styles.button, { [styles.toggled]: liked })}
      />
    </div>
  );
};

LikeZone.propTypes = {
  experienceId: PropTypes.string.isRequired,
};

export default LikeZone;
