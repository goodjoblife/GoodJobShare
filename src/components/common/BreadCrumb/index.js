import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import styles from './BreadCrumb.module.css';
import { Link } from 'react-router-dom';
import serialize from 'serialize-javascript';
import { formatCanonicalPath } from 'utils/helmetHelper';

const toInterspersedLinkNodes = R.compose(
  R.intersperse(' > '),
  R.map(({ label, to }) => (
    <Link key={to} to={to}>
      {label}
    </Link>
  )),
);

const formatItem = R.compose(
  formatCanonicalPath,
  R.when(R.is(Object), R.prop('pathname')),
);

const StructureData = ({ items }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ label, to }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: label,
      item: formatItem(to),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
};

const BreadCrumb = ({ data }) => (
  <Fragment>
    <StructureData items={data}></StructureData>
    <div className={styles.breadCrumb}>{toInterspersedLinkNodes(data)}</div>
  </Fragment>
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
