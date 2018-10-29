import React from 'react';
import { wrapDisplayName, setDisplayName } from 'recompose';
import FacebookContext from './FacebookContext';

const withFB = Component => {
  const hoc = setDisplayName(wrapDisplayName(Component, 'withFB'));
  return hoc(props => (
    <FacebookContext.Consumer>
      {FB => <Component {...props} FB={FB} />}
    </FacebookContext.Consumer>
  ));
};

export default withFB;
