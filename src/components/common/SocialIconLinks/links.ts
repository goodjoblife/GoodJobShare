import emailIcon from './email.svg';
import facebookIcon from './facebook.svg';
import githubIcon from './github.svg';
import instagramIcon from './instagram.svg';
import styles from './SocialIconLinks.module.css';
import threadsIcon from './threads.svg';

export type SocialIconLink = {
  title: string;
  href: string;
  icon: string;
  className: string;
};

export const FACEBOOK_LINK: SocialIconLink = {
  title: 'Facebook',
  href: 'https://www.facebook.com/goodjob.life',
  icon: facebookIcon,
  className: styles.facebook,
};

export const INSTAGRAM_LINK: SocialIconLink = {
  title: 'Instagram',
  href: 'https://www.instagram.com/goodjob_dot_life/',
  icon: instagramIcon,
  className: styles.instagram,
};

export const THREADS_LINK: SocialIconLink = {
  title: 'Threads',
  href: 'https://www.threads.com/@goodjob_dot_life',
  icon: threadsIcon,
  className: styles.threads,
};

export const GITHUB_LINK: SocialIconLink = {
  title: 'GitHub',
  href: 'https://github.com/goodjoblife/GoodJobShare',
  icon: githubIcon,
  className: styles.github,
};

export const EMAIL_LINK: SocialIconLink = {
  title: 'findyourgoodjob@gmail.com',
  href: 'mailto:findyourgoodjob@gmail.com',
  icon: emailIcon,
  className: styles.email,
};
