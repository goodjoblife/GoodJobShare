import React from 'react';
import PropTypes from 'prop-types';

import styles from './Select.module.css';

const Select = ({
  value,
  options,
  hasNullOption,
  nullOptionText,
  onChange,
}) => (
  <div className={styles.wrapper}>
    <select
      className={styles.select}
      value={value === null ? '' : value}
      onChange={onChange}
    >
      {hasNullOption && <option value="">{nullOptionText}</option>}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasNullOption: PropTypes.bool,
  nullOptionText: PropTypes.string,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  hasNullOption: true,
  nullOptionText: '- 請選擇 -',
};

export default Select;
