import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import cn from 'classnames';

import Scrollable from '../Scrollable';
import styles from './Checkbox.module.css';

const toggle = (value, values) => {
  if (R.contains(value, values)) {
    return R.without(value, values);
  } else {
    return R.append(value, values);
  }
};

const Checkbox = ({
  page,
  title,
  description,
  dataKey,
  required,
  value: values,
  onChange,
  warning,
  validator,
  options,
}) => (
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
              checked={R.contains(option, values)}
              onChange={() => onChange(toggle(option, values))}
            />
            <div className={styles.button}>{option}</div>
          </label>
        ))}
      </Scrollable>
    </div>
    <div className={styles.warning}>{warning}</div>
  </div>
);

Checkbox.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Checkbox;
