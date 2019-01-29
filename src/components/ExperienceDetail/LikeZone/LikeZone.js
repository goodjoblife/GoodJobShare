import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import i from 'common/icons';
import authStatusConstant from '../../../constants/authStatus';
import styles from './LikeZone.module.css';

const renderLabel = label => {
  if (typeof label === 'undefined') {
    return null;
  }
  return <div className={styles.label}>{label}</div>;
};

const renderCount = count => {
  if (typeof count === 'undefined') {
    return null;
  }
  return <div className={styles.count}>{count}</div>;
};

const ThumbsUp = ({ onClick, toggled, label, count, ...restProps }) => (
  <div className={styles.button} onClick={onClick} {...restProps}>
    <i.Like className={cn({ [styles.toggled]: toggled })} />
    {renderLabel(label)}
    {renderCount(count)}
  </div>
);

const LikeZone = ({ likeExperience, experience, login, authStatus, FB }) => (
  <div className={styles.likeZone}>
    <div className={styles.description}>
      覺得這篇面試分享很實用的話，不妨點個讚或留言，
      <br />
      讓原作者知道，才會有更多經驗分享哦！
    </div>
    <ThumbsUp
      label="好"
      count={experience.like_count >= 0 ? experience.like_count : 0}
      toggled={experience.liked}
      onClick={() => {
        if (authStatus !== authStatusConstant.CONNECTED) {
          login(FB).then(() => likeExperience(experience));
        } else {
          likeExperience(experience);
        }
      }}
      className={styles.button}
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
