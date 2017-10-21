import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ProgressBar from 'common/ProgressBar';
import styles from './Banners.module.css';

const Banner1 = ({ className }) => (
  <Link to="/share/interview" className={className}>
    <img
      src="https://image.goodjob.life/banners/banner2_2x.jpg"
      alt="好工作評論網募資中"
      className={styles.banner1}
    />
    <ProgressBar totalData={250} size="m" theme="gray" rootClassName={styles.progress} />
  </Link>
);
Banner1.propTypes = {
  className: PropTypes.string,
};

export default Banner1;
