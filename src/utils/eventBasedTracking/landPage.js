import { getEventBasedTrackingClient } from './__client';

export const sendEvent = ({ search, pathname, hash }) => {
  const client = getEventBasedTrackingClient();
  if (client) {
    client.sendEvent('LandPage', {
      search, // query string
      pathname, // relative path
      hash,
    });
  }
};
