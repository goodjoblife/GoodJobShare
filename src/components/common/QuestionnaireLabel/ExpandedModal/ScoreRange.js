import React, { useState } from 'react';
import styles from './NetPromoter.module.css';

export const ScoreRange = () => {
  const [score, setScore] = useState(5);
  const handleScoreChange = e => setScore(e.target.value);
  const ticks = Array.from({ length: 11 }, (_, i) => <div key={i}>{i}</div>);

  return (
    <div className={styles.range}>
      <div className={styles.ticks}>{ticks}</div>
      <input
        type="range"
        min={0}
        max={10}
        value={score}
        step={1}
        onChange={handleScoreChange}
      />
      <div className={styles.rangeLabels}>
        <span>完全沒幫助</span>
        <span>非常有幫助</span>
      </div>
    </div>
  );
};
