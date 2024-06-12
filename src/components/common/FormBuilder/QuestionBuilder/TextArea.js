import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TextAreaInput from 'common/form/TextArea';
import styles from './TextArea.module.css';
import commonStyles from './styles.module.css';

const Textarea = ({
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value,
  onChange,
  footnote,
  warning,
}) => (
  <div
    className={cn(styles.container, { [commonStyles.hasWarning]: !!warning })}
  >
    <div
      className={cn(styles.warnableContainer, commonStyles.warnableContainer)}
    >
      <TextAreaInput
        wrapperClassName={styles.wrapper}
        className={cn(styles.textarea)}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
    <p
      className={cn(styles.footnote, {
        [commonStyles.warning]: !!warning,
      })}
    >
      {warning || (typeof footnote === 'function' ? footnote(value) : footnote)}
    </p>
  </div>
);

Textarea.propTypes = {
  dataKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  description: PropTypes.string,
  footnote: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  onChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  required: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: PropTypes.string.isRequired,
  warning: PropTypes.string,
};

export default Textarea;
