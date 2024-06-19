import React, { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ExpandedModal.module.css';
import Question from './Question';
import NextButton from './NextButton';
import questionList from './questionList';
import AppreciationContent from './AppreciationContent';
import { postUserFeedback } from 'actions/userFeedback';
import { useDispatch } from 'react-redux';
import { LS_USER_FEEDBACK_SUBMISSION_TIME_KEY } from 'constants/localStorageKey';
import { useLocalStorage } from 'react-use';

const ExpandedModal = ({ handleToggleModalOpen }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questionList[questionIndex] || {};
  const {
    title,
    titleExplanation,
    section,
    defaultFeedback = {},
    isRequired,
  } = question;
  const { key, value } = defaultFeedback;
  const [userFeedback, setUserFeedback] = useState({ [key]: value });
  const isLastQuestion = questionIndex === questionList.length - 1;
  const isCompletedQuestion = questionIndex > questionList.length - 1;
  const dispatch = useDispatch();
  const [, setLocalStorageValue] = useLocalStorage(
    LS_USER_FEEDBACK_SUBMISSION_TIME_KEY,
  );
  const [hasEditedRequired, setEditedRequired] = useState(false);

  const handleNextStep = () => {
    setQuestionIndex(prev => prev + 1);
  };

  const handleUserFeedback = useCallback(
    feedback => {
      setUserFeedback(prev => ({ ...prev, [key]: feedback }));
      if (isRequired) setEditedRequired(true);
    },
    [isRequired, key],
  );

  const handleSubmit = useCallback(async () => {
    const lastSubmissionTime = new Date().getTime();
    setLocalStorageValue(lastSubmissionTime);
    await dispatch(postUserFeedback({ ...userFeedback }));
  }, [dispatch, setLocalStorageValue, userFeedback]);

  const handleNext = useCallback(() => {
    if (isLastQuestion) handleSubmit();
    handleNextStep();
  }, [handleSubmit, isLastQuestion]);

  const buttonText = isLastQuestion ? '送出' : '下一步';

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button
          className={styles.closeButton}
          onClick={handleToggleModalOpen}
        ></button>
        {isCompletedQuestion ? (
          <AppreciationContent />
        ) : (
          <Fragment>
            <Question
              title={title}
              titleExplanation={titleExplanation}
              section={section}
              onChange={handleUserFeedback}
              isRequired={isRequired}
            />
            <NextButton
              handleNext={handleNext}
              buttonText={buttonText}
              isEnabled={hasEditedRequired}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

ExpandedModal.propTypes = {
  handleToggleModalOpen: PropTypes.func.isRequired,
};

ExpandedModal.defaultProps = {
  handleToggleModalOpen: () => {},
};

export default ExpandedModal;
