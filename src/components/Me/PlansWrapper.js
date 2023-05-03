import React from 'react';
import { setStatic } from 'recompose';

import Heading from 'common/base/Heading';

import styles from './PlansWrapper.module.css';

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return dispatch();
});

const PlansWrapper = ({ children }) => {
  return (
    <div className={styles.container}>
      <Heading as="h1">我的方案</Heading>
      <div>{children}</div>
    </div>
  );
};

export default ssr(PlansWrapper);
