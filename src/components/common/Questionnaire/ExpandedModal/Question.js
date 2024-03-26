import React from 'react';
import styles from './ExpandedModal.module.css';

const Question = ({ title, titleExplanation, section, onChange }) => {
  return (
    <React.Fragment>
      <div className={styles.question}>
        {title}
        {titleExplanation && <span>{titleExplanation}</span>}
      </div>
      {section({ onChange })}
    </React.Fragment>
  );
};

export default Question;
