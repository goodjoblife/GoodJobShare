import React from 'react';

import linkStyles from 'common/base/Link.module.css';

type MopsLinkProps = {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
};

const MopsLink: React.FC<MopsLinkProps> = ({ href, onClick, children }) => (
  <a
    className={linkStyles.link}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
  >
    {children}
  </a>
);

export default MopsLink;
