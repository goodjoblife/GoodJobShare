import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import Card from 'common/Card';
import styles from './ChartWrapper.module.css';

const ChartWrapper = ({ className, title, to, children }) => (
  <div className={cn(className, styles.chartWrapper)}>
    <div className={styles.header}>
      <span className={styles.title}>{title}</span>
      <Link className={styles.readmore} to={to}>
        看更多&gt;&gt;
      </Link>
    </div>
    <Card className={styles.body}>{children}</Card>
  </div>
);

ChartWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default ChartWrapper;
