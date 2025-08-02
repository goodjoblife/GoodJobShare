import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './WorkInfoGrid.module.css';

const GridItem = ({ label, children, to, span = 1 }) => (
  <div className={cn(styles.gridItem, { [styles.span2]: span === 2 })}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>
      {to ? <Link to={to}>{children}</Link> : children}
    </div>
  </div>
);

GridItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  span: PropTypes.number,
  to: PropTypes.string,
};

const WorkInfoGrid = ({ children }) => (
  <div className={styles.workInfoGrid}>{children}</div>
);

WorkInfoGrid.propTypes = {
  children: PropTypes.node,
};

WorkInfoGrid.Item = GridItem;

export default WorkInfoGrid;
