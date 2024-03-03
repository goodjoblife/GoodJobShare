import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './NetPromoter.module.css';

export const ScoreRange = () => {
  const [score, setScore] = useState(5);
  const rangeRef = useRef(null);
  const ticks = Array.from({ length: 11 }, (_, i) => <div key={i}>{i}</div>);

  const updateTrackColor = useCallback(() => {
    const min = Number(rangeRef.current.min);
    const max = Number(rangeRef.current.max);
    const percentage = ((score - min) / (max - min)) * 100;
    rangeRef.current.style.background = `linear-gradient(to right, #fcd406 ${percentage}%, #C5C5C5 ${percentage}%)`;
  }, [score]);

  const handleScoreChange = e => {
    const newScore = Number(e.target.value);
    setScore(newScore);
    updateTrackColor();
  };

  useEffect(() => {
    updateTrackColor();
  }, [score, updateTrackColor]);

  return (
    <div className={styles.range}>
      <input
        ref={rangeRef}
        type="range"
        min={0}
        max={10}
        value={score}
        step={1}
        onChange={handleScoreChange}
      />
      <div className={styles.ticks}>{ticks}</div>
      <div className={styles.rangeLabels}>
        <span>完全沒幫助</span>
        <span>非常有幫助</span>
      </div>
    </div>
  );
};
