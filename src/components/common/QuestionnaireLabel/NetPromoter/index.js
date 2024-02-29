import React, { useCallback, useState } from 'react';
import styles from './NetPromoter.module.css';
import { ScoreRange } from './ScoreRange';
import { Question } from './Question';
import { NextStepButton } from './NextStepButton';

const questionList = [
  {
    id: 1,
    title: '你認為 GoodJob 網站對你找工作有幫助嗎？',
    titleExplanation: null,
    section: <ScoreRange />,
  },
  {
    id: 2,
    title: '你認為 GoodJob 有哪些地方可以做得更好嗎？',
    titleExplanation: '(e.g.新增ＯＯ功能，優化ＸＸ功能)',
    section: null,
  },
];

const NetPromoter = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const question = questionList[questionIndex];
  const { title, titleExplanation, section } = question;
  const isLastQuestion = questionIndex === questionList.length - 1;

  const handleNext = useCallback(() => {
    setQuestionIndex(prev => prev + 1);
  }, [setQuestionIndex]);

  const handleCloseQuestion = () => {
    setIsShowQuestion(false);
  };

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

export default NetPromoter;
