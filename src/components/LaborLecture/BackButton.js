import React from 'react';
import { IndexLink } from 'react-router';
import styles from './BackButton.module.css';

const BackButton = () => (
  <IndexLink to="/labor-lecture">
    <div className={`pLBold ${styles.back}`}>
      返回
    </div>
  </IndexLink>
);

export default BackButton;
