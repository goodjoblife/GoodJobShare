import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Wrapper from 'common/base/Wrapper';
import styles from './Banner.module.css';

const CampaignItem = ({ name, title }) => (
  <NavLink className={styles.campaignItem} activeClassName={styles.active} to={`/time-and-salary/campaigns/${name}`}>
    {title}
  </NavLink>
);

CampaignItem.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default () => (
  <section className={styles.pageBanner}>
    <Wrapper size="l" className={styles.container}>
      <div className={styles.bannerImage}>
        <img src="https://image.goodjob.life/banners/campaign-banner.png" alt="Campaign" />
      </div>
      <CampaignItem name="npo_worker" title="NPO工作者" />
      <CampaignItem name="software_engineer" title="軟體工程師" />
    </Wrapper>
  </section>
);
