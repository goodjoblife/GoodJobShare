import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import P from 'common/base/P';

import styles from './TabLinkGroup.module.css';

const TabLinkGroup = ({ options, location: { pathname }, style }) => (
  <div className={styles.group} style={style}>
    {options.map(({ label, to }) => (
      <Link
        className={to === pathname ? styles.active : styles.element}
        key={to}
        to={to}
      >
        <P bold>{label}</P>
      </Link>
    ))}
  </div>
);

TabLinkGroup.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  pathname: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      to: PropTypes.string,
    }),
  ),
};

export default withRouter(TabLinkGroup);
