import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Wrapper } from 'common/base';
import styles from './Top.module.css';

const Top = ({ children, link }) => (
  <Link to={link} className={styles.root}>
    <Wrapper size="l" className={styles.inner}>
      {children}
    </Wrapper>
  </Link>
);

Top.propTypes = {
  link: PropTypes.string,
};

export default Top;
