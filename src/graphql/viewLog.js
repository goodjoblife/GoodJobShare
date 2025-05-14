export const viewSalaryWorkTimesGql = /* GraphQL */ `
  mutation ViewSalaryWorkTimes($input: ViewSalaryWorkTimesInput!) {
    viewSalaryWorkTimes(input: $input) {
      status
    }
  }
`;

export const viewExperiencesGql = /* GraphQL */ `
  mutation ViewExperiences($input: ViewExperiencesInput!) {
    viewExperiences(input: $input) {
      status
    }
  }
`;

export const trackEventGql = /* GraphQL */ `
  mutation TrackEvent($input: TrackEventInput!) {
    trackEvent(input: $input) {
      status
    }
  }
`;
