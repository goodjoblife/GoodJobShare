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
  const { title, titleExplanation, section } = question;
  const isLastQuestion = questionIndex === questionList.length - 1;
  const isCompletedQuestion = questionIndex > questionList.length - 1;
  const dispatch = useDispatch();

  const handleRecordFeedback = () => {};

  const handleNextStep = () => {
    setQuestionIndex(prev => prev + 1);
  };

  const handleSubmit = useCallback(() => {
    dispatch(postUserFeedback({ npsScore: 10, content: 'test' }));
  }, [dispatch]);

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
              handleRecordFeedback={handleRecordFeedback}
            />
            <NextButton handleNext={handleNext} buttonText={buttonText} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ExpandedModal;
