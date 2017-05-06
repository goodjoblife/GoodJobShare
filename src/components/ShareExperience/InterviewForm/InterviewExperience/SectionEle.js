import React, { PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';

import AddButton from 'common/button/AddButton';

import styles from './SectionEle.module.css';

const SectionEle = ({ subtitle, content, editSection, removeSection }) => (
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
    <p
      className="pLBold"
      style={{
        marginBottom: '14px',
      }}
    >
      {subtitle}
    </p>
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
      }}
    />
  </div>
);

SectionEle.propTypes = {
  subtitle: PropTypes.string,
  content: PropTypes.string,
  editSection: PropTypes.func,
  removeSection: PropTypes.func,
};

export default SectionEle;
