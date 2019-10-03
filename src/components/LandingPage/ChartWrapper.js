import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './ChartWrapper.module.css';

const ChartWrapper = ({ className, title, to, children }) => (
  <div className={cn(className, styles.chartWrapper)}>
    <div className={styles.header}>
      <span className={styles.title}>{title}</span>
      <Link className={styles.readmore} to={to}>
        看更多&gt;&gt;
      </Link>
    </div>
    <div>{children}</div>
  </div>
);

ChartWrapper.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ChartWrapper;
