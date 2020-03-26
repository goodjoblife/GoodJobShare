import React from 'react';
import PropTypes from 'prop-types';

import styles from './Radio.module.css';
import TitleBlock from '../TitleBlock';

const Radio = ({
  page,
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  onConfirm,
  validator,
  options,
}) => (
  <div>
    <TitleBlock
      page={page}
      title={title}
      description={description}
      required={required}
    />
    {options.map(option => (
      <label className={styles.label} key={option}>
        <input
          className={styles.input}
          type="radio"
          name={dataKey}
          value={option}
          checked={option === value}
          onChange={() => {
            onChange(option);
            setTimeout(onConfirm, 300);
          }}
        />
        <div className={styles.button}>{option}</div>
      </label>
    ))}
  </div>
);

Radio.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Radio.defaultProps = {
  required: false,
};

export default Radio;
