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
  minLength,
}) => (
  <div className={styles.container}>
    <textarea
      className={cn(styles.textarea, { [styles.hasWarning]: !!warning })}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <p className={cn(styles.count, { [styles.warning]: !!warning })}>
      最少 {minLength} 字，現在 {value.length} 字
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
  minLength: PropTypes.number.isRequired,
};

Textarea.defaultProps = {
  required: false,
};

export default Textarea;
