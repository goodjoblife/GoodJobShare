import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scroller } from 'react-scroll';

import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import authStatusConstant from '../../../constants/authStatus';
import { COMMENT_ZONE } from '../../../constants/formElements';
import styles from './ReactionZone.module.css';

class ReactionZone extends Component {
  static propTypes = {
    experience: PropTypes.object.isRequired,
    likeExperience: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    authStatus: PropTypes.string,
    FB: PropTypes.object,
  };

  onClickCommentButton = () => {
    scroller.scrollTo(COMMENT_ZONE, {
      duration: 1000,
      offset: -100,
      smooth: true,
    });
  };

  render() {
    const { likeExperience, experience, login, authStatus, FB } = this.props;
    return (
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
            className={styles.button}
          />
          <Comment
            label="留言"
            count={experience.reply_count}
            className={styles.button}
            onClick={this.onClickCommentButton}
          />
        </div>
      </div>
    );
  }
}

export default ReactionZone;
