import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFile from '@fortawesome/fontawesome-free-solid/faFile';
import styles from './File.module.css';
import TitleBlock from '../TitleBlock';

const File = ({
  page,
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  validator,
}) => (
  <div>
    <TitleBlock
      page={page}
      title={title}
      description={description}
      required={required}
    />
    <label className={styles.upload}>
      <input
        className={styles.input}
        type="file"
        value={value}
        onChange={onChange}
      />
      <FontAwesomeIcon icon={faFile} className={styles.icon} />
      <span className={styles.uploadText}>上傳檔案</span>
    </label>
  </div>
);

File.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
};

File.defaultProps = {
  required: false,
};

export default File;
