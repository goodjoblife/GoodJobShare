import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import useDebouncedConfirm from '../../../useDebouncedConfirm';
import styles from './private.module.css';
import { toggle } from './utils';
import { OptionPropType, ValuePropType } from '../PropTypes';

const BlockSelect = ({
  dataKey,
  required,
  value,
  onChange,
  onConfirm,
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
      } else if (required) {
        onChange(option);
        debouncedConfirm();
      } else if (option === value) {
        onChange(null);
      } else {
        onChange(option);
        debouncedConfirm();
      }
    },
    [multiple, required, value, onChange, debouncedConfirm],
  );

  return options.map(({ label, value }) => (
    <label key={value} className={styles.label}>
      <input
        className={styles.input}
        type="checkbox"
        name={dataKey}
        value={value}
        checked={isChecked(value)}
        onChange={() => handleChange(value)}
      />
      <div className={styles.button}>{label}</div>
    </label>
  ));
};

BlockSelect.propTypes = {
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    ValuePropType,
    PropTypes.arrayOf(ValuePropType).isRequired,
  ]),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  multiple: PropTypes.bool.isRequired,
};

BlockSelect.defaultProps = {
  multiple: false,
};

export default BlockSelect;
