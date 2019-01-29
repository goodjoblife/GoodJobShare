import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Wrapper from 'common/base/Wrapper';
import styles from './Banner.module.css';

const CampaignItem = ({ name, title }) => (
  <NavLink
    className={styles.campaignItem}
    activeClassName={styles.active}
    to={`/time-and-salary/campaigns/${name}`}
  >
    {title}
  </NavLink>
);

CampaignItem.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const Banner = ({ campaigns }) => (
  <section className={styles.pageBanner}>
    <Wrapper size="l" className={styles.container}>
      <div className={styles.bannerImage}>
        <img
          src="https://image.goodjob.life/banners/campaign-banner.png"
          alt="Campaign"
        />
      </div>
      {campaigns.map(({ name, title }) => (
        <CampaignItem key={name} name={name} title={title} />
      ))}
    </Wrapper>
  </section>
);

Banner.propTypes = {
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default Banner;
