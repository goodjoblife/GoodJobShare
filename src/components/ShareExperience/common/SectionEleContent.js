import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import cn from 'classnames';
import AddButton from 'common/button/AddButton';

import styles from './SectionEleContent.module.css';
import eleStyles from './SectionEle.module.css';

export const SECTION_TITLE_PLACEHOLDER = '請輸入標題';

const SectionEleContent = ({
  isRequired,
  placeholder,
  titlePlaceholder,
  section,
  contentMinLength,
  isSubtitleEditable,
  editSection,
  removeSection,
  validator,
  submitted,
}) => {
  const isWarning = submitted && !validator(section);

  return (
    <div
      className={cn(
        { [styles.warning]: isWarning, [styles.removable]: !!removeSection },
        styles.container,
      )}
    >
      {removeSection && (
        <div className={styles.remove__btn}>
          <AddButton onClick={removeSection} deleteBtn />
        </div>
      )}
      <div className={eleStyles.heading}>
        {isSubtitleEditable ? (
          <input
            value={section.subtitle}
            onChange={e => editSection('subtitle')(e.target.value)}
            placeholder={titlePlaceholder || SECTION_TITLE_PLACEHOLDER}
            className={cn(`pLBold`, eleStyles.subtitle)}
          />
        ) : (
          section.subtitle && (
            <div className={cn(`pLBold`, eleStyles.subtitle)}>
              {section.subtitle}{' '}
              {isRequired && <span className={styles.isRequired}>*</span>}
            </div>
          )
        )}
      </div>
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
        至少 {contentMinLength} 字，現在 {section.content.length} 字
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
  contentMinLength: PropTypes.number.isRequired,
  editSection: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  isSubtitleEditable: PropTypes.bool,
  placeholder: PropTypes.string,
  removeSection: PropTypes.func,
  section: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.number,
    subtitle: PropTypes.string,
  }).isRequired,
  submitted: PropTypes.bool.isRequired,
  titlePlaceholder: PropTypes.string,
  validator: PropTypes.func.isRequired,
};

export default SectionEleContent;
