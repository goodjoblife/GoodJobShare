import React from 'react';
import PropTypes from 'prop-types';
import styles from './InterviewBlock.module.css';

const InterviewBlockItem = ({ label, children }) => (
  <div className={styles.interviewBlockItem}>
    <div className={styles.interviewBlockLabel}>{label}</div>
    <div className={styles.interviewBlockContent}>{children}</div>
  </div>
);

InterviewBlockItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};

const InterviewBlock = ({ children }) => (
  <div className={`${styles.interviewBlocksRow}`}>{children}</div>
);

InterviewBlock.propTypes = {
  children: PropTypes.node.isRequired,
};

InterviewBlock.Item = InterviewBlockItem;

export default InterviewBlock;
