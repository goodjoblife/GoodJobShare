import React from 'react';
import PropTypes from 'prop-types';
import { P } from 'common/base';
import styles from './InfoBlock.module.css';

const InfoBlock = ({ label, children }) => (
  <li className={styles.block}>
    <P size="m" className={styles.label}>
      {label}
    </P>
    <P size="l" blod className={styles.content}>
      {children}
    </P>
  </li>
);

InfoBlock.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default InfoBlock;
