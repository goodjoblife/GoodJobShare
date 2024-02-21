import React, { useState } from 'react';
import styles from './NetPromoter.module.css';
import laborImage from './laborImage.png';

const ScoreRange = () => {
  const [score, setScore] = useState(5);
  const ticks = Array.from({ length: 11 }, (_, i) => (
    <div key={i} className="tick">
      {i}
    </div>
  ));

  return (
    <div className={styles.range}>
      <div className={styles.ticks}>{ticks}</div>
      <input
        type="range"
        min={0}
        max={10}
        value={score}
        step={1}
        onChange={e => setScore(e.target.value)}
      />
      <div className={styles.rangeLabels}>
        <span>完全沒幫助</span>
        <span>非常有幫助</span>
      </div>
    </div>
  );
};

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

const Question = ({ title, titleExplanation, section }) => {
  return (
    <React.Fragment>
      <div className={styles.question}>
        {title}
        {titleExplanation && <span>{titleExplanation}</span>}
      </div>
      {section}
    </React.Fragment>
  );
};

const NextStepButton = ({ handleNext, isLastQuestion }) => {
  const buttonText = isLastQuestion ? '送出' : '下一步';

  const handleSubmit = () => {
    console.log('handleSubmit');
  };
  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      handleNext();
      return;
    }
    handleSubmit();
  };

  return (
    <div className={styles.nextStepContainer}>
      <img src={laborImage} alt="laborImage" />
      <button onClick={handleNextQuestion} className={styles.nextStep}>
        {buttonText}
      </button>
    </div>
  );
};

const NetPromoter = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const isLastQuestion = questionIndex === questionList.length - 1;

  const handleNext = () => {
    setQuestionIndex(prev => prev + 1);
  };

  const handleCloseQuestion = () => {
    setIsShowQuestion(false);
  };

  if (!isShowQuestion) return null;

  return (
    <div className={styles.content}>
      <button
        className={styles.closeButton}
        onClick={handleCloseQuestion}
      ></button>
      {questionList.map(
        ({ title, titleExplanation, section, id }, index) =>
          questionIndex === index && (
            <Question
              key={id}
              title={title}
              titleExplanation={titleExplanation}
              section={section}
            />
          ),
      )}
      <NextStepButton handleNext={handleNext} isLastQuestion={isLastQuestion} />
    </div>
  );
};

export default NetPromoter;
