import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './TypeCheckbox.module.css';

const TypeCheckbox = ({ label, value, setType, experienceSearch }) => (
  <div className={styles.formGroup}>
    <input
      type="checkbox" id={`type-${value}`} value={value}
      onChange={setType}
      checked={experienceSearch.get(value)}
    />
    <label htmlFor={`type-${value}`}>
      <span className={styles.checkboxInput} />
      <span className={styles.checkboxText}>{label}</span>
    </label>
  </div>
);

TypeCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
  experienceSearch: ImmutablePropTypes.map.isRequired,
};

export default TypeCheckbox;
