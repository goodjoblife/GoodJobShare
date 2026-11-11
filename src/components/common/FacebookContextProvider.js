import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Facebook from 'common/facebook/Facebook';
import FacebookContext from 'contexts/FacebookContext';

import { FACEBOOK_APP_ID } from '../../config';

const FacebookContextProvider = ({ children }) => {
  const [FB, setFB] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const facebook = new Facebook(FACEBOOK_APP_ID);
    facebook
      .init()
      .then(FB => {
        if (isMounted) setFB(FB);
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <FacebookContext.Provider value={FB}>{children}</FacebookContext.Provider>
  );
};

FacebookContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FacebookContextProvider;
