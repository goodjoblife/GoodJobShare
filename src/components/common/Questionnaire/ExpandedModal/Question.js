import React from 'react';
import PropTypes from 'prop-types';
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

Question.propTypes = {
  isRequired: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  section: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  titleExplanation: PropTypes.string,
};

export default Question;
