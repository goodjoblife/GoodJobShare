import React from 'react';
import { Link } from 'react-router';
import styles from './Banners.module.css';

const Banner1 = () => (
  <Link to="/share/interview">
    <img
      src="https://image.goodjob.life/banners/banner2_2x.jpg"
      alt="好工作評論網募資中"
      className={styles.banner1}
    />
  </Link>
);

export default Banner1;
