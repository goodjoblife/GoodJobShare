import { SalaryWorkTimeStatistics } from 'apis/salaryWorkTime';
import graphqlClient from 'utils/graphqlClient';

const queryJobTitleSalaryWorkTimeStatisticsGql = /* GraphQL */ `
  query($jobTitle: String!) {
    job_title(name: $jobTitle) {
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

export type JobTitleSalaryWorkTimeStatistics = {
  name: string;
  salary_work_time_statistics: Pick<
    SalaryWorkTimeStatistics,
    | 'count'
    | 'is_overtime_salary_legal_count'
    | 'has_compensatory_dayoff_count'
    | 'has_overtime_salary_count'
  >;
};

type QueryJobTitleSalaryWorkTimeStatisticsData = {
  job_title: JobTitleSalaryWorkTimeStatistics | null;
};

const queryJobTitleSalaryWorkTimeStatistics = ({
  jobTitle,
}: {
  jobTitle: string;
}): Promise<QueryJobTitleSalaryWorkTimeStatisticsData['job_title']> =>
  graphqlClient<QueryJobTitleSalaryWorkTimeStatisticsData>({
    query: queryJobTitleSalaryWorkTimeStatisticsGql,
    variables: { jobTitle },
  }).then(data => data.job_title);

export default queryJobTitleSalaryWorkTimeStatistics;
