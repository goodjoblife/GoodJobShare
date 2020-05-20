import { getEventBasedTrackingClient } from './__client';

export const positions = {
  nextToTopReportBtn: 'nextToTopReportBtn',
  articleBottom: 'articleBottom',
};

/**
 * step starts from 1
 */
export const sendEvent = ({ position }) => {
  const client = getEventBasedTrackingClient();
  if (client) {
    client.sendEvent('ClickPrivateMsgBtn', {
      position,
    });
  }
};
