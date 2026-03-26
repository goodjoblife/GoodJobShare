import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Select from 'common/form/Select';
import styles from './Date.module.css';
import commonStyles from './styles.module.css';
import { withShape } from 'airbnb-prop-types';

const toNumberOrNull = v => (v === '' ? null : Number(v));

const getNow = () => {
  const d = new Date();
  return [d.getFullYear(), d.getMonth() + 1];
};

const buildMonthOptions = (selectedYear, currentYear, currentMonth) => {
  const endMonth = selectedYear === currentYear ? currentMonth : 12;
  return Array.from({ length: endMonth }, (_, i) => {
    const n = i + 1;
    return { value: n, label: n };
  });
};

const buildYearOptions = (currentYear, span = 10) =>
  Array.from({ length: span }, (_, i) => {
    const y = currentYear - i;
    return { value: y, label: y };
  });

const DatePicker = ({
  className,
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value: [year, month],
  onChange,
  warning,
}) => {
  const [currentYear, currentMonth] = getNow();
  const yearOptions = useMemo(() => buildYearOptions(currentYear, 10), [
    currentYear,
  ]);
  const monthOptions = useMemo(
    () => buildMonthOptions(year, currentYear, currentMonth),
    [year, currentYear, currentMonth],
  );
  const handleYearChange = useCallback(
    e => {
      const newYear = toNumberOrNull(e.target.value);
      const newMonth =
        newYear >= currentYear && month > currentMonth ? null : month;
      onChange([newYear, newMonth]);
    },
    [currentYear, currentMonth, month, onChange],
  );
  const handleMonthChange = useCallback(
    e => {
      onChange([year, toNumberOrNull(e.target.value)]);
    },
    [year, onChange],
  );

  return (
    <div className={cn({ [commonStyles.hasWarning]: !!warning }, className)}>
      <div className={cn(styles.inputRow, commonStyles.warnableContainer)}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <Select
              options={yearOptions}
              value={year}
              onChange={handleYearChange}
            />
          </div>
          <div className={cn(styles.suffixLabel, 'pS')}>年</div>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <Select
              options={monthOptions}
              value={month}
              onChange={handleMonthChange}
            />
          </div>
          <div className={cn(styles.suffixLabel, 'pS')}>月</div>
        </div>
      </div>
      <p className={cn(commonStyles.warning, commonStyles.inlineWarning, 'pS')}>
        {warning}
      </p>
    </div>
  );
};

export const DatePropType = withShape(PropTypes.array.isRequired, {
  0: PropTypes.number,
  1: PropTypes.number,
});

DatePicker.propTypes = {
  className: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.array.isRequired,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  required: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: DatePropType,
  warning: PropTypes.string,
};

DatePicker.defaultProps = {
  value: [null, null],
};

export default DatePicker;
