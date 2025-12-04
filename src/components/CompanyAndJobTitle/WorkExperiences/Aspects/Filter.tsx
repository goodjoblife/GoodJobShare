import React, { useCallback, useState } from 'react';
import cn from 'classnames';

import styles from './styles.module.css';

type FilterOption = {
  value: number;
  label: string;
};

const FILTER_OPTIONS: FilterOption[] = [
  { value: 5, label: '非常滿意' },
  { value: 4, label: '滿意' },
  { value: 3, label: '普通' },
  { value: 2, label: '不滿意' },
  { value: 1, label: '非常不滿意' },
];

const Filter: React.FC = () => {
  const [activeValues, setActiveValues] = useState<number[]>([5, 4]);

  const toggle = useCallback((key: number) => {
    setActiveValues(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key],
    );
  }, []);

  return (
    <div className={styles.filterContainer}>
      <span className={styles.label}>篩選：</span>
      <div className={styles.options}>
        {FILTER_OPTIONS.map(({ value, label }) => {
          const isActive = activeValues.includes(value);
          return (
            <button
              key={value}
              type="button"
              className={cn(styles.optionButton, {
                [styles.active]: isActive,
              })}
              onClick={() => toggle(value)}
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

export default Filter;
