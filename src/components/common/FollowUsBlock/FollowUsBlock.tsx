import cn from 'classnames';
import React from 'react';

import { Heading } from 'common/base';

import facebookIcon from './facebook.svg';
import FollowUsImage from './follow-us.png';
import styles from './FollowUsBlock.module.css';
import instagramIcon from './instagram.svg';
import threadsIcon from './threads.svg';

const SOCIAL_LINKS = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/goodjob.life',
    icon: facebookIcon,
    className: styles.facebook,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/goodjob_dot_life/',
    icon: instagramIcon,
    className: styles.instagram,
  },
  {
    title: 'Threads',
    href: 'https://www.threads.com/@goodjob_dot_life',
    icon: threadsIcon,
    className: styles.threads,
  },
];

type FollowUsBlockProps = {
  className?: string;
};

const FollowUsBlock: React.FC<FollowUsBlockProps> = ({ className }) => (
  <div className={cn(styles.followUsBlock, className)}>
    <img src={FollowUsImage} alt="follow us" className={styles.img} />
    <div className={styles.content}>
      <Heading size="l" center marginBottom>
        追蹤我們
      </Heading>
      <div className={styles.links}>
        {SOCIAL_LINKS.map(({ title, href, icon, className: linkClassName }) => (
          <a
            key={title}
            href={href}
            className={linkClassName}
            title={title}
            aria-label={title}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={icon} alt="" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default FollowUsBlock;
