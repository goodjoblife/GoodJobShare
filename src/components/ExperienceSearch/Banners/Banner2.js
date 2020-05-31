import React from 'react';
import { Link } from 'react-router-dom';
import { useShareLink } from 'hooks/experiments';
import styles from './Banners.module.css';

const Banner2 = () => {
  const shareLink = useShareLink();

  return (
    <Link to={shareLink}>
      <img
        src="https://image.goodjob.life/banners/banner1_2x.jpg"
        alt="職場透明化運動進行中"
        className={styles.banner2}
      />
    </Link>
  );
};

export default Banner2;
