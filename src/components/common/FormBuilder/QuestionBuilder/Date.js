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

const yearOptions = Array(12)
  .fill(0)
  .map((_, i) => new Date().getFullYear() - i)
  .map(n => ({ value: n, label: n }));

const DatePicker = ({
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value: [year, month],
  onChange,
  warning,
  validator,
}) => (
  <div className={cn({ [commonStyles.hasWarning]: !!warning })}>
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
    <p className={cn(commonStyles.warning, commonStyles.isnotFill, 'pS')}>
      {warning}
    </p>
  </div>
);

DatePicker.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.array.isRequired,
  value: withShape(PropTypes.array.isRequired, {
    0: PropTypes.number,
    1: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
};

DatePicker.defaultProps = {
  value: [null, null],
};

export default DatePicker;
