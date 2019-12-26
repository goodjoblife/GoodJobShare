import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import { GA_ID } from '../config';

export default () => {
  // initialize google analytics
  useEffect(() => {
    ReactGA.initialize(GA_ID);
  }, []);

  const location = useLocation();
  useEffect(() => {
    ReactGA.set({ page: location.pathname + location.search });
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};
