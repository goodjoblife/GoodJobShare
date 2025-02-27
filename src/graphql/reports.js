export const createExperienceReportGql = /* GraphQL */ `
  mutation CreateExperienceReportGql($input: CreateExperienceReportInput!) {
    createExperienceReport(input: $input) {
      id
      reasonCategory
      reason
      createdAt
    }
  }
`;

export const createSalaryWorkTimeReportGql = /* GraphQL */ `
  mutation CreateSalaryWorkTimeReportGql(
    $input: CreateSalaryWorkTimeReportInput!
  ) {
    createSalaryWorkTimeReport(input: $input) {
      id
      reasonCategory
      reason
      createdAt
    }
  }
`;
