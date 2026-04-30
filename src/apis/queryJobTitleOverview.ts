import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  WorkExperienceInOverview,
  InterviewExperienceInOverview,
  fragmentInterviewExperienceFields,
  fragmentWorkExperienceFields,
} from 'apis/overview';
import {
  fragmentSalaryWorkTimeFields,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';

const queryJobTitleOverviewGql = /* GraphQL */ `
  query(
    $jobTitle: String!
    $interviewExperiencesLimit: Int!
    $workExperiencesLimit: Int!
    $salaryWorkTimesLimit: Int!
  ) {
    job_title(name: $jobTitle) {
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

type JobTitle = {
  name: string;
};

type QueryJobTitleOverviewData = {
  job_title:
    | (JobTitle & {
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

const queryJobTitleOverview = ({
  jobTitle,
  interviewExperiencesLimit,
  workExperiencesLimit,
  salaryWorkTimesLimit,
}: {
  jobTitle: string;
  interviewExperiencesLimit: number;
  workExperiencesLimit: number;
  salaryWorkTimesLimit: number;
}): Promise<QueryJobTitleOverviewData['job_title']> =>
  graphqlClient<QueryJobTitleOverviewData>({
    query: queryJobTitleOverviewGql,
    variables: {
      jobTitle,
      interviewExperiencesLimit,
      workExperiencesLimit,
      salaryWorkTimesLimit,
    },
  }).then(R.prop('job_title'));

export default queryJobTitleOverview;
