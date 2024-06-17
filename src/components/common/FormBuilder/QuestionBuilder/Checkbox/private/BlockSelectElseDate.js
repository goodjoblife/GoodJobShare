import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withShape } from 'airbnb-prop-types';
import R from 'ramda';
import cn from 'classnames';

import styles from './private.module.css';
import commonStyles from '../../styles.module.css';
import BlockSelect from './BlockSelect';
import DatePicker, { DatePropType } from '../../Date';
import { OptionPropType, ValuePropType } from '../PropTypes';

const BlockSelectElseDate = ({
  page,
  title,
  dataKey,
  required,
  defaultValue: [defaultSelected, defaultElseValue],
  value: [selected, elseValue],
  onChange,
  onConfirm,
  options,
  elseOptionValue,
  multiple,
}) => {
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

  const handleElseChange = useCallback(
    elseValue => {
      onChange([selected, elseValue]);
    },
    [onChange, selected],
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
    <DatePicker
      key="else"
      className={cn(
        styles.label,
        {
          [styles.hidden]: !hasElse,
        },
        commonStyles.noWarning,
      )}
      page={page}
      title={title}
      dataKey={dataKey}
      defaultValue={defaultElseValue}
      value={elseValue}
      onChange={handleElseChange}
    />,
  ];
};

BlockSelectElseDate.propTypes = {
  dataKey: PropTypes.string.isRequired,
  elseOptionValue: ValuePropType.isRequired,
  multiple: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
  page: PropTypes.number.isRequired,
  required: PropTypes.bool,
  title: PropTypes.string.isRequired,
  value: withShape(PropTypes.array.isRequired, {
    // option
    0: PropTypes.oneOfType([
      ValuePropType,
      PropTypes.arrayOf(ValuePropType).isRequired,
    ]),
    // else
    1: DatePropType,
  }),
};

BlockSelectElseDate.defaultProps = {
  value: [null, null],
  multiple: false,
};

export default BlockSelectElseDate;
