import cn from 'classnames';
import React from 'react';

import { SocialIconLink } from './links';
import styles from './SocialIconLinks.module.css';

type SocialIconLinksProps = {
  links: SocialIconLink[];
  className?: string;
};

const isMailto = (href: string): boolean => href.startsWith('mailto:');

const SocialIconLinks: React.FC<SocialIconLinksProps> = ({
  links,
  className,
}) => (
  <div className={cn(styles.socialIconLinks, className)}>
    {links.map(({ title, href, icon, className: linkClassName }) => (
      <a
        key={href}
        href={href}
        className={linkClassName}
        title={title}
        aria-label={title}
        {...(isMailto(href)
          ? {}
          : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        <img src={icon} alt="" />
      </a>
    ))}
  </div>
);

export default SocialIconLinks;
