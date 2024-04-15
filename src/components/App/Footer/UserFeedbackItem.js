import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from 'actions/expandedModal';
import { LS_USER_FEEDBACK_SUBMISSION_TIME_KEY } from 'constants/localStorageKey';

const UserFeedbackItem = ({ className }) => {
  const dispatch = useDispatch();
  const handleOpenModal = useCallback(() => {
    localStorage.removeItem(LS_USER_FEEDBACK_SUBMISSION_TIME_KEY);
    dispatch(openModal());
  }, [dispatch]);

  return (
    <button className={className} onClick={handleOpenModal}>
      給我們回饋
    </button>
  );
};

export default UserFeedbackItem;
