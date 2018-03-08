import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

import styles from './SectionEle.module.css';

export const SECTION_TITLE_PLACEHOLDER = '請輸入標題';

const SectionEle = ({
  content,
  editSection,
  placeholder,
}) => (
  <div
    className={styles.container}
  >
    <Textarea
      useCacheForDOMMeasurements
      value={content}
      onChange={e => editSection('content')(e.target.value)}
      placeholder={placeholder || '段落內文...'}
      className={styles.textarea}
      style={{
        resize: 'none',
        width: '100%',
        color: '#333333',
        fontSize: '1rem',
        border: 'none',
        lineHeight: '1.5',
        minHeight: '40px',
      }}
    />
  </div>
);

SectionEle.propTypes = {
  placeholder: PropTypes.string,
  content: PropTypes.string,
  editSection: PropTypes.func,
};

export default SectionEle;
