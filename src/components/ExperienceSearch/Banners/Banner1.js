import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import getCallToActionLink from 'utils/callToActionUtils';
import styles from './Banners.module.css';
import ProgressBarWithExperienceCount from '../../../containers/ProgressBar';

const Banner1 = ({ className }) => (
  <Link to={getCallToActionLink()} className={className}>
    <img
      src="https://image.goodjob.life/banners/banner2_2x.jpg"
      alt="好工作評論網募資中"
      className={styles.banner1}
    />
    <ProgressBarWithExperienceCount size="m" theme="gray" rootClassName={styles.progress} />
  </Link>
);
Banner1.propTypes = {
  className: PropTypes.string,
};

export default Banner1;
