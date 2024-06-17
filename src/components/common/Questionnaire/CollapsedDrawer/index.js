import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './CollapsedDrawer.module.css';
import { LS_USER_FEEDBACK_SUBMISSION_TIME_KEY } from 'constants/localStorageKey';
import { toggleModalOpen } from 'actions/questionnaireExpandedModal';
import { useDispatch, useSelector } from 'react-redux';

const MILLISECONDS_OF_TWO_SUBMISSION_SPAN = 1000 * 60 * 60 * 24 * 30;

const CollapsedDrawer = ({ title = '給我們回饋', children }) => {
  const isOpen = useSelector(state => state.questionnaireExpandedModal.isOpen);
  const dispatch = useDispatch();
  const handleToggleModalOpen = useCallback(() => {
    dispatch(toggleModalOpen());
  }, [dispatch]);

  if (typeof window !== 'undefined') {
    const lastSubmissionTime = Number(
      localStorage.getItem(LS_USER_FEEDBACK_SUBMISSION_TIME_KEY),
    );

    if (lastSubmissionTime) {
      const currentTime = new Date().getTime();
      const isWithin30Days =
        currentTime < lastSubmissionTime + MILLISECONDS_OF_TWO_SUBMISSION_SPAN;

      if (isWithin30Days) {
        return null;
      }
    }
  }

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { handleToggleModalOpen }),
  );

  if (isOpen) return childrenWithProps;

  return (
    <div className={styles.container} onClick={handleToggleModalOpen}>
      <div className={styles.label}>{title}</div>
    </div>
  );
};

CollapsedDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default CollapsedDrawer;
