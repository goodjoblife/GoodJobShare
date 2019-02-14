import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import i from 'common/icons';
import authStatusConstant from '../../../constants/authStatus';
import styles from './LikeZone.module.css';
import { P } from 'common/base';

const ThumbsUp = ({ onClick, label, count, ...restProps }) => (
  <div onClick={onClick} {...restProps}>
    <i.Like className={styles.icon} />
    {typeof label !== undefined && <div className={styles.label}>{label}</div>}
    {typeof count !== undefined && <div className={styles.count}>{count}</div>}
  </div>
);

const LikeZone = ({ likeExperience, experience, login, authStatus, FB }) => (
  <div className={styles.likeZone}>
    <P center className={styles.description} size="l">
      覺得這篇面試分享很實用的話，不妨點個讚或留言，讓原作者知道，才會有更多經驗分享哦！
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
