import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { P } from 'common/base';
import styles from './Unit.module.css';

const Unit = ({ children, marginRight }) => (
  <P size="s" className={cn(styles.unit, { [styles.marginRight]: marginRight })}>
    {children}
  </P>
);
Unit.propTypes = {
  children: PropTypes.node.isRequired,
  marginRight: PropTypes.bool,
};

export default Unit;
