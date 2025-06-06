import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import P from 'common/base/P';

import styles from './styles.module.css';

const encodeFirstIsActive = to => (_, location) => {
  const { pathname } = location;
  return encodeURI(pathname) === to;
};

const TabLinkGroup = ({ className, options, style }) => (
  <div className={cn(styles.group, className)} style={style}>
    {options.map(({ label, to }) => (
      <NavLink
        className={styles.element}
        activeClassName={styles.active}
        isActive={encodeFirstIsActive(to)}
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
