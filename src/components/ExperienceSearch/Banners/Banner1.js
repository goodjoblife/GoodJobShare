import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProgressBarWithDataCount from 'common/ProgressBarWithDataCount';
import { useShareLink } from 'hooks/experiments';
import Banner1Img from './banner2_2x.jpg';
import styles from './Banners.module.css';

const Banner1 = ({ className }) => {
  const shareLink = useShareLink();
  return (
    <Link to={shareLink} className={className}>
      <img
        src={Banner1Img}
        alt="職場透明化運動進行中"
        className={styles.banner1}
      />
      <ProgressBarWithDataCount
        size="m"
        theme="gray"
        rootClassName={styles.progress}
      />
    </Link>
  );
};

Banner1.propTypes = {
  className: PropTypes.string,
};

export default Banner1;
