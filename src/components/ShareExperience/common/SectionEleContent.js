import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

// import AddButton from 'common/button/AddButton';

import styles from './SectionEleContent.module.css';

export const SECTION_TITLE_PLACEHOLDER = '請輸入標題';

const SectionEleContent = ({
  // subtitle,
  content,
  contentMinLength,
  // isSubtitleEditable,
  editSection,
  // removeSection,
  placeholder,
  // titlePlaceholder,
}) => (
  <div className={styles.container}>
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
    <div className={styles.wordCount}>
      {content.length}/{contentMinLength}
    </div>
  </div>
);

SectionEleContent.propTypes = {
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  titlePlaceholder: PropTypes.string,
  content: PropTypes.string,
  contentMinLength: PropTypes.number,
  isSubtitleEditable: PropTypes.bool,
  editSection: PropTypes.func,
  removeSection: PropTypes.func,
};

export default SectionEleContent;
