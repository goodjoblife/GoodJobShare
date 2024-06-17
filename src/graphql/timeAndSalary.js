export const getSearchCompanyQuery = `
  query($companyName:String!) {
    search_companies(query:$companyName) {
      name
      businessNumber
      dataCount
    }
  }
`;

export const getSearchJobTitleQuery = `
  query($jobTitle:String!) {
    search_job_titles(query:$jobTitle) {
      name
      salary_work_time_statistics {
        count
      }
    }
  }
`;

export const changeSalaryWorkTimeStatus = `
mutation($input:ChangeSalaryWorkTimeStatusInput!) {
  changeSalaryWorkTimeStatus(input: $input) {
    salary_work_time {
      id
    }
  }
}
`;
