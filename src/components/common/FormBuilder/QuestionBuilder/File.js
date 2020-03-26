import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFile from '@fortawesome/fontawesome-free-solid/faFile';

import styles from './File.module.css';

const getClassName = (filename, error) => {
  if (!filename && !error) {
    return null;
  } else if (filename && !error) {
    return 'finished';
  } else if (!filename && error) {
    return 'error';
  }
};

const getLabelText = (filename, error) => {
  if (!filename && !error) {
    return '上傳檔案';
  } else if (filename && !error) {
    return filename;
  } else if (!filename && error) {
    return `錯誤：${error.message}`;
  }
};

const File = ({
  page,
  title,
  description,
  dataKey,
  required,
  value,
  onChange,
  warning,
}) => {
  const [filename, setFilename] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = useCallback(
    e => {
      e.preventDefault();
      if (!filename && !error) {
        setFilename('薪資單.pdf');
      } else if (filename && !error) {
        setFilename(null);
        setError(new Error('格式不符'));
      } else if (!filename && error) {
        setFilename(null);
        setError(null);
      }
    },
    [error, filename],
  );

  return (
    <div>
      <label
        className={cn(styles.upload, styles[getClassName(filename, error)])}
        onClick={handleClick}
      >
        <input
          className={styles.input}
          type="file"
          value={value}
          onChange={onChange}
        />
        <FontAwesomeIcon icon={faFile} className={styles.icon} />
        <span className={styles.uploadText}>
          {getLabelText(filename, error)}
        </span>
      </label>
    </div>
  );
};

File.propTypes = {
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  warning: PropTypes.string,
};

File.defaultProps = {
  required: false,
};

export default File;
