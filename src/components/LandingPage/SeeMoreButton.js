import React from 'react';
import { Link } from 'react-router';

import styles from './SeeMoreButton.module.css';


const SeeMoreButton = () => (
  <button className={styles.see_more_btn}>
    <span>看更多</span>
  </button>
);

export default SeeMoreButton;
