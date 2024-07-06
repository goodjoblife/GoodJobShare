export const getSearchCompanyQuery = /* GraphQL */ `
  query($companyName: String!, $hasData: Boolean!) {
    search_companies(query: $companyName, hasData: $hasData) {
      name
      businessNumber
      dataCount
    }
  }
`;

export const getSearchJobTitleQuery = /* GraphQL */ `
  query($jobTitle: String!) {
    search_job_titles(query: $jobTitle) {
      name
      dataCount
    }
  }
`;

export const changeSalaryWorkTimeStatus = /* GraphQL */ `
  mutation($input: ChangeSalaryWorkTimeStatusInput!) {
    changeSalaryWorkTimeStatus(input: $input) {
      salary_work_time {
        id
      }
    }
  }
`;
