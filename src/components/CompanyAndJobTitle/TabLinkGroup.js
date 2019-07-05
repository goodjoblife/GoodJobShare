import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import P from 'common/base/P';

import styles from './TabLinkGroup.module.css';

const TabLinkGroup = ({ options, style }) => (
  <div className={styles.group} style={style}>
    {options.map(({ label, to }) => (
      <NavLink
        className={styles.element}
        activeClassName={styles.active}
        exact
        key={to}
        to={to}
      >
        <P bold>{label}</P>
      </NavLink>
    ))}
  </div>
);

TabLinkGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      to: PropTypes.string,
    }),
  ),
};

export default TabLinkGroup;
