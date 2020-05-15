import React, { useCallback, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import R from 'ramda';
import cn from 'classnames';

import Scrollable from '../../Scrollable';
import useDebouncedConfirm from '../../useDebouncedConfirm';
import styles from './private.module.css';
import commonStyles from '../styles.module.css';
import TextInput from 'common/form/TextInput';

export const Wrapper = ({ warning, children }) => (
  <div className={styles.container}>
    <div
      className={cn(styles.warnableContainer, commonStyles.warnableContainer, {
        [commonStyles.hasWarning]: !!warning,
      })}
    >
      <div className={styles.options}>
        <Scrollable className={styles.optionsContent}>{children}</Scrollable>
      </div>
    </div>
    <div className={commonStyles.warning}>{warning}</div>
  </div>
);

Wrapper.propTypes = {
  warning: PropTypes.string,
  children: PropTypes.node,
};

const toggle = (value, values) => {
  if (R.contains(value, values)) {
    return R.without(value, values);
  } else {
    return R.append(value, values);
  }
};

export const BlockSelect = ({
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

  return options.map(option => (
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
  ));
};

BlockSelect.propTypes = {
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string).isRequired,
  ]),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  multiple: PropTypes.bool.isRequired,
};

BlockSelect.defaultProps = {
  multiple: false,
};

export const BlockSelectElse = ({
  dataKey,
  required,
  value: [selected, elseText],
  onChange,
  onConfirm,
  options,
  multiple,
  placeholder,
}) => {
  const elseRef = useRef(null);
  const hasElse = useMemo(() => {
    if (multiple) {
      return R.contains(R.last(options), selected);
    } else {
      return R.equals(R.last(options), selected);
    }
  }, [multiple, options, selected]);
  const handleSelectChange = useCallback(
    selected => onChange([selected, elseText]),
    [elseText, onChange],
  );
  const handleElseChange = useCallback(
    e => onChange([selected, e.target.value]),
    [onChange, selected],
  );
  const handleSelectConfirm = useCallback(() => {
    if (!hasElse) onConfirm();
  }, [hasElse, onConfirm]);
  useEffect(() => {
    if (hasElse) {
      elseRef.current.focus();
    }
  }, [hasElse]);
  return [
    <BlockSelect
      key="select"
      dataKey={dataKey}
      required={required}
      value={selected}
      onChange={handleSelectChange}
      onConfirm={handleSelectConfirm}
      options={options}
      multiple={multiple}
    />,
    <TextInput
      key="else"
      ref={elseRef}
      wrapperClassName={cn(styles.label, {
        [styles.hidden]: !hasElse,
      })}
      value={elseText}
      onChange={handleElseChange}
      onEnter={onConfirm}
      placeholder={placeholder}
    />,
  ];
};

BlockSelectElse.propTypes = {
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    ]),
    // else
    1: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  multiple: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
};

BlockSelectElse.defaultProps = {
  value: [null, ''],
  multiple: false,
};
