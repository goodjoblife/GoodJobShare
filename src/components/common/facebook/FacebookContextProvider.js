import React from 'react';
import { compose, withState, lifecycle } from 'recompose';
import Facebook from './Facebook';
import FacebookContext from './FacebookContext';
import { FACEBOOK_APP_ID } from '../../../config';

const hoc = compose(
  withState('FB', 'setFB', null),
  lifecycle({
    componentDidMount() {
      const { setFB } = this.props;
      const facebook = new Facebook(FACEBOOK_APP_ID);
      facebook.init().then(FB => setFB(FB));
    },
  })
);

const FacebookContextProvider = ({ FB, children }) => (
  <FacebookContext.Provider value={FB}>{children}</FacebookContext.Provider>
);

export default hoc(FacebookContextProvider);
