import React from 'react';
import styles from './NetPromoter.module.css';

export const Question = ({ title, titleExplanation, section }) => {
  return (
    <React.Fragment>
      <div className={styles.question}>
        {title}
        {titleExplanation && <span>{titleExplanation}</span>}
      </div>
      {section}
    </React.Fragment>
  );
};
