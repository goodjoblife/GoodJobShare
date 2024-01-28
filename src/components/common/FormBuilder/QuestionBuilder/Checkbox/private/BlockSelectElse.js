import React, { useCallback, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import R from 'ramda';
import cn from 'classnames';

import styles from './private.module.css';
import TextInput from 'common/form/TextInput';
import BlockSelect from './BlockSelect';

const BlockSelectElse = ({
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

export default BlockSelectElse;
