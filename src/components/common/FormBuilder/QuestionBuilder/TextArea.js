import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './TextArea.module.css';

const Textarea = ({
  page,
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  warning,
  validator,
  minLength,
}) => (
  <div className={cn(styles.container, { [styles.hasWarning]: !!warning })}>
    <textarea
      className={styles.textarea}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <p className={cn(styles.count, { [styles.warning]: !!warning })}>
      {warning}
    </p>
  </div>
);

Textarea.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  warning: PropTypes.string,
  validator: PropTypes.func,
  minLength: PropTypes.number.isRequired,
};

export default Textarea;
