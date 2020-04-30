import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Select from 'common/form/Select';
import styles from './SelectText.module.css';
import textStyles from './Text.module.css';

const SelectText = ({
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value: [selected, text],
  onChange,
  warning,
  validator,
  placeholder,
  options,
}) => (
  <div className={cn({ [styles.hasWarning]: !!warning })}>
    <div className={styles.inputRow}>
      <Select
        options={options.map(value => ({ label: value, value }))}
        value={selected}
        onChange={e => onChange([e.target.value ? e.target.value : null, text])}
      />
      <div className={cn(styles.inputGroup, styles.text)}>
        <div className={styles.inputWrapper}>
          <input
            className={textStyles.textinput}
            placeholder={placeholder}
            value={text}
            onChange={e => onChange([selected, e.target.value])}
          />
        </div>
        <div className={cn(styles.suffixLabel, 'pS')}>元</div>
      </div>
    </div>
    <p className={cn(styles.warning, 'pS')}>{warning}</p>
  </div>
);

SelectText.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

SelectText.defaultProps = {
  value: [null, ''],
  options: [],
};

export default SelectText;
