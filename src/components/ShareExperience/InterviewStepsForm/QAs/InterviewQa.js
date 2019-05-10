import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import cn from 'classnames';

import AddButton from 'common/button/AddButton';

import styles from './InterviewQa.module.css';

const InterviewQa = ({ question, answer, editQa, removeQa, isWarning }) => (
  <div className={styles.container}>
    <div className={styles.remove__btn}>
      <AddButton onClick={removeQa} deleteBtn />
    </div>
    <div className={cn(styles.warningWrapper, { [styles.warning]: isWarning })}>
      <div
        style={{
          display: 'flex',
          marginBottom: '14px',
        }}
      >
        <p className={styles.property__title}>Q</p>
        <input
          placeholder="面試問題"
          value={question}
          onChange={e => editQa('question')(e.target.value)}
          className={`pM ${styles.input}`}
          style={{
            width: '100%',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <p className={styles.property__title}>A</p>
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
    {isWarning && (
      <p
        className={`pS ${styles.warning__wording}`}
        style={{
          marginTop: '14px',
        }}
      >
        需填寫面試問題
      </p>
    )}
  </div>
);

InterviewQa.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  editQa: PropTypes.func,
  removeQa: PropTypes.func,
  isWarning: PropTypes.bool.isRequired,
};

export default InterviewQa;
