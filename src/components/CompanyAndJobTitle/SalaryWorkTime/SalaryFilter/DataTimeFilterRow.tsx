import cn from 'classnames';
import React from 'react';

import { DATA_TIME_OPTIONS, DataTime } from 'constants/salaryFilter';

import styles from './FilterRow.module.css';

type Props = {
  value: DataTime | null;
  onChange: (value: DataTime | null) => void;
};

const DataTimeFilterRow = ({ value, onChange }: Props): React.ReactElement => (
  <fieldset className={styles.filterRow}>
    <legend>參考時間</legend>
    <div className={styles.options}>
      {[{ value: null, label: '不限' }, ...DATA_TIME_OPTIONS].map(option => {
        const selected = value === option.value;
        return (
          <button
            type="button"
            key={option.value || 'unlimited'}
            aria-pressed={selected}
            className={cn(styles.option, { [styles.selected]: selected })}
            onClick={(): void => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  </fieldset>
);

export default DataTimeFilterRow;
