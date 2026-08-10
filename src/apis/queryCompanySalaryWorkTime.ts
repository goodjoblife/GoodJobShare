import R from 'ramda';

import {
  DataTimeRange,
  ExperienceInYearRange,
  fragmentSalaryWorkTimeFields,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';
import { Company } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

const queryCompanySalaryWorkTimeGql = /* GraphQL */ `
  query(
    $companyName: String!
    $jobTitle: String
    $start: Int!
    $limit: Int!
    $dataTimeRange: DataTimeRange
    $experienceInYearRange: ExperienceInYearRange
    $gender: Gender
    $sortBy: SalaryResultSortOption
  ) {
    company(name: $companyName) {
      name
      salaryWorkTimesResult(
        jobTitle: $jobTitle
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

type QueryCompanySalaryWorkTimeData = {
  company:
    | (Company & {
        salaryWorkTimesResult: {
          count: number;
          salaryWorkTimes: SalaryWorkTime[];
        };
      })
    | null;
};

const queryCompanySalaryWorkTime = ({
  companyName,
  jobTitle,
  start,
  limit,
  dataTimeRange,
  experienceInYearRange,
  gender,
  sortBy,
}: {
  companyName: string;
  jobTitle?: string;
  start: number;
  limit: number;
  dataTimeRange?: DataTimeRange;
  experienceInYearRange?: ExperienceInYearRange;
  gender?: string;
  sortBy?: string;
}): Promise<QueryCompanySalaryWorkTimeData['company']> =>
  graphqlClient<QueryCompanySalaryWorkTimeData>({
    query: queryCompanySalaryWorkTimeGql,
    variables: {
      companyName,
      jobTitle,
      start,
      limit,
      dataTimeRange,
      experienceInYearRange,
      gender,
      sortBy,
    },
  }).then(R.prop('company'));

export default queryCompanySalaryWorkTime;
