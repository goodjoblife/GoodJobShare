import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { P } from 'common/base';
import styles from './InfoBlock.module.css';

const InfoBlock = ({ label, to, children, noMargin }) => (
  <li className={`${styles.block}`}>
    <P size="m" className={styles.label}>
      {label}：
    </P>
    <P size="m" className={cn(styles.content, { [styles.noMargin]: noMargin })}>
      {to ? <Link to={to}>{children}</Link> : children}
    </P>
  </li>
);

InfoBlock.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  noMargin: PropTypes.bool,
  to: PropTypes.string,
};

export default InfoBlock;
