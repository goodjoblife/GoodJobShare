import cn from 'classnames';
import React from 'react';

import styles from './FilterRow.module.css';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  label: string;
  options: Option<T>[];
  values: T[];
  onChange: (values: T[]) => void;
};

const toggleValue = <T extends string>(values: T[], value: T): T[] =>
  values.includes(value)
    ? values.filter(currentValue => currentValue !== value)
    : [...values, value];

const FilterRow = <T extends string>({
  label,
  options,
  values,
  onChange,
}: Props<T>): React.ReactElement => {
  const unrestricted = values.length === 0;
  return (
    <fieldset className={styles.filterRow}>
      <legend>{label}</legend>
      <div className={styles.options}>
        <button
          type="button"
          aria-pressed={unrestricted}
          className={cn(styles.option, {
            [styles.selected]: unrestricted,
          })}
          onClick={(): void => onChange([])}
        >
          不限
        </button>
        {options.map(option => {
          const selected = values.includes(option.value);
          return (
            <button
              type="button"
              key={option.value}
              aria-pressed={selected}
              className={cn(styles.option, { [styles.selected]: selected })}
              onClick={(): void => onChange(toggleValue(values, option.value))}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default FilterRow;
