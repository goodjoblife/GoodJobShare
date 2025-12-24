import React, { useCallback } from 'react';
import { useDebounce } from 'react-use';
import cn from 'classnames';

import {
  FilterOption,
  RATING_FILTER_OPTIONS,
  useRatingsToggle,
} from './useRatings';
import styles from './styles.module.css';

const RatingFilter: React.FC = () => {
  const [ratings, toggleRating] = useRatingsToggle();

  // Create a debounced version of toggleRating (250ms default)
  const [debouncedToggleRating] = useDebounce(
    useCallback(
      (rating: number) => {
        toggleRating(rating);
      },
      [toggleRating],
    ),
    250,
  );

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
              onClick={() => debouncedToggleRating(rating)}
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
