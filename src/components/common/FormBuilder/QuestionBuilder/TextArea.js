import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextArea.module.css';

const Textarea = ({ title, description, dataKey, required, validator }) => (
  <div className={styles.container}>
    <div className={styles.title}>
      2. {title}
      <span className={styles.necessary}> * </span>
    </div>
    <textarea className={styles.textarea} />
    <p className={styles.warning}>最少30字，現在0字</p>
  </div>
);

Textarea.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func.isRequired,
};

Textarea.defaultProps = {
  required: false,
};

export default Textarea;
