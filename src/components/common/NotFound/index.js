import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Wrapper, Heading } from 'common/base';
import NotFoundStatus from 'common/routing/NotFound';
import styles from './NotFound.module.css';

const NotFound = ({ status, heading }) => (
  <NotFoundStatus status={status}>
    <Wrapper size="l" className={styles.wrapper}>
      <div className={styles.inner}>
        <Heading size="l" className={styles.heading}>
          {heading || '不好意思，頁面不存在'}
        </Heading>
        <Link to="/" className={styles.link}>
          回首頁
        </Link>
      </div>
    </Wrapper>
  </NotFoundStatus>
);

NotFound.propTypes = {
  heading: PropTypes.string,
  status: PropTypes.number.isRequired,
};

NotFound.defaultProps = {
  status: 404,
  heading: null,
};

export default NotFound;
