import React from 'react';

import styles from './styles.module.css';

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

const FilterToggleButton: React.FC<Props> = ({
  id,
  label,
  checked,
  onChange,
}) => (
  <React.Fragment>
    <input
      type="checkbox"
      id={id}
      className={styles.checkboxInput}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id} className={styles.filterButton}>
      <span className={styles.checkbox} />
      {label}
    </label>
  </React.Fragment>
);

export default FilterToggleButton;
