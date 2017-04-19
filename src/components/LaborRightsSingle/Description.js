import React from 'react';
import styles from './Description.module.css';

const Description = ({ content }) => (
  <div className={`pL ${styles.description}`}>
    {content}
  </div>
);

Description.propTypes = {
  content: React.PropTypes.string,
};

export default Description;
