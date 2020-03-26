import React from 'react';
import PropTypes from 'prop-types';

import styles from './TextArea.module.css';
import TitleBlock from '../TitleBlock';

const Textarea = ({
  page,
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
    <TitleBlock
      page={page}
      title={title}
      description={description}
      required={required}
    />
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
  page: PropTypes.number.isRequired,
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
