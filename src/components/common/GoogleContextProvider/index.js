import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GoogleContext from 'contexts/GoogleContext';
import { GOOGLE_APP_ID } from '../../../config';
import { loginWithGoogle } from '../../../actions/auth';

const GoogleContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [googleAuth, setGoogleAuth] = useState(null);

  useEffect(() => {
    window.onload = function() {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_APP_ID,
        callback: async response => {
          await dispatch(loginWithGoogle(response));
        },
      });
      setGoogleAuth(window.google.accounts.id);
    };
  });

  return (
    <GoogleContext.Provider value={googleAuth}>
      {children}
    </GoogleContext.Provider>
  );
};

export default GoogleContextProvider;
