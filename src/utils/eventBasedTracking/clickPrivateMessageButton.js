import { getEventBasedTrackingClient } from './__client';

export const positions = {
  nextToTopReportBtn: 'nextToTopReportBtn',
  articleBottom: 'articleBottom',
};

export const sendEvent = ({ position }) => {
  const client = getEventBasedTrackingClient();
  if (client) {
    client.sendEvent('ClickPrivateMessageButton', {
      position,
    });
  }
};
