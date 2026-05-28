import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFile from '@fortawesome/fontawesome-free-solid/faFile';
import styles from './PolicyLawNote.module.css';

const PolicyLawNote = ({ lawName, children }) => (
  <div className={styles.container}>
    <div className={styles.leftCol}>
      <FontAwesomeIcon icon={faFile} />
      <span className={styles.lawName}>{lawName}</span>
    </div>
    <div className={styles.description}>{children}</div>
  </div>
);

PolicyLawNote.propTypes = {
  children: PropTypes.node.isRequired,
  lawName: PropTypes.string.isRequired,
};

export default PolicyLawNote;
