import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import { useKey } from 'react-use';
import R from 'ramda';
import cn from 'classnames';

import Scrollable from '../Scrollable';
import useDebouncedConfirm from '../useDebouncedConfirm';
import useComposition from '../useComposition';
import styles from './Checkbox.module.css';
import textStyles from './Text.module.css';

const toggle = (value, values) => {
  if (R.contains(value, values)) {
    return R.without(value, values);
  } else {
    return R.append(value, values);
  }
};

const Wrapper = ({ warning, children }) => (
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

const Select = ({ dataKey, value, onChange, onConfirm, options, multiple }) => {
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

Select.propTypes = {
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
  <Wrapper warning={warning}>
    <Select
      dataKey={dataKey}
      value={value}
      onChange={onChange}
      options={options}
      multiple
    />
  </Wrapper>
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
  <Wrapper warning={warning}>
    <Select
      dataKey={dataKey}
      value={value}
      onChange={onChange}
      onConfirm={onConfirm}
      options={options}
    />
  </Wrapper>
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

const SelectElse = ({
  dataKey,
  value: [selected, elseText],
  onChange,
  onConfirm,
  options,
  multiple,
  placeholder,
}) => {
  const elseRef = useRef(null);
  const hasElse = R.equals(R.last(options), selected);
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
    <Select
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

SelectElse.propTypes = {
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

SelectElse.defaultProps = {
  value: [null, ''],
  multiple: false,
};

export const CheckboxElse = ({
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
  placeholder,
}) => (
  <Wrapper warning={warning}>
    <SelectElse
      dataKey={dataKey}
      value={value}
      onChange={onChange}
      options={options}
      multiple
      placeholder={placeholder}
    />
  </Wrapper>
);

CheckboxElse.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    // else
    1: PropTypes.string.isRequired,
  }),
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    // else
    1: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
};

export const RadioElse = ({
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
  placeholder,
}) => (
  <Wrapper warning={warning}>
    <SelectElse
      dataKey={dataKey}
      value={value}
      onChange={onChange}
      onConfirm={onConfirm}
      options={options}
      placeholder={placeholder}
    />
  </Wrapper>
);

RadioElse.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.string,
    // else
    1: PropTypes.string.isRequired,
  }),
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.string,
    // else
    1: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
};
