import React from 'react';
import { Link } from 'react-router';

import homeBanner from '../../images/home-banner.png';
import styles from './ShareExperienceItem.module.css';

class ShareExperienceItem extends React.Component {
  render() {
    return (
      <div className={styles.share_experience_item}>
        <Link to="/" className={styles.image}>
          <img src={homeBanner} alt="" />
        </Link>
        <button className={styles.link}>
          <span>連結連結連結連結</span>
        </button>
      </div>
    );
  }
}

export default ShareExperienceItem;
