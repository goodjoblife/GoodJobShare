import React, { PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';

import AddButton from 'common/button/AddButton';

import styles from './InterviewQa.module.css';

const InterviewQa = ({ question, answer }) => (
  <div
    className={styles.container}
  >
    <div
      className={styles.remove__btn}
    >
      <AddButton
        active
      />
    </div>
    <p
      className="pLBold"
      style={{
        marginBottom: '14px',
      }}
    >
      {question}
    </p>
    <Textarea
      useCacheForDOMMeasurements
      value={answer}
      // onChange={e => editSection('content')(e.target.value)}
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

InterviewQa.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
};

export default InterviewQa;
