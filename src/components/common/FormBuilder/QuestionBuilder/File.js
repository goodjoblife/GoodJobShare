import React from 'react';
import PropTypes from 'prop-types';
import styles from './File.module.css';

const File = ({ title, description, dataKey, required, validator }) => (
  <div>
    <div className={styles.title}>
      4. {title}
      <span className={styles.necessary}> * </span>
    </div>
    <div className={styles.description}>{description}</div>
    <label className={styles.upload}>
      <input id="upload_img" className={styles.image} type="file" />
      <i className={styles.icon}></i>
      <span className={styles.uploadText}>上傳檔案</span>
    </label>
  </div>
);

File.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  validator: PropTypes.func.isRequired,
};

File.defaultProps = {
  required: false,
};

export default File;
