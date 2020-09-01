import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import styles from './BreadCrumb.module.css';
import { Link } from 'react-router-dom';

const toInterspersedLinkNodes = R.compose(
  R.intersperse(' > '),
  R.map(({ label, to }) => (
    <Link key={to} to={to}>
      {label}
    </Link>
  )),
);

const BreadCrumb = ({ data }) => (
  <div className={styles.breadCrumb}>{toInterspersedLinkNodes(data)}</div>
);

BreadCrumb.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    }),
  ).isRequired,
};

export default BreadCrumb;
