import React, { useState } from 'react';
import styles from './QuestionnaireLabel.module.css';

const QuestionnaireLabel = ({ title = '給我們回饋', contentComponent }) => {
  const [isExpand, setIsExpand] = useState(false);

  const handleExpandModal = () => {
    setIsExpand(true);
  };

  return (
    <div className={styles.container} onClick={handleExpandModal}>
      {isExpand ? (
        contentComponent
      ) : (
        <div className={styles.label}>{title}</div>
      )}
    </div>
  );
};

export default QuestionnaireLabel;
