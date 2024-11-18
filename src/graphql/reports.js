export const createExperienceReport = /* GraphQL */ `
  mutation CreateExperiencesReports($input: CreateExperienceReportInput!) {
    createExperiencesReports(input: $input) {
      reason
      reasonCategory
    }
  }
`;
