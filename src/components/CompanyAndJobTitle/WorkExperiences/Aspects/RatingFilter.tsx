import React, { useCallback, useState } from 'react';
import { useDebounce } from 'react-use';
import cn from 'classnames';

import useRatings, { FilterOption, RATING_FILTER_OPTIONS } from './useRatings';
import styles from './styles.module.css';

const useRatingsToggle = () => {
  const [queryRatings, setQueryRatings] = useRatings();
  const [ratings, setRatings] = useState<number[]>(queryRatings);
  const toggleRating = useCallback((rating: number) => {
    setRatings(prev => {
      if (prev.includes(rating)) {
        return prev.filter(r => r !== rating);
      } else {
        return [...prev, rating];
      }
    });
  }, []);

  useDebounce(() => setQueryRatings(ratings), 800, [ratings]);

  return [ratings, toggleRating];
};

const RatingFilter: React.FC = () => {
  const [ratings, toggleRating] = useRatingsToggle();

  return (
    <div className={styles.filterContainer}>
      <span className={styles.label}>篩選：</span>
      <div className={styles.options}>
        {RATING_FILTER_OPTIONS.map(({ value: rating, label }: FilterOption) => {
          const isActive = ratings.includes(rating);
          return (
            <button
              key={rating}
              type="button"
              className={cn(styles.optionButton, {
                [styles.active]: isActive,
              })}
              onClick={() => toggleRating(rating)}
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
