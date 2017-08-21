import React, { PropTypes } from 'react';

import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
// import { Facebook } from 'common/icons';
import authStatusConstant from '../../constants/authStatus';
import styles from './ReactionZone.module.css';

const ReactionZone = ({ likeExperience, experience, login, authStatus, FB }) => (
  <div className={styles.container}>
    <div className={styles.left}>
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
      />
      <Comment label="留言" count={experience.reply_count} />
      {/* <div className={styles.share}>
        分享
        <button className={styles.button}><Facebook /></button>
      </div> */}
    </div>
    <div className={styles.right}>
      <div className={styles.dropdownToggle} onClick={() => {}}>
        <span />
      </div>
    </div>
  </div>
);

ReactionZone.propTypes = {
  experience: PropTypes.object.isRequired,
  likeExperience: PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
  authStatus: React.PropTypes.string,
  FB: React.PropTypes.object,
};

export default ReactionZone;
