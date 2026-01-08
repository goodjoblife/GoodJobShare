import React from 'react';

import useRating from './useRating';
import styles from './styles.module.css';

const seq = (from: number, to: number): number[] => {
  return Array.from({ length: to - from + 1 }, (_, i) => i + from);
};

const RatingFilter: React.FC = () => {
  const ratingToggle = useRating();
  const rating = ratingToggle[0] as number | undefined;
  const toggleRating = ratingToggle[1] as (value: number | undefined) => void;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      toggleRating(Number(value));
    } else {
      toggleRating(undefined);
    }
  };

  return (
    <div className={styles.filterContainer}>
      <span className={styles.label}>篩選：</span>
      <select
        className={styles.select}
        value={rating === undefined ? '' : rating}
        onChange={handleChange}
      >
        <option value="">全部評分</option>
        {seq(1, 5).map((value: number) => (
          <option key={value} value={value}>
            {value} 分
          </option>
        ))}
      </select>
    </div>
  );
};

export default RatingFilter;
