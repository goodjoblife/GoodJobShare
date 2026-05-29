import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { SalaryWorkTimeStatistics } from 'apis/salaryWorkTime';

const queryCompanyOverviewStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      salary_work_time_statistics {
        average_week_work_time
        overtime_frequency_count {
          seldom
          sometimes
          usually
          almost_everyday
        }
        job_average_salaries {
          job_title {
            name
          }
          average_salary {
            type
            amount
          }
          data_count
        }
      }
    }
  }
`;

type QueryCompanyOverviewStatisticsData = {
  company: {
    salary_work_time_statistics: Pick<
      SalaryWorkTimeStatistics,
      | 'average_week_work_time'
      | 'overtime_frequency_count'
      | 'job_average_salaries'
    >;
  } | null;
};

const queryCompanyOverviewStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<QueryCompanyOverviewStatisticsData['company']> =>
  graphqlClient<QueryCompanyOverviewStatisticsData>({
    query: queryCompanyOverviewStatisticsGql,
    variables: {
      companyName,
    },
  }).then(R.prop('company'));

export default queryCompanyOverviewStatistics;
