import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Facebook from 'common/facebook/Facebook';
import { ER0022, ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import FacebookContext from 'contexts/FacebookContext';
import rollbar from 'utils/rollbar';

import { FACEBOOK_APP_ID } from '../../config';

const LOAD_TIMEOUT_MS = 10000;

const FacebookContextProvider = ({ children }) => {
  const [FB, setFB] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let isSettled = false;
    let hasReportedError = false;

    const reportLoadError = error => {
      if (!isMounted || hasReportedError) return;

      hasReportedError = true;
      const errorCode = ER0022;
      rollbar.error(
        `[${errorCode}] ${ERROR_CODE_MSG[errorCode].internal} ${error.message}`,
        error,
      );
    };

    const timeoutId = setTimeout(() => {
      if (!isSettled) {
        reportLoadError(new Error('Facebook SDK load timed out'));
      }
    }, LOAD_TIMEOUT_MS);

    const facebook = new Facebook(FACEBOOK_APP_ID);
    facebook
      .init()
      .then(FB => {
        isSettled = true;
        clearTimeout(timeoutId);
        if (isMounted) setFB(FB);
      })
      .catch(error => {
        isSettled = true;
        clearTimeout(timeoutId);
        reportLoadError(error);
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
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
