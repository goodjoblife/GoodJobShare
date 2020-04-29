import React, { useCallback, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import { useKey } from 'react-use';
import R from 'ramda';
import cn from 'classnames';

import Scrollable from '../../Scrollable';
import useDebouncedConfirm from '../../useDebouncedConfirm';
import useComposition from '../../useComposition';
import styles from './private.module.css';
import textStyles from '../Text.module.css';

export const Wrapper = ({ warning, children }) => (
  <div className={cn(styles.container, { [styles.hasWarning]: !!warning })}>
    <div className={styles.options}>
      <Scrollable className={styles.optionsContent}>{children}</Scrollable>
    </div>
    <div className={styles.warning}>{warning}</div>
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
      } else {
        onChange(option);
        debouncedConfirm();
      }
    },
    [debouncedConfirm, onChange, multiple, value],
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
  const [
    isComposing,
    handleCompositionStart,
    handleCompositionEnd,
  ] = useComposition();
  useKey(
    'Enter',
    e => {
      if (!isComposing) {
        onConfirm();
      }
    },
    { target: elseRef.current },
    [isComposing, onConfirm],
  );
  return [
    <BlockSelect
      key="select"
      dataKey={dataKey}
      value={selected}
      onChange={handleSelectChange}
      onConfirm={handleSelectConfirm}
      options={options}
      multiple={multiple}
    />,
    <input
      key="else"
      ref={elseRef}
      className={cn(textStyles.textinput, styles.label, {
        [styles.hidden]: !hasElse,
      })}
      value={elseText}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onChange={handleElseChange}
      placeholder={placeholder}
    />,
  ];
};

BlockSelectElse.propTypes = {
  dataKey: PropTypes.string.isRequired,
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
