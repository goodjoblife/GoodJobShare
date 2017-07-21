import React, { PropTypes } from 'react';

import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
// import { Facebook } from 'common/icons';
import styles from './ReactionZone.module.css';

const ReactionZone = ({ likeExperience, experience }) => (
  <div className={styles.container}>
    <div className={styles.left}>
      <ThumbsUp
        label="好"
        count={experience.like_count >= 0 ? experience.like_count : 0}
        toggled={experience.liked}
        onClick={() => {
          likeExperience(experience);
        }}
      />
      <Comment label="留言" count={experience.reply_count} />
      {/* <div className={styles.share}>
        分享
        <button className={styles.button}><Facebook /></button>
      </div> */}
    </div>
  </div>
);

ReactionZone.propTypes = {
  experience: PropTypes.array.isRequired,
  likeExperience: PropTypes.func.isRequired,
};

export default ReactionZone;
