import React from 'react';
import { Link } from 'react-router';
import getCallToActionLink from 'utils/callToActionUtils';
import styles from './Banners.module.css';

const Banner2 = () => (
  <Link to={getCallToActionLink()}>
    <img
      src="https://image.goodjob.life/banners/banner1_2x.jpg"
      alt="好工作評論網募資中"
      className={styles.banner2}
    />
  </Link>
);

export default Banner2;
