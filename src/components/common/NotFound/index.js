import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Wrapper, Heading } from 'common/base';
import styles from './NotFound.module.css';

const NotFound = ({ heading }) => (
  <Wrapper size="l" className={styles.wrapper}>
    <div className={styles.inner}>
      <Heading size="l" className={styles.heading}>
        {heading || '不好意思，頁面不存在'}
      </Heading>
      <Link to="/" className={styles.link}>回首頁</Link>
    </div>
  </Wrapper>
);

NotFound.propTypes = {
  heading: PropTypes.string,
};

export default NotFound;
