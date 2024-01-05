import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { GA_MEASUREMENT_ID } from '../config';

export default () => {
  // initialize google analytics
  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  const location = useLocation();
  useEffect(() => {
    ReactGA.set({ page: location.pathname + location.search });
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location]);
};
