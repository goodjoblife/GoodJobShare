import React, { useState, Fragment } from 'react';
import styles from './QuestionnaireLabel.module.css';

const QuestionnaireLabel = ({ title = '給我們回饋', children }) => {
  const [isExpand, setIsExpand] = useState(false);

  const handleExpandModal = () => {
    setIsExpand(true);
  };

  if (isExpand) return <Fragment>{children}</Fragment>;

  return (
    <div className={styles.container} onClick={handleExpandModal}>
      <div className={styles.label}>{title}</div>
    </div>
  );
};

export default QuestionnaireLabel;
