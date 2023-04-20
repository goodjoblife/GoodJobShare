import React from 'react';
import { setStatic } from 'recompose';

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return dispatch();
});

const MyPlansWrapper = ({ children }) => {
  return <div>{children}</div>;
};

export default ssr(MyPlansWrapper);
