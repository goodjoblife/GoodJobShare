import { SalaryWorkTimeStats } from 'apis/salaryWorkTime';
import graphqlClient from 'utils/graphqlClient';

const queryJobTitleSalaryWorkTimeStatisticsGql = /* GraphQL */ `
  query($jobTitle: String!) {
    job_title(name: $jobTitle) {
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

type QueryJobTitleSalaryWorkTimeStatisticsData = {
  job_title: { salary_work_time_statistics: SalaryWorkTimeStats } | null;
};

const queryJobTitleSalaryWorkTimeStatistics = ({
  jobTitle,
}: {
  jobTitle: string;
}): Promise<SalaryWorkTimeStats | null> =>
  graphqlClient<QueryJobTitleSalaryWorkTimeStatisticsData>({
    query: queryJobTitleSalaryWorkTimeStatisticsGql,
    variables: { jobTitle },
  }).then(data =>
    data.job_title ? data.job_title.salary_work_time_statistics : null,
  );

export default queryJobTitleSalaryWorkTimeStatistics;
