import React, { useState } from 'react';
import styles from './ScoreRange.module.css';
import cn from 'classnames';

const scoreRange = {
  min: 0,
  max: 10,
};

const ScoreRange = ({ handleUserFeedback }) => {
  const [score, setScore] = useState(null);
  const handleScoreClick = e => {
    const newScore = Number(e.target.textContent);
    setScore(newScore);
    handleUserFeedback(newScore);
  };
  const scoreButtons = Array.from({ length: scoreRange.max + 1 }, (_, i) => (
    <button
      className={cn(styles.button, { [styles.activeButton]: score === i })}
      key={i}
      onClick={handleScoreClick}
    >
      {i}
    </button>
  ));

  return (
    <div className={styles.range}>
      <div className={styles.buttons}>{scoreButtons}</div>
      <div className={styles.rangeLabels}>
        <span>完全沒幫助</span>
        <span>非常有幫助</span>
      </div>
    </div>
  );
};

export default ScoreRange;
