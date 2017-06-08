import React, { PropTypes } from 'react';
import styles from './InfoBlock.module.css';

const InfoBlock = ({ label, children }) => (
  <li>
    <div className={`pM ${styles.label}`}>{label}</div>
    <div className="pMBold">{children}</div>
  </li>
);

InfoBlock.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default InfoBlock;
