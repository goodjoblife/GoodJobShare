import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Facebook from 'common/facebook/Facebook';
import { ER0022, ER0023, ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import FacebookContext, { FacebookStatus } from 'contexts/FacebookContext';
import rollbar from 'utils/rollbar';

import { FACEBOOK_APP_ID } from '../../config';

const LOAD_TIMEOUT_MS = 10000;

const FacebookContextProvider = ({ children }) => {
  const [FB, setFB] = useState(null);
  const [status, setStatus] = useState(FacebookStatus.IDLE);
  const facebookRef = useRef(null);
  const sdkPromiseRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const currentAttemptRef = useRef(null);
  const nextAttemptIdRef = useRef(0);

  if (!facebookRef.current) {
    facebookRef.current = new Facebook(FACEBOOK_APP_ID);
  }

  useEffect(
    () => () => {
      currentAttemptRef.current = null;
      clearTimeout(timeoutIdRef.current);
    },
    [],
  );

  const reportLoadError = useCallback((attempt, reason) => {
    if (!attempt.reportError || attempt.reported) return;

    attempt.reported = true;
    const errorCode = reason === 'timeout' ? ER0022 : ER0023;

    rollbar.error(`[${errorCode}] ${ERROR_CODE_MSG[errorCode].internal}`, {
      reason,
      trigger: attempt.trigger,
      route: window.location.pathname,
      visibilityState: document.visibilityState,
      webdriver: navigator.webdriver,
    });
  }, []);

  const monitorLoad = useCallback(
    (sdkPromise, { reportError = false, trigger = 'unknown' } = {}) => {
      const attempt = {
        id: ++nextAttemptIdRef.current,
        reportError,
        reported: false,
        trigger,
      };
      currentAttemptRef.current = attempt;
      setStatus(FacebookStatus.LOADING);
      clearTimeout(timeoutIdRef.current);

      timeoutIdRef.current = setTimeout(() => {
        if (attempt !== currentAttemptRef.current) return;

        setStatus(FacebookStatus.TIMED_OUT);
        reportLoadError(attempt, 'timeout');
      }, LOAD_TIMEOUT_MS);

      return sdkPromise
        .then(facebookSdk => {
          if (attempt !== currentAttemptRef.current) return facebookSdk;

          clearTimeout(timeoutIdRef.current);
          setFB(facebookSdk);
          setStatus(FacebookStatus.READY);
          return facebookSdk;
        })
        .catch(() => {
          if (attempt !== currentAttemptRef.current) return null;

          clearTimeout(timeoutIdRef.current);
          if (sdkPromiseRef.current === sdkPromise) {
            sdkPromiseRef.current = null;
          }
          setStatus(FacebookStatus.FAILED);
          reportLoadError(attempt, 'failed');
          return null;
        });
    },
    [reportLoadError],
  );

  const loadFacebook = useCallback(
    options => {
      if (sdkPromiseRef.current) return sdkPromiseRef.current;

      const sdkPromise = facebookRef.current.init();
      sdkPromiseRef.current = sdkPromise;
      return monitorLoad(sdkPromise, options);
    },
    [monitorLoad],
  );
  const retryFacebook = useCallback(
    options => {
      const sdkPromise = sdkPromiseRef.current || facebookRef.current.init();
      sdkPromiseRef.current = sdkPromise;
      return monitorLoad(sdkPromise, options);
    },
    [monitorLoad],
  );

  const contextValue = useMemo(
    () => ({ FB, status, loadFacebook, retryFacebook }),
    [FB, loadFacebook, retryFacebook, status],
  );

  return (
    <FacebookContext.Provider value={contextValue}>
      {children}
    </FacebookContext.Provider>
  );
};

FacebookContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FacebookContextProvider;
