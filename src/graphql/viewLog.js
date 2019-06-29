export const viewSalaryWorkTimes = `
  mutation ViewSalaryWorkTimes($input: ViewSalaryWorkTimesInput!) {
    viewSalaryWorkTimes(input: $input) {
      status
    }
  }
`;
