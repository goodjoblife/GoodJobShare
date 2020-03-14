import React from 'react';
import PropTypes from 'prop-types';
import styles from './Radio.module.css';

const Radio = ({
  title,
  description,
  dataKey,
  required,
  validator,
  options,
}) => (
  <div>
    <div className={styles.title}>
      3. {title}
      <span className={styles.necessary}> * </span>
    </div>
    {options.map(option => (
      <label className={styles.button} key={option}>
        <input
          className={styles.input}
          type="radio"
          name={dataKey}
          value={option}
        />
        <span> {option} </span>
      </label>
    ))}
  </div>
);

Radio.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Radio.defaultProps = {
  required: false,
};

export default Radio;
