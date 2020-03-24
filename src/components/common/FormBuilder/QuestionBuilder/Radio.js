import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Radio.module.css';

const Radio = ({
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  validator,
  options,
}) => (
  <div>
    <div className={cn(styles.title, { [styles.necessary]: required })}>
      3. {title}
    </div>
    {options.map(option => (
      <label className={styles.label} key={option}>
        <input
          className={styles.input}
          type="radio"
          name={dataKey}
          value={option}
          checked={option === value}
          onChange={() => onChange(option)}
        />
        <div className={styles.button}>{option}</div>
      </label>
    ))}
  </div>
);

Radio.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Radio.defaultProps = {
  required: false,
};

export default Radio;
