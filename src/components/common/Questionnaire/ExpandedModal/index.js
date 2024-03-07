import React, { Fragment, useCallback, useState } from 'react';
import styles from './NetPromoter.module.css';
import Question from './Question';
import NextStepButton from './NextStepButton';
import questionList from '../questionList';
import AppreciationContent from './AppreciationContent';

const ExpandedModal = ({ handleToggleModalOpen }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questionList[questionIndex] || {};
  const { title, titleExplanation, section } = question;
  const isLastQuestion = questionIndex === questionList.length - 1;
  const isCompletedQuestion = questionIndex > questionList.length - 1;

  const handleNext = useCallback(() => {
    setQuestionIndex(prev => prev + 1);
  }, [setQuestionIndex]);

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
            />
            <NextStepButton
              handleNext={handleNext}
              isLastQuestion={isLastQuestion}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ExpandedModal;
