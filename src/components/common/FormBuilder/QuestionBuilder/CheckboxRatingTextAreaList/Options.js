import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import { OptionPropType, ValuePropType } from '../Checkbox/PropTypes';
import styles from './styles.module.css';

const Options = ({ value: values, onChange, options, elseOptionValue }) => {
  const onClick = useCallback(
    value => {
      if (values.includes(value)) {
        onChange(values.filter(v => v !== value));
      } else {
        onChange([...values, value]);
      }
    },
    [onChange, values],
  );
  return (
    <div className={styles.container}>
      {options.map(({ label, value }) => {
        return (
          <div key={value} className={styles.cell}>
            <Option
              onClick={() => onClick(value)}
              selected={values.includes(value)}
              isElse={value === elseOptionValue}
            >
              {label}
            </Option>
          </div>
        );
      })}
    </div>
  );
};

Options.propTypes = {
  value: PropTypes.arrayOf(ValuePropType).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionValue: ValuePropType,
};

export default Options;
