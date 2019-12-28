import React, { useEffect, useState } from 'react';
import GoogleContext from 'contexts/GoogleContext';
import { GOOGLE_APP_ID } from '../../../config';

const GoogleContextProvider = ({ children }) => {
  const [googleAuth, setGoogleAuth] = useState(null);

  useEffect(() => {
    if (!window || window.gapi) return;
    window.initGoogle = () => {
      const gapi = window.gapi;
      gapi.load('auth2', () => {
        gapi.auth2.init({ client_id: GOOGLE_APP_ID });
        const googleAuth = gapi.auth2.getAuthInstance();
        setGoogleAuth(googleAuth);
      });
    };
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js?onload=initGoogle';
    document.body.appendChild(script);
  }, []);

  return (
    <GoogleContext.Provider value={googleAuth}>
      {children}
    </GoogleContext.Provider>
  );
};

export default GoogleContextProvider;
