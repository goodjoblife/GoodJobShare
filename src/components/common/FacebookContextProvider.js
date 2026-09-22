import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Facebook from 'common/facebook/Facebook';
import { ER0022, ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import FacebookContext from 'contexts/FacebookContext';
import rollbar from 'utils/rollbar';

import { FACEBOOK_APP_ID } from '../../config';

const FacebookContextProvider = ({ children }) => {
  const [FB, setFB] = useState(null);

  useEffect(() => {
    const facebook = new Facebook(FACEBOOK_APP_ID);
    facebook
      .init()
      .then(FB => setFB(FB))
      .catch(error => {
        const errorCode = ER0022;
        rollbar.error(
          `[${errorCode}] ${ERROR_CODE_MSG[errorCode].internal} ${error.message}`,
          error,
        );
      });
  }, []);

  return (
    <FacebookContext.Provider value={FB}>{children}</FacebookContext.Provider>
  );
};

FacebookContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FacebookContextProvider;
