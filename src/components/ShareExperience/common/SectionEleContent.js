import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import cn from 'classnames';

import styles from './SectionEleContent.module.css';

export const SECTION_TITLE_PLACEHOLDER = '請輸入標題';

const SectionEleContent = ({
  placeholder,
  section,
  contentMinLength,
  editSection,
  validator,
  submitted,
}) => {
  const isWarning = submitted && !validator(section);

  return (
    <div className={cn(isWarning ? styles.warning : null, styles.container)}>
      <Textarea
        useCacheForDOMMeasurements
        value={section.content}
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
        {section.content.length}/{contentMinLength}
      </div>
      {isWarning ? (
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            transform: 'translateY(150%)',
          }}
        >
          <p className={`pS ${styles.warning__wording}`}>需填寫多一點</p>
        </div>
      ) : null}
    </div>
  );
};

SectionEleContent.propTypes = {
  placeholder: PropTypes.string,
  section: PropTypes.shape({
    id: PropTypes.number,
    subtitle: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  contentMinLength: PropTypes.number.isRequired,
  editSection: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
};

export default SectionEleContent;
