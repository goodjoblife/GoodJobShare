import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Facebook from 'common/facebook/Facebook';
import { ER0022, ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import FacebookContext, { FacebookStatus } from 'contexts/FacebookContext';
import rollbar from 'utils/rollbar';

import { FACEBOOK_APP_ID } from '../../config';

const LOAD_TIMEOUT_MS = 10000;

const FacebookContextProvider = ({ children }) => {
  const [FB, setFB] = useState(null);
  const [status, setStatus] = useState(FacebookStatus.IDLE);
  const facebookRef = useRef(null);
  const loadPromiseRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const attemptRef = useRef(0);
  const reportContextRef = useRef(null);
  const hasReportedErrorRef = useRef(false);

  if (!facebookRef.current) {
    facebookRef.current = new Facebook(FACEBOOK_APP_ID);
  }

  useEffect(
    () => () => {
      attemptRef.current += 1;
      clearTimeout(timeoutIdRef.current);
    },
    [],
  );

  const reportLoadError = useCallback(reason => {
    if (!reportContextRef.current || hasReportedErrorRef.current) return;

    hasReportedErrorRef.current = true;
    const errorCode = ER0022;
    const message =
      reason === 'timeout'
        ? ERROR_CODE_MSG[errorCode].internal
        : 'FB SDK load failed';

    rollbar.error(`[${errorCode}] ${message}`, {
      reason,
      trigger: reportContextRef.current.trigger,
      route: window.location.pathname,
      visibilityState: document.visibilityState,
      webdriver: navigator.webdriver,
    });
  }, []);

  const startLoading = useCallback(
    ({ reportError = false, trigger = 'unknown', retry = false } = {}) => {
      if (reportError) {
        reportContextRef.current = { trigger };
      }

      if (loadPromiseRef.current && !retry) {
        return loadPromiseRef.current;
      }

      if (retry) {
        attemptRef.current += 1;
        clearTimeout(timeoutIdRef.current);
        loadPromiseRef.current = null;
        facebookRef.current.reset();
      }

      const attempt = ++attemptRef.current;
      setStatus(FacebookStatus.LOADING);

      timeoutIdRef.current = setTimeout(() => {
        if (attempt !== attemptRef.current) return;

        setStatus(FacebookStatus.TIMED_OUT);
        reportLoadError('timeout');
      }, LOAD_TIMEOUT_MS);

      const loadPromise = facebookRef.current
        .init()
        .then(facebookSdk => {
          if (attempt !== attemptRef.current) return facebookSdk;

          clearTimeout(timeoutIdRef.current);
          setFB(facebookSdk);
          setStatus(FacebookStatus.READY);
          return facebookSdk;
        })
        .catch(() => {
          if (attempt !== attemptRef.current) return null;

          clearTimeout(timeoutIdRef.current);
          loadPromiseRef.current = null;
          setStatus(FacebookStatus.FAILED);
          reportLoadError('failed');
          return null;
        });

      loadPromiseRef.current = loadPromise;
      return loadPromise;
    },
    [reportLoadError],
  );

  const loadFacebook = useCallback(options => startLoading(options), [
    startLoading,
  ]);
  const retryFacebook = useCallback(
    options => startLoading({ ...options, retry: true }),
    [startLoading],
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
