import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import i from 'common/icons';
import { P } from 'common/base';
import authStatusConstant from '../../../constants/authStatus';
import styles from './LikeZone.module.css';

// count 是 number，不能使用 `count && xxx`，否則 count = 0 會有問題
const ThumbsUp = ({ onClick, label, count, ...restProps }) => (
  <button onClick={onClick} {...restProps}>
    <i.Like className={styles.icon} />
    {typeof label !== undefined && <div className={styles.label}>{label}</div>}
    {count !== undefined && count > 0 ? (
      <div className={styles.count}>{count}</div>
    ) : null}
  </button>
);

const LikeZone = ({ likeExperience, experience, login, authStatus, FB }) => (
  <div className={styles.likeZone}>
    <P center className={styles.description} size="l">
      按讚或留言，鼓勵作者分享經驗的勇氣吧～
    </P>
    <ThumbsUp
      label="好"
      count={experience.like_count >= 0 ? experience.like_count : 0}
      onClick={() => {
        if (authStatus !== authStatusConstant.CONNECTED) {
          login(FB).then(() => likeExperience(experience));
        } else {
          likeExperience(experience);
        }
      }}
      className={cn(styles.button, { [styles.toggled]: experience.liked })}
    />
  </div>
);

LikeZone.propTypes = {
  experience: PropTypes.object.isRequired,
  likeExperience: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authStatus: PropTypes.string,
  FB: PropTypes.object,
};

export default LikeZone;
