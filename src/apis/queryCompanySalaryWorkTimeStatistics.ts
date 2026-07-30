import { OvertimeStats } from 'apis/salaryWorkTime';
import graphqlClient from 'utils/graphqlClient';

const queryCompanySalaryWorkTimeStatisticsGql = /* GraphQL */ `
  query($companyName: String!) {
    company(name: $companyName) {
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

type QueryCompanySalaryWorkTimeStatisticsData = {
  company: { salary_work_time_statistics: OvertimeStats } | null;
};

const queryCompanySalaryWorkTimeStatistics = ({
  companyName,
}: {
  companyName: string;
}): Promise<OvertimeStats | null> =>
  graphqlClient<QueryCompanySalaryWorkTimeStatisticsData>({
    query: queryCompanySalaryWorkTimeStatisticsGql,
    variables: { companyName },
  }).then(data =>
    data.company ? data.company.salary_work_time_statistics : null,
  );

export default queryCompanySalaryWorkTimeStatistics;
