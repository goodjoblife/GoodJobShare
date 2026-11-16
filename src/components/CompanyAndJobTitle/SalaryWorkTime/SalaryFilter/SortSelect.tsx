import React from 'react';

import { SORT_OPTIONS } from 'constants/salaryFilter';

import styles from './SortSelect.module.css';

type Props = {
  value: string | null | undefined;
  onChange: (value: string | null) => void;
};

const SortSelect = ({ value, onChange }: Props): React.ReactElement => (
  <div className={styles.sortGroup}>
    <span className={styles.label}>排序：</span>
    <select
      className={styles.select}
      aria-label="排序"
      value={value || ''}
      onChange={(event): void => onChange(event.target.value || null)}
    >
      <option value="">參考時間（新→舊）</option>
      {SORT_OPTIONS.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SortSelect;
