import cn from 'classnames';
import React from 'react';

import { Heading } from 'common/base';
import SocialIconLinks, {
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  THREADS_LINK,
} from 'common/SocialIconLinks';

import FollowUsImage from './follow-us.png';
import styles from './FollowUsBlock.module.css';

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
      <SocialIconLinks links={[FACEBOOK_LINK, INSTAGRAM_LINK, THREADS_LINK]} />
    </div>
  </div>
);

export default FollowUsBlock;
