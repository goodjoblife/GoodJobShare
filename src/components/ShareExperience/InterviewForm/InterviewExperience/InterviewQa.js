import React, { PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';

import AddButton from 'common/button/AddButton';

import styles from './InterviewQa.module.css';

const InterviewQa = ({ question, answer, editQa, removeQa }) => (
  <div
    className={styles.container}
  >
    <div
      className={styles.remove__btn}
    >
      <AddButton
        active
        onClick={removeQa}
      />
    </div>
    <div
      style={{
        display: 'flex',
        marginBottom: '14px',
      }}
    >
      <p
        className={styles.property__title}
      >
        Q
      </p>
      <input
        placeholder="面試問題"
        value={question}
        onChange={e => editQa('question')(e.target.value)}
        className={`pM ${styles.input}`}
      />
    </div>
    <div
      style={{
        display: 'flex',
        marginBottom: '14px',
      }}
    >
      <p
        className={styles.property__title}
      >
        A
      </p>
      <Textarea
        useCacheForDOMMeasurements
        value={answer}
        onChange={e => editQa('answer')(e.target.value)}
        placeholder="你的回答（選填）"
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
  </div>
);

InterviewQa.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  editQa: PropTypes.func,
  removeQa: PropTypes.func,
};

export default InterviewQa;
