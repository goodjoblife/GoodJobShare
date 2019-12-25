import React, { useEffect, useState } from 'react';
import FacebookContext from 'contexts/FacebookContext';
import Facebook from 'common/facebook/Facebook';
import { FACEBOOK_APP_ID } from '../../config';

const FacebookContextProvider = ({ children }) => {
  const [FB, setFB] = useState(null);

  useEffect(() => {
    const facebook = new Facebook(FACEBOOK_APP_ID);
    facebook.init().then(FB => setFB(FB));
  }, []);

  return (
    <FacebookContext.Provider value={FB}>{children}</FacebookContext.Provider>
  );
};

export default FacebookContextProvider;
