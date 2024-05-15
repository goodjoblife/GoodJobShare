import React from 'react';
import styles from './ExpandedModal.module.css';

const Question = ({
  title,
  titleExplanation,
  section,
  onChange,
  isRequired,
}) => {
  return (
    <React.Fragment>
      <div className={styles.question}>
        {title}
        {titleExplanation && (
          <span className={styles.titleExplanation}>{titleExplanation}</span>
        )}
        {isRequired && <span className={styles.requiredStar}>*</span>}
      </div>
      {section({ onChange })}
    </React.Fragment>
  );
};

export default Question;
