import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Wrapper } from 'common/base';
import styles from './Top.module.css';

const Top = ({ children, link }) =>
  link ? (
    <Link to={link} className={styles.root}>
      <Wrapper size="l" className={styles.inner}>
        {children}
      </Wrapper>
    </Link>
  ) : (
    <div className={styles.root}>
      <Wrapper size="l" className={styles.inner}>
        {children}
      </Wrapper>
    </div>
  );

Top.propTypes = {
  link: PropTypes.string,
};

export default Top;
