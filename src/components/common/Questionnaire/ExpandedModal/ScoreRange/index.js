import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ScoreRange.module.css';

const inputRange = {
  min: 0,
  max: 10,
};

const ScoreRange = ({ handleUserFeedback }) => {
  const [score, setScore] = useState(0);
  const [rangePercentage, setRangePercentage] = useState(0);
  const ticks = Array.from({ length: inputRange.max + 1 }, (_, i) => (
    <div key={i}>{i}</div>
  ));

  const handleScoreUpdate = e => {
    const newScore = Number(e.target.value);
    const percentage = (newScore / (inputRange.max - inputRange.min)) * 100;
    setScore(newScore);
    setRangePercentage(percentage);
    handleUserFeedback(newScore);
  };

  return (
    <div className={styles.range}>
      <input
        type="range"
        min={inputRange.min}
        max={inputRange.max}
        value={score}
        step={1}
        onChange={handleScoreUpdate}
        onClick={handleScoreUpdate}
        onTouchStart={handleScoreUpdate}
        style={{
          background: `linear-gradient(to right, #fcd406 ${rangePercentage}%, #C5C5C5 ${rangePercentage}%)`,
        }}
      />
      <div className={styles.ticks}>{ticks}</div>
      <div className={styles.rangeLabels}>
        <span>完全沒幫助</span>
        <span>非常有幫助</span>
      </div>
    </div>
  );
};

ScoreRange.propTypes = {
  handleUserFeedback: PropTypes.func.isRequired,
};

export default ScoreRange;
