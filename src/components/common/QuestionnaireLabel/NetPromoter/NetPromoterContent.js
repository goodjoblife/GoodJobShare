import React, { useState } from 'react';
import styles from './NetPromoter.module.css';

const Question1 = ({ handleNext }) => {
  const [score, setScore] = useState(5);
  const ticks = Array.from({ length: 11 }, (_, i) => (
    <div key={i} className="tick">
      {i}
    </div>
  ));

  return (
    <React.Fragment>
      <div className={styles.question}>
        1. 你認為 GoodJob 網站對你找工作有幫助嗎？
      </div>
      <div className={styles.range}>
        <div className={styles.ticks}>{ticks}</div>
        <input
          type="range"
          className="min"
          min={0}
          max={10}
          value={score}
          step={1}
          onChange={e => setScore(e.target.value)}
        />
        <div class={styles.rangeLabels}>
          <span>完全沒幫助</span>
          <span>非常有幫助</span>
        </div>
      </div>
      <div className={styles.nextStepContainer}>
        <button onClick={handleNext} className={styles.nextStep}>
          下一步
        </button>
      </div>
    </React.Fragment>
  );
};

const Question2 = () => {
  return (
    <React.Fragment>
      <div className={styles.question}>
        2. 你認為 GoodJob 有哪些地方可以做得更好嗎？ (e.g.
        新增ＯＯ功能，優化ＸＸ功能）
      </div>
    </React.Fragment>
  );
};

const NetPromoterContent = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const handleNext = () => {
    setQuestionNumber(prev => prev + 1);
  };

  return (
    <div className={styles.content}>
      <button className={styles.closeButton}></button>
      {
        {
          1: <Question1 handleNext={handleNext} />,
          2: <Question2 handleNext={handleNext} />,
        }[questionNumber]
      }
    </div>
  );
};

export default NetPromoterContent;
