import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import P from 'common/base/P';

import styles from './styles.module.css';

const encodeFirstIsActive = (to, { exact }) => (_, location) => {
  const { pathname } = location;
  const encodedPathname = encodeURI(pathname);
  if (exact) {
    return encodedPathname === to;
  } else {
    return encodedPathname.startsWith(to);
  }
};

const TabLinkGroup = ({ className, options, style }) => (
  <div className={cn(styles.group, className)} style={style}>
    {options.map(({ label, to, exact }) => (
      <NavLink
        className={styles.element}
        activeClassName={styles.active}
        isActive={encodeFirstIsActive(to, { exact })}
        key={label}
        to={to}
      >
        <P className={styles.text}>{label}</P>
      </NavLink>
    ))}
  </div>
);

TabLinkGroup.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      exact: PropTypes.bool,
      label: PropTypes.string,
      to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          hash: PropTypes.string,
          pathname: PropTypes.string,
          search: PropTypes.string,
          state: PropTypes.object,
        }),
      ]),
    }),
  ),
  style: PropTypes.object,
};

export default TabLinkGroup;
