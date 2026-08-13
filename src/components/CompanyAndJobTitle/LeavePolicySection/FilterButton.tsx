import cn from 'classnames';
import React from 'react';

import styles from './styles.module.css';

type Props = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

const FilterButton: React.FC<Props> = ({ label, checked, onClick }) => (
  <button
    className={cn(styles.filterButton, {
      [styles.filterButtonChecked]: checked,
    })}
    onClick={onClick}
  >
    <input
      type="checkbox"
      className={styles.checkbox}
      checked={checked}
      readOnly
      tabIndex={-1}
      aria-hidden="true"
    />
    {label}
  </button>
);

export default FilterButton;
