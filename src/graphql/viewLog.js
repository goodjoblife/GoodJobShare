export const viewSalaryWorkTimes = `
  mutation ViewSalaryWorkTimes($input: ViewSalaryWorkTimesInput!) {
    viewSalaryWorkTimes(input: $input) {
      status
    }
  }
`;

export const viewExperiences = `
  mutation ViewExperiences($input: ViewExperiencesInput!) {
    viewExperiences(input: $input) {
      status
    }
  }
`;
