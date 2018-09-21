import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Bookmark } from 'common/icons';
import { Heading, P } from 'common/base';
import Modal from 'common/Modal';
import styles from './ShareBlockElement.module.css';

const ShareBlock = ({
  options,
  type,
  heading,
  to,
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
          {type === '薪時' ? (
            <Link
              to={`/time-and-salary/company/${encodeURIComponent(
                to
              )}/work-time-dashboard`}
              title="檢視薪時"
              className="hoverBlue"
            >
              {heading}
              {position && <span> - {position}</span>}
            </Link>
          ) : (
            <Link to={to} title="檢視文章" className="hoverBlue">
              {heading}
              {position && <span> - {position}</span>}
            </Link>
          )}
          {archive &&
            archive.is_archived && (
              <span className={cn(styles.badge, styles.archive)}>已封存</span>
            )}
        </Heading>
      )}
    </div>
    {(archive &&
      archive.is_archived && (
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
  options: PropTypes.object,
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  position: PropTypes.string,
  comment: PropTypes.string,
  disabled: PropTypes.bool,
  publishHandler: PropTypes.func.isRequired,
  archive: PropTypes.shape({
    is_archived: PropTypes.bool,
    reason: PropTypes.string,
  }),
  isArchiveModalOpen: PropTypes.bool.isRequired,
  setArchiveModalOpen: PropTypes.func.isRequired,
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
