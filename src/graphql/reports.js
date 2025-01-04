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
