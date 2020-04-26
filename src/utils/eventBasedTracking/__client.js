/** send event, set user Id, and set user properties */
class EventBasedTrackingClient {
  constructor() {
    this.amplitudeClient = getAmplitudeClient();
  }

  sendEvent(eventName, eventProperties) {
    if (this.amplitudeClient) {
      this.amplitudeClient.logEvent(eventName, eventProperties);
    }
  }

  /** suggested to call this immediately after user login */
  identifyUser(userId) {
    if (this.amplitudeClient) {
      this.amplitudeClient.setUserId(userId);
    }
  }

  setUserProperties(userId, userProperties) {
    if (this.amplitudeClient) {
      this.amplitudeClient.setUserProperties(userProperties);
    }
  }

  /** suggested to call this immediately after user logout */
  resetUser() {
    if (this.amplitudeClient) {
      this.amplitudeClient.identify(null);
    }
  }
}

const getAmplitudeClient = () => {
  if (typeof window !== 'undefined' && window.amplitude) {
    const client = window.amplitude.getInstance();
    if (client) {
      return client;
    }
  }
  return null;
};

let eventBasedTrackingClient = null;

export const getEventBasedTrackingClient = () => {
  if (typeof window !== 'undefined') {
    if (!eventBasedTrackingClient) {
      eventBasedTrackingClient = new EventBasedTrackingClient();
    }
    return eventBasedTrackingClient;
  }
  return null;
};
