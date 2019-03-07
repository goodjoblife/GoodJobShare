export const getSearchCompanyQuery = `
  query($companyName:String!) {
    search_companies(query:$companyName) {
      name
      salary_work_time_statistics {
        count
      }
    }
  }
`;
