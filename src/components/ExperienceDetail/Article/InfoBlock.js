import React from 'react';
import PropTypes from 'prop-types';
import styles from './InfoBlock.module.css';

export const InfoBlocks = ({ children }) => (
  <table className={styles.infoBlocks}>
    <tr>
      {React.Children.map(children, child => (
        <td>{child}</td>
      ))}
    </tr>
  </table>
);

InfoBlocks.propTypes = {
  children: PropTypes.node,
};

const InfoBlock = ({ label, children }) => (
  <div className={styles.infoBlock}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{children}</span>
  </div>
);

InfoBlock.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
};

export default InfoBlock;
