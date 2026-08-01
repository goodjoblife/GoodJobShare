import R from 'ramda';

import {
  DataTimeRange,
  ExperienceInYearRange,
  fragmentSalaryWorkTimeFields,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';
import { JobTitle } from 'graphql/jobTitle';
import graphqlClient from 'utils/graphqlClient';

const queryJobTitleSalaryWorkTimeGql = /* GraphQL */ `
  query(
    $jobTitle: String!
    $companyName: String
    $start: Int!
    $limit: Int!
    $dataTimeRange: DataTimeRange
    $experienceInYearRange: ExperienceInYearRange
    $gender: Gender
    $sortBy: SalaryResultSortOption
  ) {
    job_title(name: $jobTitle) {
      name
      salaryWorkTimesResult(
        companyQuery: $companyName
        start: $start
        limit: $limit
        dataTimeRange: $dataTimeRange
        experienceInYearRange: $experienceInYearRange
        gender: $gender
        sortBy: $sortBy
      ) {
        count
        salaryWorkTimes {
          ...salaryWorkTimeFields
        }
      }
    }
  }
  ${fragmentSalaryWorkTimeFields}
`;

type QueryJobTitleSalaryWorkTimeData = {
  job_title:
    | (JobTitle & {
        salaryWorkTimesResult: {
          count: number;
          salaryWorkTimes: SalaryWorkTime[];
        };
      })
    | null;
};

const queryJobTitleSalaryWorkTime = ({
  jobTitle,
  companyName,
  start,
  limit,
  dataTimeRange,
  experienceInYearRange,
  gender,
  sortBy,
}: {
  jobTitle: string;
  companyName?: string;
  start: number;
  limit: number;
  dataTimeRange?: DataTimeRange;
  experienceInYearRange?: ExperienceInYearRange;
  gender?: string;
  sortBy?: string;
}): Promise<QueryJobTitleSalaryWorkTimeData['job_title']> =>
  graphqlClient<QueryJobTitleSalaryWorkTimeData>({
    query: queryJobTitleSalaryWorkTimeGql,
    variables: {
      jobTitle,
      companyName,
      start,
      limit,
      dataTimeRange,
      experienceInYearRange,
      gender,
      sortBy,
    },
  }).then(R.prop('job_title'));

export default queryJobTitleSalaryWorkTime;
