import React from 'react';

import useRating from './useRating';
import styles from './styles.module.css';
import RoundedSelect from 'common/RoundedSelect';

const seq = (from: number, to: number): number[] => {
  return Array.from({ length: to - from + 1 }, (_, i) => i + from);
};

const RatingFilter: React.FC = () => {
  const ratingToggle = useRating();
  const rating = ratingToggle[0] as number | undefined;
  const toggleRating = ratingToggle[1] as (value: number | undefined) => void;

  const handleChange = (value: string) => {
    const number = Number(value);
    if (value && !isNaN(number)) {
      toggleRating(number);
    } else {
      toggleRating(undefined);
    }
  };

  return (
    <div className={styles.filterContainer}>
      <span className={styles.label}>篩選：</span>
      <RoundedSelect
        value={rating === undefined ? '' : rating.toString()}
        onChange={handleChange}
      >
        <option value="">全部評分</option>
        {seq(1, 5).map((value: number) => (
          <option key={value} value={value}>
            {value} 分
          </option>
        ))}
      </RoundedSelect>
    </div>
  );
};

export default RatingFilter;
