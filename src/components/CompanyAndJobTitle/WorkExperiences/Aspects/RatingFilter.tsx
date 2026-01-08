import React from 'react';
import cn from 'classnames';

import useRating from './useRating';
import styles from './styles.module.css';

const seq = (from: number, to: number): number[] => {
  return Array.from({ length: to - from + 1 }, (_, i) => i + from);
};

const RatingFilter: React.FC = () => {
  const ratingToggle = useRating();
  const rating = ratingToggle[0] as number | undefined;
  const toggleRating = ratingToggle[1] as (value: number) => void;

  return (
    <div className={styles.filterContainer}>
      <span className={styles.label}>篩選：</span>
      <div className={styles.options}>
        {seq(1, 5).map((value: number) => {
          const label = `${value} 分`;
          const isActive = rating === value;
          return (
            <button
              key={value}
              type="button"
              className={cn(styles.optionButton, {
                [styles.active]: isActive,
              })}
              onClick={() => toggleRating(value)}
            >
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={isActive}
                readOnly
              />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RatingFilter;
