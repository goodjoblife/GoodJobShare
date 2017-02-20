import React from 'react';
import { Link } from 'react-router';

import styles from './SeeMoreButton.module.css';


const SeeMoreButton = () => (
  <button className={styles.see_more_btn}>
    <Link to="/">看更多</Link>
  </button>
);

export default SeeMoreButton;
