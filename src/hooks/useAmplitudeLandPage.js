import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LandPageTracker } from 'utils/eventBasedTracking';

export default () => {
  // Only send LandPage event for first page
  const location = useLocation();
  useEffect(() => {
    LandPageTracker.sendEvent({
      search: location.search,
      pathname: location.pathname,
      hash: location.hash,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
