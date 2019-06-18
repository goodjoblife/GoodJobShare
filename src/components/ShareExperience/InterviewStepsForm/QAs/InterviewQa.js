import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import AddButton from 'common/button/AddButton';

import styles from './InterviewQa.module.css';

const InterviewQa = ({ question, questionNo, editQa, removeQa, isWarning }) => (
  <div className={styles.container}>
    <div className={styles.remove__btn}>
      <AddButton onClick={removeQa} deleteBtn />
    </div>
    <div className={cn(styles.warningWrapper, { [styles.warning]: isWarning })}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <p className={styles.property__title}>{questionNo}.</p>
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
  questionNo: PropTypes.number.isRequired,
  editQa: PropTypes.func,
  removeQa: PropTypes.func,
  isWarning: PropTypes.bool.isRequired,
};

export default InterviewQa;
