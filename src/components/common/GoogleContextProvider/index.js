import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GoogleContext from 'contexts/GoogleContext';
import { loginWithGoogle } from 'actions/auth';
import { GOOGLE_APP_ID } from '../../../config';

const GoogleContextProvider = ({ children }) => {
  // initialize google sdk
  // when login status change, google will call callback
  const dispatch = useDispatch();
  const [googleAuth, setGoogleAuth] = useState(null);

  useEffect(() => {
    // do it once
    window.addEventListener('load', function() {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_APP_ID,
        callback: async response => {
          await dispatch(loginWithGoogle(response));
        },
      });

      setGoogleAuth(window.google.accounts.id);
    });
  }, [dispatch]);

  return (
    <GoogleContext.Provider value={googleAuth}>
      {children}
    </GoogleContext.Provider>
  );
};

export default GoogleContextProvider;
