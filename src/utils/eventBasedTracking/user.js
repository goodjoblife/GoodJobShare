import { getEventBasedTrackingClient } from './client';

export const identifyUser = userId => {
  const client = getEventBasedTrackingClient();
  if (client) {
    client.identifyUser(userId);
  }
};

export const setUserProperties = (userId, userProperties) => {
  const client = getEventBasedTrackingClient();
  if (client) {
    client.setUserProperties(userProperties);
  }
};

export const resetUser = () => {
  const client = getEventBasedTrackingClient();
  if (client) {
    client.identify(null);
  }
};
