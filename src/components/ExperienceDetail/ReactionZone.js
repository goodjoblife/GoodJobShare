import React, { PropTypes } from 'react';

import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import ReportDetail from 'common/reaction/ReportDetail';
import PopoverToggle from 'common/PopoverToggle';
// import { Facebook } from 'common/icons';
import ReactionZoneOtherOptions from './ReactionZoneOtherOptions';
import ReportInspectModal from './ReportInspectModal';
import authStatusConstant from '../../constants/authStatus';
import styles from './ReactionZone.module.css';

class ReactionZone extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    experience: PropTypes.object.isRequired,
    likeExperience: PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired,
    authStatus: React.PropTypes.string,
    FB: React.PropTypes.object,
    openReportDetail: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.toggleReportInspectModal = this.toggleReportInspectModal.bind(this);
  }

  state = {
    isInspectReportOpen: false,
  }

  toggleReportInspectModal() {
    this.setState({ isInspectReportOpen: !this.state.isInspectReportOpen });
  }

  render() {
    const { id, likeExperience, experience, login, authStatus, FB, openReportDetail } = this.props;
    const { isInspectReportOpen } = this.state;
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
          />
          {/* <div className={styles.share}>
            分享
            <button className={styles.button}><Facebook /></button>
          </div> */}
        </div>
        <div className={styles.right}>
          <ReportDetail
            label="檢舉"
            onClick={openReportDetail}
            className={styles.button}
          />
          <PopoverToggle
            className={styles.moreButton}
            popoverClassName={styles.popover}
            popoverContent={(
              <ReactionZoneOtherOptions
                toggleReportInspectModal={this.toggleReportInspectModal}
              />
            )}
          >
            <div className={styles.popoverIcon}>
              <span />
            </div>
          </PopoverToggle>
        </div>
        <ReportInspectModal
          id={id}
          isOpen={isInspectReportOpen}
          toggleReportInspectModal={this.toggleReportInspectModal}
        />
      </div>
    );
  }
}

export default ReactionZone;
