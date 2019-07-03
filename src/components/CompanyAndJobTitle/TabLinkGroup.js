import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const TabLinkGroup = ({ value, options, location: { pathname }, style }) => (
  <div style={style}>
    {options.map(({ label, to }) => (
      <Link key={to} to={to}>
        {label}
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
