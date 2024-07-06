export const getPopularCompanyAverageSalaryQuery = /* GraphQL */ `
  {
    popular_companies {
      name
      salary_work_time_statistics {
        job_average_salaries {
          job_title {
            name
          }
          average_salary {
            amount
            type
          }
        }
      }
    }
  }
`;

export const getPopularJobTitleSalaryDistributionQuery = /* GraphQL */ `
  {
    popular_job_titles {
      name
      salary_distribution {
        bins {
          data_count
          range {
            type
            from
            to
          }
        }
      }
    }
  }
`;
