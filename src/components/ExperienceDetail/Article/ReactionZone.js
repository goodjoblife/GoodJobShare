import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Like from 'common/icons/Like';
import Comment from 'common/icons/Comment';
import styles from './ReactionZone.module.css';
import useQueryLike from '../hooks/useQueryLike';
import useToggleLike from '../hooks/useToggleLike';
import useLoginFlow from '../hooks/useLoginFlow';
import ReportDialog from 'components/CompanyAndJobTitle/TimeAndSalary/ReportDialog';
import ReportModal from '../ReportModal';

const ReactionButton = ({ className, Icon, active, children, ...props }) => (
  <button
    className={cn(
      styles.reactionButton,
      { [styles.active]: !!active },
      className,
    )}
    {...props}
  >
    {Icon && <Icon className={cn(styles.icon)} />}
    {children}
  </button>
);

ReactionButton.propTypes = {
  Icon: PropTypes.func,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

const ReactionZone = ({ experienceId, onClickMsgButton, reportCount }) => {
  // use state to quick response to toggle
  const [liked, setLiked] = useState(false);

  const [likeState, queryLike] = useQueryLike(experienceId);

  const toggleLike = useToggleLike(experienceId);
  const handleLikeCallback = useCallback(async () => {
    setLiked(!liked);
    await toggleLike(liked);
    await queryLike();
  }, [liked, queryLike, toggleLike]);
  const [handleLike] = useLoginFlow(handleLikeCallback);

  useEffect(() => {
    queryLike();
  }, [queryLike]);

  // update state when api ready
  useEffect(() => {
    if (!likeState.loading) {
      setLiked(likeState.value ? true : false);
    }
  }, [likeState.loading, likeState.value]);

  return (
    <div className={styles.reactionZone}>
      <ReactionButton
        className={styles.reactionButton}
        Icon={Like}
        active={liked}
        onClick={handleLike}
      >
        覺得實用
      </ReactionButton>
      <ReactionButton
        className={styles.reactionButton}
        Icon={Comment}
        onClick={onClickMsgButton}
      >
        留言
      </ReactionButton>
      <ReportModal>
        <ReactionButton className={styles.report}>
          <ReportDialog
            reportCount={reportCount}
            isHighlighted={reportCount > 0}
            isShowReportText
            reportText="回報"
          />
        </ReactionButton>
      </ReportModal>
    </div>
  );
};

ReactionZone.propTypes = {
  experienceId: PropTypes.string.isRequired,
  onClickMsgButton: PropTypes.func.isRequired,
  reportCount: PropTypes.number,
};

export default ReactionZone;
