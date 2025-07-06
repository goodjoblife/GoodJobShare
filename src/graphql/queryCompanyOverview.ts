import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { Company } from 'graphql/company';
import {
  WorkExperienceInOverview,
  InterviewExperienceInOverview,
  fragmentInterviewExperienceFields,
  fragmentWorkExperienceFields,
} from 'graphql/overview';
import {
  fragmentSalaryWorkTimeFields,
  SalaryWorkTime,
} from 'graphql/salaryWorkTime';

const queryCompanyOverviewGql = /* GraphQL */ `
  query(
    $companyName: String!
    $interviewExperiencesLimit: Int!
    $workExperiencesLimit: Int!
    $salaryWorkTimesLimit: Int!
  ) {
    company(name: $companyName) {
      name
      interviewExperiencesResult(start: 0, limit: $interviewExperiencesLimit) {
        count
        interviewExperiences {
          ...interviewExperienceFields
        }
      }
      workExperiencesResult(start: 0, limit: $workExperiencesLimit) {
        count
        workExperiences {
          ...workExperienceFields
        }
      }
      salaryWorkTimesResult(start: 0, limit: $salaryWorkTimesLimit) {
        count
        salaryWorkTimes {
          ...salaryWorkTimeFields
        }
      }
    }
  }
  ${fragmentInterviewExperienceFields}
  ${fragmentWorkExperienceFields}
  ${fragmentSalaryWorkTimeFields}
`;

type QueryCompanyOverviewData = {
  company:
    | (Company & {
        salaryWorkTimesResult: {
          count: number;
          salaryWorkTimes: SalaryWorkTime[];
        };
        workExperiencesResult: {
          count: number;
          workExperiences: WorkExperienceInOverview[];
        };
        interviewExperiencesResult: {
          count: number;
          interviewExperiences: InterviewExperienceInOverview[];
        };
      })
    | null;
};

const queryCompanyOverview = ({
  companyName,
  interviewExperiencesLimit,
  workExperiencesLimit,
  salaryWorkTimesLimit,
}: {
  companyName: string;
  interviewExperiencesLimit: number;
  workExperiencesLimit: number;
  salaryWorkTimesLimit: number;
}): Promise<QueryCompanyOverviewData['company']> =>
  graphqlClient<QueryCompanyOverviewData>({
    query: queryCompanyOverviewGql,
    variables: {
      companyName,
      interviewExperiencesLimit,
      workExperiencesLimit,
      salaryWorkTimesLimit,
    },
  }).then(R.prop('company'));

export default queryCompanyOverview;
