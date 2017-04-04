import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './IndustryRadio.module.css';

const IndustryRadio = ({ label, value, setIndustry, experienceSearch }) => (
  <div className={styles.formGroup}>
    <input
      type="radio" id={`industry-${value}`} value={value}
      onChange={setIndustry}
      checked={experienceSearch.get('industry') === value}
    />
    <label
      className={styles.radioCircle}
      htmlFor={`industry-${value}`}
    >
      <span className={styles.radioInput} />
      <span className={styles.radioText}>{label}</span>
    </label>
  </div>
);

IndustryRadio.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setIndustry: PropTypes.func.isRequired,
  experienceSearch: ImmutablePropTypes.map.isRequired,
};

export default IndustryRadio;
