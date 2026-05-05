import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  OvertimeFrequencyCount,
  SalaryDistributionBin,
} from 'apis/salaryWorkTime';

const queryJobTitleOverviewStatisticsGql = /* GraphQL */ `
  query($jobTitle: String!) {
    job_title(name: $jobTitle) {
      salary_work_time_statistics {
        average_week_work_time
        overtime_frequency_count {
          seldom
          sometimes
          usually
          almost_everyday
        }
      }
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

type QueryJobTitleOverviewStatisticsData = {
  job_title: {
    salary_work_time_statistics: {
      average_week_work_time: number | null;
      overtime_frequency_count: OvertimeFrequencyCount | null;
    };
    salary_distribution: {
      bins: SalaryDistributionBin[] | null;
    };
  } | null;
};

const queryJobTitleOverviewStatistics = ({
  jobTitle,
}: {
  jobTitle: string;
}): Promise<QueryJobTitleOverviewStatisticsData['job_title']> =>
  graphqlClient<QueryJobTitleOverviewStatisticsData>({
    query: queryJobTitleOverviewStatisticsGql,
    variables: {
      jobTitle,
    },
  }).then(R.prop('job_title'));

export default queryJobTitleOverviewStatistics;
