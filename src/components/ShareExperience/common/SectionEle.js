import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

import AddButton from 'common/button/AddButton';

import styles from './SectionEle.module.css';

export const SECTION_TITLE_PLACEHOLDER = '請輸入標題';

const SectionEle = ({
  subtitle,
  content,
  isSubtitleEditable,
  editSection,
  removeSection,
  placeholder,
  titlePlaceholder,
}) => (
  <div className={styles.container}>
    <div className={styles.remove__btn}>
      <AddButton onClick={removeSection} deleteBtn />
    </div>
    <div className={styles.heading}>
      {isSubtitleEditable ? (
        <input
          value={subtitle}
          onChange={e => editSection('subtitle')(e.target.value)}
          placeholder={titlePlaceholder || SECTION_TITLE_PLACEHOLDER}
          className={`pLBold ${styles.subtitle}`}
        />
      ) : (
        <p className="pLBold">{subtitle}</p>
      )}
    </div>
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
    <div className={styles.wordCount}>至少 50 字，現在 {content.length} 字</div>
  </div>
);

SectionEle.propTypes = {
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  titlePlaceholder: PropTypes.string,
  content: PropTypes.string,
  isSubtitleEditable: PropTypes.bool,
  editSection: PropTypes.func,
  removeSection: PropTypes.func,
};

export default SectionEle;
