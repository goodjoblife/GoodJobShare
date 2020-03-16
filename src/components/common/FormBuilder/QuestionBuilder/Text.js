import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Text.module.css';

const Text = ({ title, description, dataKey, required, validator }) => (
  <div>
    <div className={cn(styles.title, { [styles.necessary]: required })}>
      1. {title}
    </div>
    <input
      className={styles.textinput}
      type="text"
      placeholder="請輸入職業名稱"
      required
    />
  </div>
);

Text.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func.isRequired,
};

Text.defaultProps = {
  required: false,
};

export default Text;
