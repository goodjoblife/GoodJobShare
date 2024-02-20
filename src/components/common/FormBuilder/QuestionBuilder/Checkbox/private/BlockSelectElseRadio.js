import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import R from 'ramda';
import cn from 'classnames';

import styles from './private.module.css';
import Radio from 'common/form/Radio';
import BlockSelect from './BlockSelect';
import { OptionPropType, ValuePropType } from '../PropTypes';
import { normalizeOptions } from './utils';
import useDebouncedConfirm from '../../../useDebouncedConfirm';

const BlockSelectElseRadio = ({
  dataKey,
  required,
  value: [selected, elseValue],
  onChange,
  onConfirm,
  options,
  elseOptionValue,
  elseOptions,
  multiple,
}) => {
  options = normalizeOptions(options);

  const hasElse = useMemo(() => {
    if (multiple) {
      return R.contains(elseOptionValue, selected);
    } else {
      return R.equals(elseOptionValue, selected);
    }
  }, [elseOptionValue, multiple, selected]);
  const handleSelectChange = useCallback(
    selected => onChange([selected, elseValue]),
    [elseValue, onChange],
  );

  const debouncedConfirm = useDebouncedConfirm(onConfirm, 300);
  const handleElseChange = useCallback(
    e => {
      onChange([selected, e.target.value]);
      debouncedConfirm();
    },
    [debouncedConfirm, onChange, selected],
  );
  const handleSelectConfirm = useCallback(() => {
    if (!hasElse) onConfirm();
  }, [hasElse, onConfirm]);
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
    <div
      key="else"
      className={cn(styles.label, {
        [styles.hidden]: !hasElse,
      })}
    >
      {elseOptions.map(({ label, value }) => (
        <Radio
          key={value}
          label={label}
          value={value}
          margin="10px 0 5px 0"
          checked={value === elseValue}
          onChange={handleElseChange}
        />
      ))}
    </div>,
  ];
};

BlockSelectElseRadio.propTypes = {
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.oneOfType([
      ValuePropType,
      PropTypes.arrayOf(ValuePropType).isRequired,
    ]),
    // else
    1: ValuePropType,
  }),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  elseOptionValue: ValuePropType.isRequired,
  elseOptions: PropTypes.arrayOf(OptionPropType).isRequired,
  multiple: PropTypes.bool.isRequired,
};

BlockSelectElseRadio.defaultProps = {
  value: [null, null],
  multiple: false,
};

export default BlockSelectElseRadio;
