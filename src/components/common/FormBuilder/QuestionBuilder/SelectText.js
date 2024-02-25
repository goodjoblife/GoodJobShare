import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TextInput from 'common/form/TextInput';
import Select from 'common/form/Select';
import styles from './SelectText.module.css';
import commonStyles from './styles.module.css';
import { normalizeOptions } from './utils';

const SelectText = ({
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value: [selected, text],
  onChange,
  onConfirm,
  hint,
  warning,
  placeholder,
  suffix,
  footnote,
  options,
}) => (
  <div className={cn({ [commonStyles.hasWarning]: !!warning })}>
    <div className={cn(styles.inputRow, commonStyles.warnableContainer)}>
      <Select
        options={normalizeOptions(options)}
        value={selected}
        onChange={e => onChange([e.target.value ? e.target.value : null, text])}
      />
      <div className={cn(styles.inputGroup, styles.text)}>
        <div className={styles.inputWrapper}>
          <TextInput
            placeholder={placeholder}
            value={text}
            onChange={e => onChange([selected, e.target.value])}
            onEnter={onConfirm}
          />
        </div>
        <div className={cn(styles.suffixLabel, 'pS')}>{suffix}</div>
      </div>
    </div>
    {footnote && <p className={commonStyles.footnote}>{footnote}</p>}
    <p className={cn(commonStyles.warning, commonStyles.inlineWarning, 'pS')}>
      {warning ||
        (hint && (typeof hint === 'function' ? hint([selected, text]) : hint))}
    </p>
  </div>
);

export const ValuePropType = PropTypes.oneOfType([PropTypes.string]);
export const OptionPropType = PropTypes.oneOfType([
  ValuePropType,
  PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    value: ValuePropType.isRequired,
  }),
]);

SelectText.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.arrayOf(ValuePropType).isRequired,
  value: PropTypes.arrayOf(ValuePropType).isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  warning: PropTypes.string,
  placeholder: PropTypes.string,
  suffix: PropTypes.string,
  footnote: PropTypes.string,
  options: PropTypes.arrayOf(OptionPropType).isRequired,
};

SelectText.defaultProps = {
  value: [null, ''],
  options: [],
};

export default SelectText;
