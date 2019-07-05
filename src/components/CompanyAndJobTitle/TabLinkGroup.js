import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import P from 'common/base/P';

import styles from './TabLinkGroup.module.css';

const TabLinkGroup = ({ options, style, location: { pathname } }) => (
  <div className={styles.group} style={style}>
    {options.map(({ label, to }) => (
      <Link
        className={cls(styles.element, {
          [styles.active]: encodeURI(pathname) === to,
        })}
        key={label}
        to={to}
      >
        <P bold>{label}</P>
      </Link>
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
