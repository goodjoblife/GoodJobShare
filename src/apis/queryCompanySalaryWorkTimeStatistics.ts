import { SalaryWorkTimeStats } from 'apis/salaryWorkTime';
import graphqlClient from 'utils/graphqlClient';

const queryCompanySalaryWorkTimeStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
      name
      salary_work_time_statistics {
        count
        is_overtime_salary_legal_count {
          yes
          no
          unknown
        }
        has_compensatory_dayoff_count {
          yes
          no
          unknown
        }
        has_overtime_salary_count {
          yes
          no
          unknown
        }
      }
    }
  }
`;

export type CompanySalaryWorkTimeStatistics = {
  name: string;
  salary_work_time_statistics: SalaryWorkTimeStats;
};

type QueryCompanySalaryWorkTimeStatisticsData = {
  company: CompanySalaryWorkTimeStatistics | null;
};

const queryCompanySalaryWorkTimeStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<QueryCompanySalaryWorkTimeStatisticsData['company']> =>
  graphqlClient<QueryCompanySalaryWorkTimeStatisticsData>({
    query: queryCompanySalaryWorkTimeStatisticsGql,
    variables: { companyName },
  }).then(data => data.company);

export default queryCompanySalaryWorkTimeStatistics;
