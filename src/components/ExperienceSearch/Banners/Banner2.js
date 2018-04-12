import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Banners.module.css';
import { shareLink } from '../../../constants/dataProgress';

const Banner2 = () => (
  <Link to={shareLink}>
    <img
      src="https://image.goodjob.life/banners/banner1_2x.jpg"
      alt="職場透明化運動進行中"
      className={styles.banner2}
    />
  </Link>
);

export default Banner2;
