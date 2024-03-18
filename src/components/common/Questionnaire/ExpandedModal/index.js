import React, { Fragment, useCallback, useState } from 'react';
import styles from './NetPromoter.module.css';
import Question from './Question';
import NextButton from './NextButton';
import questionList from '../questionList';
import AppreciationContent from './AppreciationContent';
import { postUserFeedback } from 'actions/userFeedback';
import { useDispatch } from 'react-redux';

const ExpandedModal = ({ handleToggleModalOpen }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questionList[questionIndex] || {};
  const { title, titleExplanation, section, defaultFeedback = {} } = question;
  const { key, value } = defaultFeedback;
  const [userFeedback, setUserFeedback] = useState({ [key]: value });
  const isLastQuestion = questionIndex === questionList.length - 1;
  const isCompletedQuestion = questionIndex > questionList.length - 1;
  const dispatch = useDispatch();

  const handleNextStep = () => {
    setQuestionIndex(prev => prev + 1);
  };

  const handleUserFeedback = feedback => {
    setUserFeedback(prev => ({ ...prev, ...feedback }));
  };

  const handleChange = useCallback(
    (e, feedback = e.target.value) => {
      handleUserFeedback({ [key]: feedback });
    },
    [key],
  );

  const handleSubmit = useCallback(() => {
    dispatch(postUserFeedback({ ...userFeedback }));
  }, [dispatch, userFeedback]);

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      handleSubmit();
    }
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
              onChange={handleChange}
            />
            <NextButton handleNext={handleNext} buttonText={buttonText} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ExpandedModal;
