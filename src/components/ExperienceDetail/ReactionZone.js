import React, { PropTypes } from 'react';

import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import styles from './ReactionZone.module.css';

const ReactionZone = ({ likeExperience, experience }) => (
  <div className={styles.container}>
    <div className={styles.left}>
      <ThumbsUp
        fontClass="pSBold" label="好"
        count={experience.like_count >= 0 ? experience.like_count : 0}
        toggled={experience.liked}
        onClick={() => {
          likeExperience(experience);
        }}
      />
      <Comment fontClass="pSBold" count={experience.reply_count} label="留言" />
      { /* <div>分享</div> */ }
    </div>
  </div>
);

ReactionZone.propTypes = {
  experience: PropTypes.array.isRequired,
  likeExperience: PropTypes.func.isRequired,
};

export default ReactionZone;
