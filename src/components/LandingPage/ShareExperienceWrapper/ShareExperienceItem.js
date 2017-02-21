import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';

import homeBanner from '../../images/home-banner.png';
import styles from './ShareExperienceItem.module.css';


class ShareExperienceItem extends React.Component {
  state = {
    isHover: false,
  };

  handleHover(isHover) {
    console.log(isHover);
    this.setState({
      isHover,
    });
  }

  render() {
    const { isHover } = this.state;

    return (
      <div
        className={styles.share_experience_item}
        onMouseOver={() => this.handleHover(true)}
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
      >
        <Link to="/" className={styles.image}>
          <img src={homeBanner} alt="" />
        </Link>
        <button
          className={cn(styles.link,
          isHover ? styles.isHover : null)}
        >
          <span>連結連結連結連結</span>
        </button>
      </div>
    );
  }
}

export default ShareExperienceItem;
