import React from 'react';
import styles from './NetPromoter.module.css';

const Question = ({ title, titleExplanation, section, onChange }) => {
  const sectionWithProps = React.Children.map(section, child =>
    React.cloneElement(child, { onChange }),
  );
  return (
    <React.Fragment>
      <div className={styles.question}>
        {title}
        {titleExplanation && <span>{titleExplanation}</span>}
      </div>
      {sectionWithProps}
    </React.Fragment>
  );
};

export default Question;
