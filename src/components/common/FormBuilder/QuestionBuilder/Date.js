import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Select from 'common/form/Select';
import styles from './Date.module.css';
import commonStyles from './styles.module.css';
import { withShape } from 'airbnb-prop-types';

const monthOptions = Array(12)
  .fill(0)
  .map((_, i) => i + 1)
  .map(n => ({ value: n, label: n }));

const yearOptions = Array(10)
  .fill(0)
  .map((_, i) => new Date().getFullYear() - i)
  .map(n => ({ value: n, label: n }));

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
}) => (
  <div className={cn({ [commonStyles.hasWarning]: !!warning }, className)}>
    <div className={cn(styles.inputRow, commonStyles.warnableContainer)}>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <Select
            options={yearOptions}
            value={year}
            onChange={e =>
              onChange([
                e.target.value === '' ? null : Number(e.target.value),
                month,
              ])
            }
          />
        </div>
        <div className={cn(styles.suffixLabel, 'pS')}>年</div>
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <Select
            options={monthOptions}
            value={month}
            onChange={e =>
              onChange([
                year,
                e.target.value === '' ? null : Number(e.target.value),
              ])
            }
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
