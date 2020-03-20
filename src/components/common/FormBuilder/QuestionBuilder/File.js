import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFile from '@fortawesome/fontawesome-free-solid/faFile';
import styles from './File.module.css';

const File = ({ title, description, dataKey, required, validator }) => (
  <div>
    <div className={cn(styles.title, { [styles.necessary]: required })}>
      <span className={styles.necessary}>4. {title}</span>
    </div>
    <div className={styles.description}>{description}</div>
    <label className={styles.upload}>
      <input id="upload_img" className={styles.image} type="file" />
      <FontAwesomeIcon icon={faFile} className={styles.icon} />
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
