import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { Wrapper, Heading } from 'common/base';
import styles from './NotFound.module.css';

const NotFoundBase = ({ heading }) => (
  <Wrapper size="l" className={styles.wrapper}>
    <div className={styles.inner}>
      <Heading size="l" className={styles.heading}>
        {heading || '不好意思，頁面不存在'}
      </Heading>
      <Link to="/" className={styles.link}>回首頁</Link>
    </div>
  </Wrapper>
);

NotFoundBase.propTypes = {
  heading: PropTypes.string,
};

const NotFound = props => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404; // eslint-disable-line no-param-reassign
      }
      return (<NotFoundBase {...props} />);
    }}
  />
);

export default NotFound;
