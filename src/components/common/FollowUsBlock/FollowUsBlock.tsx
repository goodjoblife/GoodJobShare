import cn from 'classnames';
import React from 'react';

import { Heading } from 'common/base';
import Facebook from 'common/icons/Facebook';
import Instagram from 'common/icons/Instagram';
import Threads from 'common/icons/Threads';

import FollowUsImage from './follow-us.png';
import styles from './FollowUsBlock.module.css';

const SOCIAL_LINKS = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/goodjob.life',
    Icon: Facebook,
    className: styles.facebook,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/goodjob_dot_life/',
    Icon: Instagram,
    className: styles.instagram,
  },
  {
    title: 'Threads',
    href: 'https://www.threads.com/@goodjob_dot_life',
    Icon: Threads,
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
        {SOCIAL_LINKS.map(({ title, href, Icon, className: linkClassName }) => (
          <a
            key={title}
            href={href}
            className={linkClassName}
            title={title}
            aria-label={title}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default FollowUsBlock;
