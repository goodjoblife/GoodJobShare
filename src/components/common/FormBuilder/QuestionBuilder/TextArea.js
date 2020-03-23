import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './TextArea.module.css';

const Textarea = ({
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  validator,
  minLength,
}) => (
  <div className={styles.container}>
    <div className={cn(styles.title, { [styles.necessary]: required })}>
      2. {title}
    </div>
    <textarea
      className={styles.textarea}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <p className={styles.warning}>
      最少 {minLength} 字，現在 {value.length} 字
    </p>
  </div>
);

Textarea.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
  minLength: PropTypes.number.isRequired,
};

Textarea.defaultProps = {
  required: false,
};

export default Textarea;
