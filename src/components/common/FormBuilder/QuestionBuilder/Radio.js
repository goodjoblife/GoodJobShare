import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Scrollable from '../Scrollable';
import useDebouncedConfirm from '../useDebouncedConfirm';
import styles from './Radio.module.css';

const Radio = ({
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value,
  onChange,
  onConfirm,
  warning,
  validator,
  options,
}) => {
  const debouncedConfirm = useDebouncedConfirm(onConfirm, 300);
  return (
    <div className={cn(styles.container, { [styles.hasWarning]: !!warning })}>
      <div className={styles.options}>
        <Scrollable className={styles.optionsContent}>
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
                  debouncedConfirm();
                }}
              />
              <div className={styles.button}>{option}</div>
            </label>
          ))}
        </Scrollable>
      </div>
      <div className={styles.warning}>{warning}</div>
    </div>
  );
};

Radio.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Radio;
