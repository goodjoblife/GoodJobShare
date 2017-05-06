import React, { PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';

import AddButton from 'common/button/AddButton';

import styles from './SectionEle.module.css';

export const SECTION_DEFAULT_TITLE = '請輸入標題，例：面試過程';

const SectionEle = ({
  subtitle,
  content,
  isSubtitleEditable,
  editSection,
  removeSection,
}) => (
  <div
    className={styles.container}
  >
    <div
      className={styles.remove__btn}
    >
      <AddButton
        active
        onClick={removeSection}
      />
    </div>
    <div
      style={{
        marginBottom: '14px',
      }}
    >
      {
        isSubtitleEditable ?
          <input
            value={subtitle}
            onChange={e => editSection('subtitle')(e.target.value)}
            placeholder={SECTION_DEFAULT_TITLE}
            className={`pLBold ${styles.subtitle}`}
          />
          :
          <p className="pLBold">
            {subtitle}
          </p>
      }
    </div>
    <Textarea
      useCacheForDOMMeasurements
      value={content}
      onChange={e => editSection('content')(e.target.value)}
      placeholder="請輸入內文"
      className={styles.textarea}
      style={{
        resize: 'none',
        width: '100%',
        color: '#333333',
        fontSize: '1rem',
        border: 'none',
        lineHeight: '1.5rem',
        minHeight: '40px',
      }}
    />
  </div>
);

SectionEle.propTypes = {
  subtitle: PropTypes.string,
  content: PropTypes.string,
  isSubtitleEditable: PropTypes.bool,
  editSection: PropTypes.func,
  removeSection: PropTypes.func,
};

export default SectionEle;
