import { getEventBasedTrackingClient } from './__client';

export const sendEvent = ({
  company,
  jobTitle,
  page,
  nTotalData,
  hasPermission,
}) => {
  const client = getEventBasedTrackingClient();
  if (client) {
    client.sendEvent('ViewSalaryWorkTime', {
      company,
      jobTitle,
      page,
      nTotalData,
      hasPermission,
    });
  }
};
