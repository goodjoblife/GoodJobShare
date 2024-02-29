import React, { useCallback, useState } from 'react';
import styles from './NetPromoter.module.css';
import { Question } from './Question';
import { NextStepButton } from './NextStepButton';
import { questionList } from '../questionList';

export const ExpandedModal = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const question = questionList[questionIndex];
  const { title, titleExplanation, section } = question;
  const isLastQuestion = questionIndex === questionList.length - 1;

  const handleNext = useCallback(() => {
    setQuestionIndex(prev => prev + 1);
  }, [setQuestionIndex]);

  const handleCloseQuestion = useCallback(() => {
    setIsShowQuestion(false);
  }, []);

  if (!isShowQuestion) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button
          className={styles.closeButton}
          onClick={handleCloseQuestion}
        ></button>
        <Question
          title={title}
          titleExplanation={titleExplanation}
          section={section}
        />
        <NextStepButton
          handleNext={handleNext}
          isLastQuestion={isLastQuestion}
        />
      </div>
    </div>
  );
};
