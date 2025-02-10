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

export const getExperienceReportsGql = /* GraphQL */ `
  query($id: ID!) {
    experience(id: $id) {
      reports {
        id
        reasonCategory
        reason
        createdAt
      }
    }
  }
`;

export const getSalaryWorkTimeReportsGql = /* GraphQL */ `
  query($companyName: String!, $salaryWorkTimesLimit: Int!) {
    company(name: $companyName) {
      salaryWorkTimesResult(start: 0, limit: $salaryWorkTimesLimit) {
        salaryWorkTimes {
          reports {
            id
            reasonCategory
            reason
            createdAt
          }
        }
      }
    }
  }
`;
