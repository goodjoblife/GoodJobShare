import { getEventBasedTrackingClient } from './__client';

export const types = {
  interview: 'interview',
  work: 'work',
};

export const sendEvent = ({
  id,
  type,
  contentLength,
  company,
  jobTitle,
  hasPermission,
}) => {
  const client = getEventBasedTrackingClient();
  if (client) {
    client.sendEvent('ViewArticleDetail', {
      id,
      type,
      contentLength,
      company,
      jobTitle,
      hasPermission,
    });
  }
};
