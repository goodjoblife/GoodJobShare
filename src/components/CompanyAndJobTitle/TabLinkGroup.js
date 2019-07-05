import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import P from 'common/base/P';

import styles from './TabLinkGroup.module.css';

const TabLinkGroup = ({ options, style }) => (
  <div className={styles.group} style={style}>
    {options.map(({ label, to }) => (
      <NavLink
        className={styles.element}
        activeClassName={styles.active}
        exact
        key={label}
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
      to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          pathname: PropTypes.string,
          search: PropTypes.string,
          hash: PropTypes.string,
          state: PropTypes.object,
        }),
      ]),
    }),
  ),
};

export default withRouter(TabLinkGroup);
