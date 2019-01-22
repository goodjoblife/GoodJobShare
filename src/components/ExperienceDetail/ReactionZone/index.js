import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scroller } from 'react-scroll';

import Comment from 'common/reaction/Comment';
import { COMMENT_ZONE } from '../../../constants/formElements';
import styles from './ReactionZone.module.css';

class ReactionZone extends Component {
  static propTypes = {
    experience: PropTypes.object.isRequired,
  };

  onClickCommentButton = () => {
    scroller.scrollTo(COMMENT_ZONE, {
      duration: 1000,
      offset: -100,
      smooth: true,
    });
  };

  render() {
    const { experience } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.left}>
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
