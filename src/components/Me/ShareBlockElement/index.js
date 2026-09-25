import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { Heading, P } from 'common/base';
import Bookmark from 'common/icons/Bookmark';
import Modal from 'common/Modal';
import { generateTabURL, PageType, TabType } from 'constants/companyJobTitle';

import styles from './ShareBlockElement.module.css';

const HeadingLabel = ({ heading, position }) => (
  <React.Fragment>
    {heading}
    {position && <span> - {position}</span>}
  </React.Fragment>
);
HeadingLabel.propTypes = {
  heading: PropTypes.string.isRequired,
  position: PropTypes.string,
};

// 沒有獨立頁面的資料型態（如制度）用 onHeadingClick 開彈窗，其餘導去該筆資料的頁面
const HeadingAction = ({ type, to, onHeadingClick, heading, position }) => {
  if (onHeadingClick) {
    return (
      <button
        className={cn(styles.headingButton, 'hoverBlue')}
        onClick={onHeadingClick}
        title="檢視內容"
      >
        <HeadingLabel heading={heading} position={position} />
      </button>
    );
  }

  if (type === '薪時') {
    return (
      <Link
        to={generateTabURL({
          pageType: PageType.COMPANY,
          pageName: to,
          tabType: TabType.TIME_AND_SALARY,
        })}
        title="檢視薪時"
        className="hoverBlue"
      >
        <HeadingLabel heading={heading} position={position} />
      </Link>
    );
  }

  return (
    <Link to={to} title="檢視文章" className="hoverBlue">
      <HeadingLabel heading={heading} position={position} />
    </Link>
  );
};
HeadingAction.propTypes = {
  heading: PropTypes.string.isRequired,
  onHeadingClick: PropTypes.func,
  position: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string.isRequired,
};

const ShareBlock = ({
  options,
  type,
  heading,
  to,
  onHeadingClick,
  position,
  comment,
  disabled,
  publishHandler,
  archive,
  isArchiveModalOpen,
  setArchiveModalOpen,
}) => (
  <section
    className={cn(styles.block, {
      [styles.disabled]: disabled,
    })}
  >
    <div className={styles.type}>
      <span className={styles.badge}>{type}</span>
    </div>
    <div className={styles.content}>
      {type === '留言' ? (
        <div>
          <P size="l" Tag="h3">
            {comment}
          </P>
          {heading && (
            <P size="l" bold className={styles.articleLink}>
              <Bookmark />
              <Link
                to={{ pathname: to, query: { backable: true }, state: options }}
                title="檢視文章"
                className="hoverBlue"
              >
                {heading}
              </Link>
            </P>
          )}
        </div>
      ) : (
        <Heading size="sl" Tag="h3">
          <HeadingAction
            type={type}
            to={to}
            onHeadingClick={onHeadingClick}
            heading={heading}
            position={position}
          />
          {archive && archive.is_archived && (
            <span className={cn(styles.badge, styles.archive)}>已封存</span>
          )}
        </Heading>
      )}
    </div>
    {(archive && archive.is_archived && (
      <div className={styles.buttons}>
        <button
          className="buttonCircleS buttonBlack2"
          onClick={() => setArchiveModalOpen(true)}
        >
          封存理由
        </button>
        <Modal
          isOpen={isArchiveModalOpen}
          close={() => setArchiveModalOpen(false)}
          closableOnClickOutside
        >
          {archive.reason}
        </Modal>
      </div>
    )) || (
      <div className={styles.buttons}>
        <button className="buttonCircleS buttonBlack2" onClick={publishHandler}>
          {disabled ? '重新發佈' : '隱藏'}
        </button>
      </div>
    )}
  </section>
);
ShareBlock.propTypes = {
  archive: PropTypes.shape({
    is_archived: PropTypes.bool,
    reason: PropTypes.string,
  }),
  comment: PropTypes.string,
  disabled: PropTypes.bool,
  heading: PropTypes.string.isRequired,
  isArchiveModalOpen: PropTypes.bool.isRequired,
  onHeadingClick: PropTypes.func,
  options: PropTypes.object,
  position: PropTypes.string,
  publishHandler: PropTypes.func.isRequired,
  setArchiveModalOpen: PropTypes.func.isRequired,
  to: PropTypes.string,
  type: PropTypes.string.isRequired,
};

class ShareBlockWithState extends React.Component {
  state = {
    isArchiveModalOpen: false,
  };

  setArchiveModalOpen = isOpen => {
    this.setState({
      isArchiveModalOpen: isOpen,
    });
  };

  render() {
    return (
      <ShareBlock
        {...this.props}
        isArchiveModalOpen={this.state.isArchiveModalOpen}
        setArchiveModalOpen={this.setArchiveModalOpen}
      />
    );
  }
}

export default ShareBlockWithState;
