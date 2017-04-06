import React from 'react';
import { IndexLink } from 'react-router';
import styles from './Lecture.module.css';

const BackButton = () => (
  <IndexLink to="/labor-lecture">
    <div className={styles.back}>
      返回
    </div>
  </IndexLink>
);

export default BackButton;
