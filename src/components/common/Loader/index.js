import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Loader.module.css';

const Loader = ({ size }) => (
  <div className={cn(styles.wrapper, styles[size])}>
    <div className={styles.loader} />
  </div>
);
Loader.propTypes = {
  size: PropTypes.oneOf(['s', 'l']),
};
Loader.defaultProps = {
  size: 'l',
};

export default Loader;
