import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './TextArea.module.css';

const Textarea = ({ title, description, dataKey, required, validator }) => (
  <div className={styles.container}>
    <div className={cn(styles.title, { [styles.necessary]: required })}>
      2. {title}
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
