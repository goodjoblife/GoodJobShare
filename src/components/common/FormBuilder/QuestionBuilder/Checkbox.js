import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import cn from 'classnames';

import Scrollable from '../Scrollable';
import useDebouncedConfirm from '../useDebouncedConfirm';
import styles from './Checkbox.module.css';

const toggle = (value, values) => {
  if (R.contains(value, values)) {
    return R.without(value, values);
  } else {
    return R.append(value, values);
  }
};

const Select = ({
  dataKey,
  value,
  onChange,
  onConfirm,
  warning,
  options,
  multiple,
}) => {
  const isChecked = useCallback(
    option => {
      if (multiple) {
        return R.contains(option, value);
      } else {
        return option === value;
      }
    },
    [multiple, value],
  );

  const debouncedConfirm = useDebouncedConfirm(onConfirm, 300);
  const handleChange = useCallback(
    option => {
      if (multiple) {
        onChange(toggle(option, value));
      } else {
        onChange(option);
        debouncedConfirm();
      }
    },
    [debouncedConfirm, onChange, multiple, value],
  );

  return (
    <div className={cn(styles.container, { [styles.hasWarning]: !!warning })}>
      <div className={styles.options}>
        <Scrollable className={styles.optionsContent}>
          {options.map(option => (
            <label key={option} className={styles.label}>
              <input
                className={styles.input}
                type="checkbox"
                name={dataKey}
                value={option}
                checked={isChecked(option)}
                onChange={() => handleChange(option)}
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

Select.propTypes = {
  dataKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string).isRequired,
  ]),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  warning: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  multiple: PropTypes.bool.isRequired,
};

Select.defaultProps = {
  multiple: false,
};

export const Checkbox = ({
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value,
  onChange,
  warning,
  validator,
  options,
}) => (
  <Select
    dataKey={dataKey}
    value={value}
    onChange={onChange}
    warning={warning}
    options={options}
    multiple
  />
);

Checkbox.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export const Radio = ({
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
}) => (
  <Select
    dataKey={dataKey}
    value={value}
    onChange={onChange}
    onConfirm={onConfirm}
    warning={warning}
    options={options}
  />
);

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
