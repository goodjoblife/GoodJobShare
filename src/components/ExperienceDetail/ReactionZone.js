import React, { PropTypes } from 'react';

import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import PopoverToggle from 'common/Popover/PopoverToggle';
// import { Facebook } from 'common/icons';
import ReportInspectModal from './ReportInspectModal';
import authStatusConstant from '../../constants/authStatus';
import styles from './ReactionZone.module.css';

const Dropdown = ({ toggleReportInspectModal }) => (
  <ul className={styles.dropdownItem}>
    <li onClick={toggleReportInspectModal}>查看檢舉數量</li>
  </ul>
);

Dropdown.propTypes = {
  toggleReportInspectModal: PropTypes.func.isRequired,
};

class ReactionZone extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    experience: PropTypes.object.isRequired,
    likeExperience: PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired,
    authStatus: React.PropTypes.string,
    FB: React.PropTypes.object,
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
    const { id, likeExperience, experience, login, authStatus, FB } = this.props;
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
          />
          <Comment label="留言" count={experience.reply_count} />
          {/* <div className={styles.share}>
            分享
            <button className={styles.button}><Facebook /></button>
          </div> */}
        </div>
        <div className={styles.right}>
          <PopoverToggle
            className={styles.dropdownToggle}
            popoverClassName={styles.dropdown}
            popoverContent={(
              <Dropdown toggleReportInspectModal={this.toggleReportInspectModal} />
            )}
          >
            <span />
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
